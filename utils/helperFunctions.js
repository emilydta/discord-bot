const isShinyPokemon = () => {
    const randomTrueOrFalse = Math.random() < 0.0001 ? true : false;
    return randomTrueOrFalse;
}

const getRandom = (num) => {
    //returns random number between 1 and num provided (e.g 25)
    return Math.floor(Math.random() * (num)) + 1;
};

//Used in Ready.js to spawn pokemon randomly
function randomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function startRandomInterval(func) {
    const minInterval = 300000;
    const maxInterval = 960000;

    const intervalTime = randomInterval(minInterval, maxInterval);

    setInterval(func, intervalTime);
}
//**************************************** */

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const checkGen = (id) => {
    if (id >= 1 && id <= 151) {
        return 1;
    }
    if (id >= 152 && id <= 251) {
        return 2;
    }
    if (id >= 252 && id <= 386) {
        return 3;
    }
    if (id >= 387 && id <= 493) {
        return 4;
    }
    if (id >= 494 && id <= 649) {
        return 5;
    }
    if (id >= 650 && id <= 721) {
        return 6;
    }
    if (id >= 722 && id <= 809) {
        return 7;
    }
    if (id >= 810 && id <= 905) {
        return 8;
    }
    if (id >= 906 && id <= 1010) {
        return 9;
    }
}

export {
    isShinyPokemon,
    getRandom,
    capitalizeFirstLetter,
    checkGen,
    startRandomInterval
}
