const mongoose = require("mongoose");
const { Schema } = mongoose;

const toolSchema = new Schema({
    name: String,
    weight: Number,
})

module.exports = mongoose.model('Tools',toolSchema)