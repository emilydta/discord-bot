import { SlashCommandBuilder } from "discord.js";
import { pokemonChannel } from "../../models/discordChannelIds.js";
import { leaderboardEmbed } from "../../utils/pokemonComponents/GameEmbeds.js";
import { getTopTenUsersByPokemonCount } from "../../utils/dbFunctions.js";

export default {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('View the top 10 trainers with the highest number of caught Pokemon.'),
    async execute(interaction) {
        const discordId = interaction.user.id;
        const members = await interaction.member.guild.members.fetch()
        // members.forEach(member => {
        //     console.log(member.user.id)
        // })
        if (interaction.channel.id === pokemonChannel) {
            const leaderboardData = await getTopTenUsersByPokemonCount(members);
            const lboardEmbed = leaderboardEmbed(leaderboardData)
            await interaction.reply({ embeds: [lboardEmbed] });
        };
    },
};