import { alreadyJoinedEmbed, selectPokemonEmbed, joinedSuccessfulEmbed } from "./GameEmbeds.js";
import selectPokemonMenu from "./GameSelectMenus.js";
import User from "../../models/schemas/userSchema.js";
import { getRandom, isShinyPokemon } from "../helperFunctions.js";
import { starterPokemonGenList, pokemonNatures } from "../../models/datasets/pokemonLists.js";

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

const addPlayerToDb = async (interaction) => {
    const userExists = await User.exists({ discordUserId: interaction.user.id })
    if (userExists) {
        alreadyJoinedScreen(interaction);
    } else {
        const numberOfNatures = 25;
        const nature = pokemonNatures[getRandom(numberOfNatures)];
        const shinyStatus = isShinyPokemon();
        const user = new User({
            discordUserId: interaction.user.id,
            pokemon: [{
                name: interaction.values[0],
                level: 5,
                generation: starterPokemonGenList[interaction.values[0]],
                nature: nature,
                shiny: shinyStatus
            }],
            buddyPokemon: {
                name: interaction.values[0],
                level: 5,
                generation: starterPokemonGenList[interaction.values[0]],
                nature: nature,
                shiny: shinyStatus
            }
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
