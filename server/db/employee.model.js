// https://mongoosejs.com/
const mongoose = require("mongoose");
const brands = require("../populate/brands.json")
const equipmentModel = require("./equipment.model");
const boardGamesModel = require("./boardGame.model");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  created: {
    type: Date,
    default: Date.now,
  },
  present: {
    type: Boolean,
    default: false,
  },
  equipment: {type: mongoose.Schema.Types.ObjectId, ref:'EquipmentModel'},
  favoriteBrand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  },
  favoriteBoardGame: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BoardGames'
  },
  favoriteColor: String,
  currentSalary: Number,
  desiredSalary: Number,
  dateOfStart: Date,
  kittens: [
    {
      kittenName: String,
      weight: Number
    }
  ],
  address: {
    country: String,
    city: String,
    street: String,
    zipCode: Number
  },
  division: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Division",
  },
  country: String,
  continent: String,
  notes: [String],
  favoriteTool: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tools",
  },
  session:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Training'
  }
});

module.exports = mongoose.model("Employee", EmployeeSchema);
