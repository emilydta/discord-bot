import client from '../index.js';
import {
    sendPing,
    gudVibez
} from '../commands/index.js';

export default {
    name: 'messageCreate',
    async execute(interaction) {
        // Avoid an iteration
        if (interaction.author.bot) return;
        
        let message = interaction.content.toLowerCase();
        if (message.includes('!gudvibez')) { gudVibez(interaction, client); return; };
        if (message.includes('!ping')) { sendPing(interaction, client); return; };
        if (message.includes('!goodbot')) { interaction.reply('<:blobderpy:877534134896066560>'); return; };
    },
};

