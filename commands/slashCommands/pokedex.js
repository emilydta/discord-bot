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
        const discordId = interaction.user.id;
        if (interaction.channel.id === pokemonChannel) {
            const user = await User.findOne({ discordUserId: discordId });
            if (user) {
                const pokedexData = await getPokedexCompletionDataFromDb(discordId)
                const pdexEmbed = pokedexEmbed(pokedexData)
                await interaction.reply({ content: `<@${discordId}>'s Pokedex`, embeds: [pdexEmbed] });
            } else return interaction.reply({ content: `You don't have a Pokedex! Type \`/startgame\` to join the server-wide Pokemon game!`, ephemeral: true});
        };
    },
};