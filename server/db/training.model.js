const mongoose = require("mongoose");
const { Schema } = mongoose;

const trainingSchema = new Schema({
    name: String,
    difficulty: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Training',trainingSchema)