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

//Stats
const pokedexEmbed = (user, pokedex) => {
    let total = 0
    for (let i = 1; i < 9; i ++) {
        total = total + pokedex[i]
    }

    return new EmbedBuilder()
        .setColor('#9c75ec')
        .setTitle(`${user}'s Pokedex`)
        .setDescription(`**Total:** ${total} / 1010`)
        .addFields(
            { name: 'Gen I (Kanto)', value: `${pokedex[1]} / 151`, inline: true },
            { name: 'Gen II (Johto)', value: `${pokedex[2]} / 100`, inline: true },
            { name: 'Gen III (Hoenn)', value: `${pokedex[3]} / 135`, inline: true },
            { name: 'Gen IV (Sinnoh)', value: `${pokedex[4]} / 107`, inline: true },
            { name: 'Gen V (Unova)', value: `${pokedex[5]} / 156`, inline: true },
            { name: 'Gen VI (Kalos)', value: `${pokedex[6]} / 72`, inline: true },
            { name: 'Gen VII (Alola)', value: `${pokedex[7]} / 88`, inline: true },
            { name: 'Gen VIII (Galar)', value: `${pokedex[8]} / 96`, inline: true },
            { name: 'Gen IX (Paldea)', value: `${pokedex[9]} / 105`, inline: true }
        )
}

export {
    startGameEmbed,
    selectPokemonEmbed,
    joinedSuccessfulEmbed,
    alreadyJoinedEmbed,
    spawnEmbed,
    fledEmbed,
    caughtEmbed,
    pokedexEmbed
};