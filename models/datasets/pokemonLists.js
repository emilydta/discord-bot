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

//[0] = Gen
//[1] = ID no.
const starterPokemonDataList = {
    Bulbasaur: [1, 1],
    Charmander: [1, 4],
    Squirtle: [1, 7],
    Chikorita: [2, 152],
    Cyndaquil: [2, 155],
    Totodile: [2, 158],
    Treeko: [3, 252],
    Torchic: [3, 255],
    Mudkip: [3, 258],
    Turtwig: [4, 387],
    Chimchar: [4, 390],
    Piplup: [4, 393],
    Snivy: [5, 495],
    Tepig: [5, 498],
    Oshawott: [5, 501],
    Chespin: [6, 650],
    Fennekin: [6, 653],
    Froakie: [6, 656],
    Rowlet: [7, 722],
    Litten: [7, 725],
    Popplio: [7, 728],
    Grookey: [8, 810],
    Scorbunny: [8, 813],
    Sobble: [8, 816],
};


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

//Capitalisations are for the outputted names in the embed
const pokemonNamesWithSpecialChars = {
    'nidoran-f': 'nidoran',
    'nidoran-m': 'nidoran',
    'farfetchd': 'farfetch\'d',
    'mr-mime': 'mr. Mime',
    'ho-oh': 'ho-Oh',
    'mime-jr': 'mime Jr.',
    'porygon-z': 'porygon-Z',
    'type-null': 'type: Null',
    'sirfetchd': 'sirfetch\'d',
}

const pokemonNamesThatNeedSpaces = {
    'tapu-koko': 'tapu Koko',
    'tapu-lele': 'tapu Lele',
    'tapu-bulu': 'tapu Bulu',
    'tapu-fini': 'tapu Fini',
    'great-tusk': 'great Tusk',
    'scream-tail': 'scream Tail',
    'brute-bonnet': 'brute Bonnet',
    'flutter-mane': 'flutter Mane',
    'slither-wing': 'slither Wing',
    'sandy-shocks': 'sandy Shocks',
    'iron-treads': 'iron Treads',
    'iron-bundle': 'iron Bundle',
    'iron-hands': 'iron Hands',
    'iron-jugulis': 'iron Jugulis',
    'iron-moth': 'iron Moth',
    'iron-thorns': 'iron Thorns',
    'roaring-moon': 'roaring Moon',
    'iron-valiant': 'iron Valiant',
    'walking-wake': 'walking Wake',
    'iron-leaves': 'iron Leaves',
    'giratina-altered': 'giratina'
};

export {
    starterPokemonDataList,
    pokemonNatures,
    pokemonLevelsAndRolesList,
    pokemonRolesList,
    pokemonRolesAndStringsList,
    pokemonNamesWithSpecialChars,
    pokemonNamesThatNeedSpaces
}