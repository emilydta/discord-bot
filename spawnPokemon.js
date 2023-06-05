import Pokedex from 'pokedex-promise-v2';
import { tallGrassChannel } from './models/discordChannelIds.js';
import { isShinyPokemon, getRandom, capitalizeFirstLetter } from './utils/helperFunctions.js';
import { spawnEmbed, fledEmbed, caughtEmbed } from './utils/pokemonComponents/GameEmbeds.js';
import { addPokemonToUserDb, addPokemonRole, addCompletePokedexRole } from './utils/dbFunctions.js';
import { pokemonNatures, pokemonNamesWithSpecialChars, pokemonNamesThatNeedSpaces } from './models/datasets/pokemonLists.js';

import User from './models/schemas/userSchema.js';

const P = new Pokedex();

const formatPokemonName = (name) => {
    if (pokemonNamesWithSpecialChars[name]) {
        return pokemonNamesWithSpecialChars[name];
    }
    else if (pokemonNamesThatNeedSpaces[name]) {
        return pokemonNamesThatNeedSpaces[name];
    }
    else return name;
}

const checkAnswerForMime = (userMsgContent) => {
    const mimeNameArray = ['mr. mime', 'mr mime', 'mime jr', 'mime jr.'];

    for (let i = 0; i < mimeNameArray.length; i++) {
        let mimeName = mimeNameArray[i];

        if (mimeName === userMsgContent) {
            return true;
        }
    }
    return false;
}

function spawnPokemon(client) {
    const channel = client.channels.cache.get(tallGrassChannel);
    const guild = client.guilds.cache.get(process.env.GUILD_ID);

    const pokedexLength = 1010;
    const numberOfNatures = 25;

    P.getPokemonByName(getRandom(pokedexLength)) // with Promise
        .then((response) => {
            const shiny = isShinyPokemon();
            const nature = pokemonNatures[getRandom(numberOfNatures)];

            const pokemonApiName = response.name;
            const pokemonName = capitalizeFirstLetter(formatPokemonName(pokemonApiName));
            const pokemonId = response.id
            const pokemonImg = response.sprites.other['official-artwork'].front_default;
            const shinyPokemonImg = response.sprites.other['official-artwork'].front_shiny;

            // Conditions for Pokemon to be caught
            const collectorFilter = async (userResponse) => {
                const userExists = await User.exists({ discordUserId: userResponse.author.id })

                if (userExists) {
                    //Special case for mr mime name
                    if (pokemonName.toLowerCase() === 'mr. mime' || pokemonName.toLowerCase() === 'mime jr.') {
                        const answer = checkAnswerForMime(userResponse.content.toLowerCase());
                        return answer;
                    }

                    return pokemonName.toLowerCase() === userResponse.content.toLowerCase();
                }
            };

            channel.send({
                fetchReply: true,
                embeds: [spawnEmbed(shiny ? shinyPokemonImg : pokemonImg)]
            }).then((message) => {
                message.channel.awaitMessages({
                    filter: collectorFilter,
                    max: 1,
                    time: 30000,
                    errors: ['time']
                }).then((collected) => {
                    message.edit({
                        embeds: [caughtEmbed(pokemonName, collected)]
                    });
                    const userId = collected.first().author.id;
                    addPokemonToUserDb(userId, pokemonName, pokemonApiName, pokemonId, nature, shiny).then((response) => {
                        addPokemonRole(userId, guild, tallGrassChannel, client);
                        addCompletePokedexRole(userId, guild, tallGrassChannel, client);
                    });
                }).catch((collected) => {
                    message.edit({
                        embeds: [fledEmbed(pokemonName)]
                    });
                });
            });
        })
        .catch((error) => {
            console.log('There was an ERROR: ', error);
        });
}

export default spawnPokemon;