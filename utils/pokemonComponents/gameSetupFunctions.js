import { alreadyJoinedEmbed, selectPokemonEmbed, joinedSuccessfulEmbed } from "./GameEmbeds.js";
import selectPokemonMenu from "./GameSelectMenus.js";
import User from "../../models/schemas/userSchema.js";
import { getRandom, isShinyPokemon } from "../helperFunctions.js";
import { starterPokemonDataList, pokemonNatures } from "../../models/datasets/pokemonLists.js";

const alreadyJoinedScreen = async (interaction) => {
    await interaction.update({
        embeds: [alreadyJoinedEmbed],
        components: [],
        ephemeral: true,
    });
    return
}

const selectPokemonScreen = async (interaction) => {
    const userExists = await User.exists({ discordUserId: interaction.user.id })
    if (userExists) {
        alreadyJoinedScreen(interaction);
    } else {
        await interaction.update({
            embeds: [selectPokemonEmbed],
            components: [selectPokemonMenu],
            ephemeral: true,
        })
    }
}

const pokemonDbEntryFormat = (name, apiName, id, gen, nature, shiny) => {
    const obj = {
        name: name,
        apiName: apiName,
        idNumber: id,
        level: 5,
        generation: gen,
        nature: nature,
        shiny: shiny
    }
    return obj
}

const addPlayerToDb = async (interaction) => {
    const userExists = await User.exists({ discordUserId: interaction.user.id })
    if (userExists) {
        alreadyJoinedScreen(interaction);
    } else {
        const numberOfNatures = 25;
        const pokemonName = interaction.values[0];
        const pokemonApiName = interaction.values[0].toLowerCase();
        const pokemonId = starterPokemonDataList[interaction.values[0]][1];
        const pokemonGen = starterPokemonDataList[interaction.values[0]][0];
        const pokemonNature = pokemonNatures[getRandom(numberOfNatures)];
        const pokemonShinyStatus = isShinyPokemon();

        const pokemonDataObj = pokemonDbEntryFormat(pokemonName, pokemonApiName, pokemonId, pokemonGen, pokemonNature, pokemonShinyStatus)

        const user = new User({
            discordUserId: interaction.user.id,
            pokemon: [pokemonDataObj],
            buddyPokemon: pokemonDataObj
        })
        await user.save();

        await interaction.update({
            embeds: [joinedSuccessfulEmbed],
            components: [],
            ephemeral: true,
        });
    }
}

export {
    selectPokemonScreen,
    addPlayerToDb
};
