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

export {
    addPokemonToUserDb,
    getPokedexCompletionDataFromDb
}