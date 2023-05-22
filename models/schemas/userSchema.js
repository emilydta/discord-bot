import { Schema, model } from "mongoose";
import caughtPokemonSchema from "./caughtPokemonSchema.js";

const userSchema = new Schema({
    discordUserId: {
        type: String,
        required: true
    },
    pokemon: [caughtPokemonSchema],
    buddyPokemon: caughtPokemonSchema
});

const User = model("User", userSchema);

export default User;
