const mongoose = require("mongoose");
const { Schema } = mongoose;

const boardGameSchema = new Schema({
    name: String,
    maxPlayers: Number,
})

module.exports = mongoose.model('BoardGames',boardGameSchema)