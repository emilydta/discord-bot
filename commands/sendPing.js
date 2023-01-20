import { EmbedBuilder } from 'discord.js';

const sendPing = (interaction, client) => {
  const ping = client.ws.ping;
  const embed = new EmbedBuilder()
    .setColor('#9c75ec')
    .setAuthor({
      name: interaction.author.tag,
      iconURL: interaction.author.avatarURL(),
    })
    .setDescription(ping + 'ms From Bot API')
    .setTimestamp()
    .setFooter({
      text: 'Pong!',
      iconURL: client.user.avatarURL(),
    });
  interaction.reply({ embeds: [embed] });
};

export default sendPing;