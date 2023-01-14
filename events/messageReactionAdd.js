import {
    announcementsEmoji,
    uploadsEmoji,
    eventsEmoji,
} from "../models/roleEmojis.js";
import { rolesChannel } from '../models/discordChannelIds.js'

export default {
    name: 'messageReactionAdd',
    async execute(reaction, user) {
        //For reaction roles only
        if (user.bot || reaction.message.channel.id !== rolesChannel) {
            return
        } else {
            const announcementsRole = reaction.message.guild.roles.cache.find(role => role.name === announcementsEmoji);
            const uploadsRole = reaction.message.guild.roles.cache.find(role => role.name === uploadsEmoji);
            const eventsRole = reaction.message.guild.roles.cache.find(role => role.name === eventsEmoji);

            if (reaction.emoji.name == announcementsEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(announcementsRole);
            }
            if (reaction.emoji.name == uploadsEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(uploadsRole);
            }
            if (reaction.emoji.name == eventsEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(eventsRole);
            }
        }
    },
};