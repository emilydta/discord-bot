import {
    rookieRole,
    juniorRole,
    skilledRole,
    expertRole,
    eliteRole,
    veteranRole,
    legendaryRole,
    whispererRole
} from "../discordRoleIds.js";

const starterPokemonGenList = {
    bulbasaur: 1,
    charmander: 1,
    squirtle: 1,
    chikorita: 2,
    cyndaquil: 2,
    totodile: 2,
    treecko: 3,
    torchic: 3,
    mudkip: 3,
    turtwig: 4,
    chimchar: 4,
    piplup: 4,
    snivy: 5,
    tepig: 5,
    oshawott: 5,
    chespin: 6,
    fennekin: 6,
    froakie: 6,
    rowlet: 7,
    litten: 7,
    popplio: 7,
    grookey: 8,
    scorbunny: 8,
    sobble: 8,
}

const pokemonNatures = {
    1: "Hardy",
    2: "Lonely",
    3: "Brave",
    4: "Adamant",
    5: "Naughty",
    6: "Bold",
    7: "Docile",
    8: "Relaxed",
    9: "Impish",
    10: "Lax",
    11: "Timid",
    12: "Hasty",
    13: "Serious",
    14: "Jolly",
    15: "Naive",
    16: "Modest",
    17: "Mild",
    18: "Quiet",
    19: "Bashful",
    20: "Rash",
    21: "Calm",
    22: "Gentle",
    23: "Sassy",
    24: "Careful",
    25: "Quirky",
};

const pokemonLevelsAndRolesList = {
    2: rookieRole,
    10: juniorRole,
    30: skilledRole,
    50: expertRole,
    100: eliteRole,
    200: veteranRole,
    500: legendaryRole,
    1000: whispererRole
}

const pokemonRolesList = {
    [rookieRole]: rookieRole,
    [juniorRole]: juniorRole,
    [skilledRole]: skilledRole,
    [expertRole]: expertRole,
    [eliteRole]: eliteRole,
    [veteranRole]: veteranRole,
    [legendaryRole]: legendaryRole,
    [whispererRole]: whispererRole
}

const rookie = 'Rookie Trainer';
const junior = 'Junior Trainer';
const skilled = 'Skilled Trainer';
const expert = 'Expert Trainer';
const elite = 'Elite Trainer';
const veteran = 'Veteran Trainer';
const legendary = 'Legendary Trainer';
const whisperer = 'Pokémon Whisperer';

const pokemonRolesAndStringsList = {
    [rookieRole]: rookie,
    [juniorRole]: junior,
    [skilledRole]: skilled,
    [expertRole]: expert,
    [eliteRole]: elite,
    [veteranRole]: veteran,
    [legendaryRole]: legendary,
    [whispererRole]: whisperer
}

export {
    starterPokemonGenList,
    pokemonNatures,
    pokemonLevelsAndRolesList,
    pokemonRolesList,
    pokemonRolesAndStringsList
}