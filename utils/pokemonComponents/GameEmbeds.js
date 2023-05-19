import { EmbedBuilder } from "discord.js";

const startGameEmbed = new EmbedBuilder()
    .setColor('#9c75ec')
    .setTitle('Join the server-wide Pokemon Game?');

const selectPokemonEmbed = new EmbedBuilder()
    .setColor('#9c75ec')
    .setTitle('Choose your starter Pokemon!')

const joinedSuccessfulEmbed = new EmbedBuilder()
    .setColor('#9c75ec')
    .setTitle('You\'ve successfully joined! Have fun!')

const alreadyJoinedEmbed = new EmbedBuilder()
    .setColor('#9c75ec')
    .setTitle('You\'ve already joined!')

export {
    startGameEmbed,
    selectPokemonEmbed,
    joinedSuccessfulEmbed,
    alreadyJoinedEmbed
};