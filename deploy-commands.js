import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import * as slashCommandsObj from './commands/slashCommands/index.js'

const { NODE_ENV } = process.env;

if (NODE_ENV === 'development') {
  dotenv.config({
    path: `.env.${NODE_ENV}`,
  });
} else {
  dotenv.config();
}

const commands = [];

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const slashCommands = Object.values(slashCommandsObj);
slashCommands.forEach((command) => {
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[WARNING] The command is missing a required "data" or "execute" property.`);
    }
})

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();