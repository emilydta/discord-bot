import { EmbedBuilder } from "discord.js";
import commandsList from "../models/commandsList.js";

const help = (interaction) => {
	function outputCommands() {
		const newArray = [];
		for (let i = 0; i < commandsList.length; i++) {
			newArray.push(`\`${commandsList[i].command}\`: ${commandsList[i].description}\n`);
		}
		newArray.sort();
		return newArray.join("");
	}

	const embed = new EmbedBuilder()
		.setTitle("OmBOT Commands")
		.setColor('#9c75ec')
		.setDescription(`${outputCommands()}`);
	interaction.reply({ embeds: [embed] });
};

export default help;