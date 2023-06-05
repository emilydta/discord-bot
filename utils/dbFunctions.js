import User from "../models/schemas/userSchema.js";
import { checkGen } from "./helperFunctions.js";
import {
    pokemonLevelsAndRolesList,
    pokemonRolesList,
    pokemonRolesAndStringsList
} from "../models/datasets/pokemonLists.js";
import { championRole } from "../models/discordRoleIds.js";

const pokedexLength = 1010;

const getUserFromDb = async (userId) => {
    const user = await User.findOne({ discordUserId: userId });
    return user;
}

const addPokemonToUserDb = async (userId, pokemonName, pokemonApiName, pokemonId, nature, shinyStatus) => {
    const user = await getUserFromDb(userId);
    if (user) {
        const newPokemon = {
            name: pokemonName,
            apiName: pokemonApiName,
            idNumber: pokemonId,
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
    try {
        const user = await getUserFromDb(userId);

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
            const uniquePokemon = [...new Map(pokemonDocs.map(entry => [entry.idNumber, entry])).values()]
            for (const entry of uniquePokemon) {
                genTally[entry.generation]++
            }
            return genTally;
        }
    } catch (error) {
        console.log(error);
    }
}

const getUserAllPokemonCount = async (user) => {
    // !! If being used generally, add members parameter to ensure you can check if the user is in the server

    if (user) {
        const pokemonArray = [];
        user.pokemon.forEach(pokemon => pokemonArray.push(pokemon.idNumber));
        return pokemonArray.length
    };
}

const findRoleInServer = async (guild, newRole) => {
    const role = guild.roles.cache.find(r => r.id === newRole);
    return role;
}

const getUserRoles = async (user) => {
    //Adds user roles from user cache to an array as strings (excludes everyone role)
    let userRoles = await user.roles.cache
        .filter((roles) => roles.id !== process.env.GUILD_ID)
        .map((role) => role.toString());

    //Removes non-number chars from array items
    for (let i = 0; i < userRoles.length; i++) {
        userRoles[i] = userRoles[i].replace(/\D/g, '');
    }
    return userRoles;
}

const addPokemonRole = async (userId, guild, channelId, client) => {
    try {
        const user = await guild.members.cache.get(userId);
        const userInDb = await getUserFromDb(userId);
        const userPokemonCount = await getUserAllPokemonCount(userInDb);

        //New role to add if user reaches count milestone
        const newRole = pokemonLevelsAndRolesList[userPokemonCount];

        const userRoles = await getUserRoles(user);

        if (newRole) {
            const roleToBeAdded = await findRoleInServer(guild, newRole);

            //Iterates through list of user's role ID's and checks if any are in the pokemonRolesList
            //Removes the role if there is a match
            for (let i = 0; i < userRoles.length; i++) {
                let roleId = pokemonRolesList[userRoles[i]];
                if (roleId && roleId !== roleToBeAdded.id) {
                    let oldRole = await findRoleInServer(guild, roleId);
                    await user.roles.remove(oldRole);
                }
            }
            //Adds the new role to the user
            await user.roles.add(roleToBeAdded);

            const channel = await client.channels.fetch(channelId);
            channel.send(`Congratulations <@${userId}>! You have earned the **${pokemonRolesAndStringsList[newRole]}** title!`)
        }
    } catch (err) {
        // Handle error
        console.error(err);
    }
}

const getUserUniquePokemonCount = async (user, membersList, pokemonCountsMap) => {
    //Only includes users who are still in the server
    if (membersList[user.discordUserId]) {
        const uniquePokemon = new Set();
        user.pokemon.forEach(pokemon => uniquePokemon.add(pokemon.idNumber));
        pokemonCountsMap.set(user.discordUserId, uniquePokemon.size);
    }
}

const makeServerMembersObj = async (members) => {
    const discordMembersList = {};
    members.forEach(member => {
        discordMembersList[member.user.id] = true;
    })
    return discordMembersList;
}

const getTopTenUsersByPokemonCount = async (members) => {
    try {
        const usersInDb = await User.find();
        const discordMembersList = await makeServerMembersObj(members);

        const userPokemonCounts = new Map();

        if (usersInDb) {
            usersInDb.forEach(user => {
                getUserUniquePokemonCount(user, discordMembersList, userPokemonCounts);
            });
        } else return [];

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

const addCompletePokedexRole = async (userId, guild, channelId, client) => {
    try {
        const user = await guild.members.cache.get(userId);
        const userInDb = await getUserFromDb(userId);
        const userRoles = await getUserRoles(user);
        const uniquePokemon = new Set();

        for (let i = 0; i < userRoles.length; i++) {
            if (userRoles[i] === championRole) {
                return;
            }
        }

        if (user && userInDb) {
            userInDb.pokemon.forEach(pokemon => uniquePokemon.add(pokemon.idNumber));
        } else return [];

        if (uniquePokemon.size === pokedexLength) {
            //New role to add if user reaches count milestone
            const roleToBeAdded = await findRoleInServer(guild, championRole);
            await user.roles.add(roleToBeAdded);
            const channel = await client.channels.fetch(channelId);
            channel.send(`Congratulations <@${userId}>! You have caught every Pokémon and earned the **Pokémon Champion** title!`)
        }
    } catch (error) {
        console.log(error)
    }
}

export {
    addPokemonToUserDb,
    getPokedexCompletionDataFromDb,
    getTopTenUsersByPokemonCount,
    addPokemonRole,
    addCompletePokedexRole
}