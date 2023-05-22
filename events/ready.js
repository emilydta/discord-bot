import mongoose from 'mongoose';
import spawnPokemon from '../pokemonGame.js';

export default {
	name: 'ready',
	once: true,
	execute(client) {
		mongoose.connect(process.env.DB, {keepAlive: true})
        client.user.setActivity(`Helo :]`);
		console.log(`Ready! Logged in as ${client.user.tag}`);
		spawnPokemon(client);
	},
};
