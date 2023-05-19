import starterPokemon from "../../models/starterPokemon.js";
import { StringSelectMenuBuilder, ActionRowBuilder } from "discord.js";

const selectPokemonMenuBuilder = new StringSelectMenuBuilder()
    .setCustomId('starter-menu')
    .setPlaceholder('Make a selection!')
    .addOptions(starterPokemon);

const selectPokemonMenu = new ActionRowBuilder().addComponents(selectPokemonMenuBuilder);

export default selectPokemonMenu;