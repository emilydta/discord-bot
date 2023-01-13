import { EmbedBuilder } from 'discord.js';
import {
    announcementsEmoji,
    uploadsEmoji,
    eventsEmoji,
} from "../models/roleEmojis.js";
import channel from '../models/roleReactionChannelId.js'

async function roleReaction(interaction) {
    if (interaction.channel.id === channel) {
        const embed = new EmbedBuilder()
            .setColor('0x0099FF')
            .setTitle('Select what you would like to be notified about:')
            .setDescription(`${announcementsEmoji} - Announcements\n` +
                `${uploadsEmoji} - Uploads/Videos\n` + 
                `${eventsEmoji} - Events\n`
            )

        const sendEmbed = await interaction.channel.send({ embeds: [embed] });
        sendEmbed.react(announcementsEmoji);
        sendEmbed.react(uploadsEmoji);
        sendEmbed.react(eventsEmoji);
    }
};

export default roleReaction;