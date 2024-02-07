const mongoose = require("mongoose");

const { Schema } = mongoose;

const divisionSchema = new Schema({
    name : String,
    boss: String,
    budget: Number,
    location: {
        country: String,
        city: String
    }

})

module.exports = mongoose.model("Division", divisionSchema);