import { selectPokemonScreen, addPlayerToDb } from "../utils/pokemonComponents/gameSetupFunctions.js";

export default {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(`Error executing ${interaction.commandName}`);
                console.error(error);
            }
        } else if (interaction.isButton()) {
            if (interaction.customId === 'confirm') {
                selectPokemonScreen(interaction);
            }
        } else if (interaction.isStringSelectMenu()) {
            if (interaction.customId === 'starter-menu') {
                addPlayerToDb(interaction);
            }

        }
    }
};