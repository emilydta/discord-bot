import { EmbedBuilder } from "discord.js";
import { tallGrassChannel, pokemonChannel } from "../../models/discordChannelIds.js";

const gameInstructionsHeading = '🌟 Server-wide Pokémon Game: What is this?'
const gameInstructions = `
📋 **How to Play:**

    1️⃣ Press the "YES" button to choose your starter Pokémon and embark on your Pokémon adventure! **You won't be able to play unless you do this first!**

    2️⃣ Keep an eye on the <#${tallGrassChannel}> channel. This is where Pokémon will appear!

    3️⃣ When a Pokémon appears, type the Pokémon's name to catch it. Your typing speed and Pokémon knowledge will be your keys to victory!

    4️⃣ Head over to the <#${pokemonChannel}> channel to check your progress with the \`/pokedex\` command, or use the \`/leaderboard\` command to see the server's top 10 trainers.
    
    🏆 **Become a Pokémon Champion:**
Catch every Pokemon to earn the title of Pokemon Champion! Good luck, and may your journey be filled with thrilling captures and legendary encounters!`;

const embedColor = '#9c75ec';
//Game setup
const startGameEmbed = new EmbedBuilder()
    .setColor(embedColor)
    .setTitle('Join the server-wide Pokemon Game?');

const instructionsEmbed = new EmbedBuilder()
    .setColor(embedColor)
    .setTitle(gameInstructionsHeading)
    .setDescription(gameInstructions)

const selectPokemonEmbed = new EmbedBuilder()
    .setColor(embedColor)
    .setTitle('Choose your starter Pokemon!')

const joinedSuccessfulEmbed = new EmbedBuilder()
    .setColor(embedColor)
    .setTitle('You\'ve successfully joined! Have fun!')

const alreadyJoinedEmbed = new EmbedBuilder()
    .setColor(embedColor)
    .setTitle('You\'ve already joined!')


//Gameplay
const spawnEmbed = (url) => {
    return new EmbedBuilder()
        .setTitle('Guess the Pokemon before it flees!')
        .setDescription('Type it\'s name below to catch it!')
        .setImage(url)
        .setFooter({ text: `Type /startgame in the #Pokemon channel to join` })
}
const fledEmbed = (pokemon) => {
    return new EmbedBuilder()
        .setDescription(`${pokemon} fled!`)
}
const caughtEmbed = (pokemon, userResponse) => {
    return new EmbedBuilder()
        .setDescription(`${userResponse.first().author} caught ${pokemon}!`)
}

//Stats
const pokedexEmbed = (pokedex) => {
    let total = 0
    for (let i = 1; i <= 9; i++) {
        total = total + pokedex[i]
    }

    return new EmbedBuilder()
        .setColor(embedColor)
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

const leaderboardEmbed = (data) => {
    let counter = 1;
    const embed = new EmbedBuilder()
        .setTitle('Pokedex Leaderboard')
        .setColor(embedColor)

    if (data.length === 0) {
        embed.setDescription('No players yet!');
        return embed
    }

    for (const { name, count } of data) {
        const place = {
            1: 'st',
            2: 'nd',
            3: 'rd',
        }

        const trophyObj = {
            1: '🏆',
            2: '🥈',
            3: '🥉'
        }

        const trophy = counter <= 3 ? trophyObj[counter] : '';
        const suffix = counter <= 3 ? place[counter] : 'th';

        embed.addFields({ name: `${trophy} ${counter}${suffix} Place ${trophy}`, value: `<@${name}>: ${count} / 1010` });
        counter++
    }
    return embed;
}

export {
    startGameEmbed,
    instructionsEmbed,
    selectPokemonEmbed,
    joinedSuccessfulEmbed,
    alreadyJoinedEmbed,
    spawnEmbed,
    fledEmbed,
    caughtEmbed,
    pokedexEmbed,
    leaderboardEmbed
};

