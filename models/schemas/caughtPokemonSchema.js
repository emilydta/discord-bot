import { Schema } from "mongoose";

const caughtPokemonSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    apiName: {
        type: String,
        required: true,
    },
    idNumber: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true,
    },
    generation: {
        type: Number,
        required: true,
    },
    nature: {
        type: String,
        required: true,
    },
    dateCaught: {
        type: Date,
        required: true,
        default: Date.now,
        immutable: true,
    },
    shiny: {
        type: Boolean,
        required: true,
    },
});

export default caughtPokemonSchema;


