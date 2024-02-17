const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    age: Number,
    email: {
        type: String,
        required: true,
        unique: true
    },
    regDate: Date
})

module.exports = mongoose.model('User', userSchema)