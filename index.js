import * as eventsObj from './events/index.js';
import dotenv from 'dotenv';
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import fs from 'fs';
import readline from 'readline';
import { google } from 'googleapis';
import youtubeCheck from './youtubeCheck.js';
import { uploadsChannel } from './models/discordChannelIds.js';
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

const events = Object.values(eventsObj);
events.forEach((event) => {
  event.once
    ? client.once(event.name, (...args) => event.execute(...args))
    : client.on(event.name, (...args) => event.execute(...args));
});

client.login(token);

youtubeCheck(client, fs, readline, google, OAuth2, playlistId, uploadsChannel);
setInterval(function() {youtubeCheck(client, fs, readline, google, OAuth2, playlistId, uploadsChannel)}, 600000);

export default client;