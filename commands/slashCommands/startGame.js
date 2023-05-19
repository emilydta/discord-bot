import { SlashCommandBuilder } from "discord.js";
import { startGameEmbed } from "../../utils/pokemonComponents/GameEmbeds.js";
import { startGameButtons } from "../../utils/pokemonComponents/GameButtons.js";
import { pokemonChannel } from "../../models/discordChannelIds.js";

export default {
    data: new SlashCommandBuilder()
        .setName('startgame')
        .setDescription('Join the server-wide Pokemon Game!'),
    async execute(interaction) {
        if (interaction.channel.id === pokemonChannel) {
            await interaction.reply({
                embeds: [startGameEmbed],
                components: [startGameButtons],
                ephemeral: true
            });
        };
    },
};