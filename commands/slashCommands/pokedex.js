import { SlashCommandBuilder } from "discord.js";
import { pokemonChannel } from "../../models/discordChannelIds.js";
import { pokedexEmbed } from "../../utils/pokemonComponents/GameEmbeds.js";
import { getPokedexCompletionDataFromDb } from "../../utils/dbFunctions.js";
import User from "../../models/schemas/userSchema.js";

export default {
    data: new SlashCommandBuilder()
        .setName('pokedex')
        .setDescription('View your Pokedex progress'),
    async execute(interaction) {
        const username = interaction.user.username;
        const discordId = interaction.user.id;
        if (interaction.channel.id === pokemonChannel) {
            const user = await User.findOne({ discordUserId: discordId });
            if (user) {
                const pokedexData = await getPokedexCompletionDataFromDb(discordId)
                const pdexEmbed = pokedexEmbed(username, pokedexData)
                await interaction.reply({ embeds: [pdexEmbed] });
            } else return;
        };
    },
};