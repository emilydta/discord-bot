import * as eventsObj from './events/index.js';
import * as slashCommandsObj from './commands/slashCommands/index.js';
import dotenv from 'dotenv';
import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import { google } from 'googleapis';
import youtubeCheck from './youtubeCheck.js';
import { uploadsChannel } from './models/discordChannelIds.js';
import { videosRole } from './models/discordRoleIds.js';

var OAuth2 = google.auth.OAuth2;

const { NODE_ENV } = process.env;

if (NODE_ENV === 'development') {
  dotenv.config({
    path: `.env.${NODE_ENV}`,
  });
} else {
  dotenv.config();
}

const token = process.env.TOKEN;
const playlistId = process.env.PLAYLIST_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction
  ]
});

client.commands = new Collection();

const slashCommands = Object.values(slashCommandsObj);
slashCommands.forEach((command) => {
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command is missing a required "data" or "execute" property.`);
  }
})

const events = Object.values(eventsObj);
events.forEach((event) => {
  event.once
    ? client.once(event.name, (...args) => event.execute(...args))
    : client.on(event.name, (...args) => event.execute(...args));
});

client.login(token);

//youtubeCheck(client, fs, readline, google, OAuth2, playlistId, uploadsChannel, videosRole);
//setInterval(function() {youtubeCheck(client, fs, readline, google, OAuth2, playlistId, uploadsChannel, videosRole)}, 600000);

export default client;