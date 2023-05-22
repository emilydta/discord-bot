import User from "../models/schemas/userSchema.js";
import { checkGen} from "./helperFunctions.js";

const addPokemonToUserDb = async (userId, pokemonName, pokemonId, nature, shinyStatus) => {
    const user = await User.findOne({ discordUserId: userId });

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

export {
    addPokemonToUserDb
}