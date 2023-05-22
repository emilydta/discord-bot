import { EmbedBuilder } from "discord.js";
import { capitalizeFirstLetter } from "../helperFunctions.js";

//Game setup
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


//Gameplay
const spawnEmbed = (url) => {
    return new EmbedBuilder()
        .setTitle('Guess the Pokemon before it flees!')
        .setDescription('Type it\'s name below to catch it!')
        .setImage(url)
}
const fledEmbed = (pokemon) => {
    return new EmbedBuilder()
        .setDescription(`${capitalizeFirstLetter(pokemon)} fled!`)
}
const caughtEmbed = (pokemon, userResponse) => {
    return new EmbedBuilder()
        .setDescription(`${userResponse.first().author} caught ${capitalizeFirstLetter(pokemon)}!`)
}

export {
    startGameEmbed,
    selectPokemonEmbed,
    joinedSuccessfulEmbed,
    alreadyJoinedEmbed,
    spawnEmbed,
    fledEmbed,
    caughtEmbed
};