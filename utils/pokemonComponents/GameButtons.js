import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';

const confirm = new ButtonBuilder()
    .setCustomId('confirm')
    .setLabel('YES')
    .setStyle(ButtonStyle.Success);

const info = new ButtonBuilder()
    .setCustomId('info')
    .setLabel('What is this?')
    .setStyle(ButtonStyle.Secondary);

const startGameButtons = new ActionRowBuilder().addComponents(confirm, info);

export {
    startGameButtons
}