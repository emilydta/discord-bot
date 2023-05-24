import User from "../models/schemas/userSchema.js";
import { checkGen } from "./helperFunctions.js";

const addPokemonToUserDb = async (userId, pokemonName, pokemonId, nature, shinyStatus) => {
    const user = await User.findOne({ discordUserId: userId });
    if (user) {
        const newPokemon = {
            name: pokemonName.toLowerCase(),
            level: 1,
            generation: checkGen(pokemonId),
            nature: nature,
            shiny: shinyStatus
        }

        user.pokemon.push(newPokemon)
        await user.save();
    }
    else return;
}

const getPokedexCompletionDataFromDb = async (userId) => {
    const user = await User.findOne({ discordUserId: userId });

    if (user) {
        let pokemonDocs = [];
        let genTally = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0
        }

        for (const entry of user.pokemon) {
            pokemonDocs.push(entry)
        }
        const uniquePokemon = [...new Map(pokemonDocs.map(entry => [entry.name, entry])).values()]
        for (const entry of uniquePokemon) {
            genTally[entry.generation]++
        }
        return genTally;
    } else console.log('err')
}

const getTopTenUsersByPokemonCount = async (members) => {
    try {
        const usersInDb = await User.find();
        const discordMembersList = {}

        //Save discord member Id's in an object
        members.forEach(member => {
            discordMembersList[member.user.id] = true;
        })
        const userPokemonCounts = new Map();

        usersInDb.forEach(user => {
            //Only includes users who are still in the server
            if (discordMembersList[user.discordUserId]) {
                const uniquePokemon = new Set();
                user.pokemon.forEach(pokemon => uniquePokemon.add(pokemon.name));
                userPokemonCounts.set(user.discordUserId, uniquePokemon.size);
            }
        });

        // Sort the users based on the count of unique Pokémon in descending order
        const sortedUsers = Array.from(userPokemonCounts.entries()).sort((a, b) => b[1] - a[1]);

        // Output the users in order from most caught Pokémon to least
        let finalList = [];
        let counter = 0;
        for (const [name, count] of sortedUsers) {
            finalList.push({ name, count })
            counter++

            if (counter === 10) {
                break
            }
        }
        return finalList;
    } catch (err) {
        // Handle error
        console.error(err);
    }
}

export {
    addPokemonToUserDb,
    getPokedexCompletionDataFromDb,
    getTopTenUsersByPokemonCount
}