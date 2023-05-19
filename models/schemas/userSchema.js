import { Schema, model } from "mongoose"

const pokemonSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    level: Number,
    found: {
        type: Date,
        default: () => Date.now()
    }
});

const userSchema = new Schema({
    discordUserId: {
        type: String,
        required: true
    },
    pokemon: [pokemonSchema]
});

const User = model("User", userSchema);

export default User;