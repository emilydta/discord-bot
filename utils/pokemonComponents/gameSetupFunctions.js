import { alreadyJoinedEmbed, selectPokemonEmbed, joinedSuccessfulEmbed } from "./GameEmbeds.js";
import selectPokemonMenu from "./GameSelectMenus.js";
import User from "../../models/schemas/userSchema.js";


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
        const user = new User({
            discordUserId: interaction.user.id,
            pokemon: [{
                name: interaction.values[0],
                level: 1,
            }]
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
