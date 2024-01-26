const mongoose = require("mongoose");
const equipmentModel = require("./equipment.model");

const { Schema } = mongoose;

const brandSchema = new Schema({
    name : String,
})

module.exports = mongoose.model("Brand", brandSchema);