const mongoose = require("mongoose");

const { Schema } = mongoose;

const EquipmentSchema = new Schema({
  equipmentName: String,
  type: String,
  amount: Number,
});

module.exports = mongoose.model("EquipmentModel", EquipmentSchema);