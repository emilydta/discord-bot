import * as eventsObj from './events/index.js';
import dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';

const { NODE_ENV } = process.env;

if (NODE_ENV === 'development') {
  dotenv.config({
    path: `.env.${NODE_ENV}`,
  });
} else {
  dotenv.config();
}

const token = process.env.TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

const events = Object.values(eventsObj);
events.forEach((event) => {
  event.once
    ? client.once(event.name, (...args) => event.execute(...args))
    : client.on(event.name, (...args) => event.execute(...args));
});

client.login(token);

export default client;