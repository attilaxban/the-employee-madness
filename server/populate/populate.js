require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const country = require("./country.json");
const boardGames = require("./games.json");
const EmployeeModel = require("../db/employee.model");
const BrandModel = require('../db/brand.model');
const equipmentModel = require("../db/equipment.model");
const toolModel = require("../db/tools.model");
const boardGameModel = require("../db/boardGame.model");
const divisionModel = require("../db/divisions.model")


const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); 
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const randomDate = () => {
  const currentDate = new Date();
  const randomNumberOfDays = Math.floor(Math.random() * 365 * 10);

  currentDate.setDate(currentDate.getDate() - randomNumberOfDays)

  return currentDate
}

const colors = ["#00ff00", "#ff6666", "#ffff00", "#00ff40", "#0040ff", "#ff00bf"]

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  await BrandModel.deleteMany({});

  const brandNames = ["Acer", "Razer", "HP"];
  const equipments = [{ equipmentName: "Pen", type: "writing", amount: 10 }, { equipmentName: "Monitor", type: "IT", amount: 10 }];
  const brands = brandNames.map((name) => ({ name }));
  const createdBrands = await BrandModel.create(brands);
  const tools = [
    { "name": "Notebook", "weight": 0.5 },
    { "name": "Pencil", "weight": 0.06 },
    { "name": "Pen", "weight": 0.12 },
    { "name": "Book", "weight": 1 }

  ]
  const testAddress = {
    "country" : "Test Country",
    "city" : "Test City",
    "street" : "Test Street",
    "zipCode" : 1234, 
  }

  const division = [
    {
      name: "TestDivision",
      boss: pick(names),
      budget: Math.floor(Math.random() * 1000),
      location: {
        country : "Test Country",
        city: "Test City"
      }
    },
    {
      name: "TestDivision2",
      boss: pick(names),
      budget: Math.floor(Math.random() * 1000),
      location: {
        country : "Test Country2",
        city: "Test City2"
      }
    },
    
  ]
  const createdDivisions = await divisionModel.create(division);
  
  
  const employees = names.map((name) => {
    const pickedCountry = pick(country);
    return{
    name,
    level: pick(levels),
    position: pick(positions),
    favoriteBrand: pick(createdBrands)._id,
    favoriteColor: pick(colors),
    currentSalary: Math.floor(Math.random() * (60 - 20 + 1) + 20),
    desiredSalary: Math.floor(Math.random() * 10000),
    dateOfStart: randomDate(),
    address: testAddress,
    division: pick(createdDivisions)._id,
    country: pickedCountry.country,
    continent: pickedCountry.continent,
    notes: ["Default text"]
    

  }});

  await EmployeeModel.create(employees, { validateBeforeSave: false });
  console.log("Employees and brands created");

  await toolModel.create(tools);
  console.log("Tools created");

  await boardGameModel.create(boardGames);
  console.log("Board games created");



  
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
