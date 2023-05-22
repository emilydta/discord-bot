import Pokedex from 'pokedex-promise-v2';
import { tallGrassChannel } from './models/discordChannelIds.js';
import { isShinyPokemon, getRandom } from './utils/helperFunctions.js';
import { spawnEmbed, fledEmbed, caughtEmbed } from './utils/pokemonComponents/GameEmbeds.js';
import { addPokemonToUserDb } from './utils/dbFunctions.js';
import { pokemonNatures } from './models/datasets/pokemonLists.js';

import User from './models/schemas/userSchema.js';

const P = new Pokedex();

function spawnPokemon(client) {
    const channel = client.channels.cache.get(tallGrassChannel);
    const pokedexLength = 1010;
    const numberOfNatures = 25;

    P.getPokemonByName(getRandom(pokedexLength)) // with Promise
        .then((response) => {
            const shiny = isShinyPokemon();
            const nature = pokemonNatures[getRandom(numberOfNatures)];

            const pokemonName = response.name;
            const pokemonId = response.id
            const pokemonImg = response.sprites.other['official-artwork'].front_default;
            const shinyPokemonImg = response.sprites.other['official-artwork'].front_shiny;

            // Conditions for Pokemon to be caught
            const collectorFilter = async (userResponse) => {
                const userExists = await User.exists({ discordUserId: userResponse.author.id })
                return userExists && pokemonName.toLowerCase() === userResponse.content.toLowerCase();
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
                    addPokemonToUserDb(collected.first().author.id, pokemonName, pokemonId, nature, shiny)
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