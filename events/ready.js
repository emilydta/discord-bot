export default {
	name: 'ready',
	once: true,
	execute(client) {
        client.user.setActivity(`Helo :]`);
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
