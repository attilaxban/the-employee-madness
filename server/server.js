require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");
const employeeModel = require("./db/employee.model");
const FavoriteBrand = require("./db/brand.model");
const brandModel = require("./db/brand.model");


const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

//hibakezelés olyan hibakód ami utal a hibára

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  return res.json(employees);
});


app.get("/api/employees-with-equipments/", async (req, res) => {
  const employees = await EmployeeModel.find().populate("equipment").sort({ created: "desc" });
  return res.json(employees);
});

app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  return res.json(employee);
});

app.get('/employees/superheroes', async (req, res) => {
  try {
    const employees = await EmployeeModel.find({ position: "Superhero" });

    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

app.get('/api/brands', async(req,res) =>{
  const brands = await brandModel.find()
    return res.json(brands)
})


app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});


app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});


app.get("/employees/:search", async (req, res) => {
  try {
    const search = req.params.search.toLowerCase();

    const employees = await EmployeeModel.find();
    const filteredEmployees = await employees.filter(employee => employee.name.toLowerCase().includes(search));

    if (filteredEmployees.length > 0) {
      res.status(200).json(filteredEmployees);
    } else {
      res.status(404).json("Employees not found");
    }
  }catch(error){
    console.error(error);
  }

});





app.get("/api/equipments", (req, res) => {

  EquipmentModel.find()
    .then(equipmentList => res.json(equipmentList))
    .catch(err => res.status(400).json({ succes: false }))
})

app.get('/api/equipments/:itemId', async (req, res) => {
  try {

    const itemId = req.params.itemId;
    await EquipmentModel.findOne({ _id: itemId })
      .then(equipmentList => {
        res.send(equipmentList)
      })
  } catch (error) {
    console.error(error);
    res.status(404).json("Item not found");
  }
})

app.patch("/api/equipments/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const updatedItems = await EquipmentModel.findByIdAndUpdate(itemId, {
      equipmentName: req.body.equipmentName,
      type: req.body.type,
      amount: req.body.amount
    }, { new: true });

    if (!updatedItems) {
      res.status(404).json("Item not found");
      return;
    }

    res.status(200).json(updatedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
});


app.delete("/api/equipments/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;

    const deletedItem = await EquipmentModel.findByIdAndDelete(itemId);

    if (!deletedItem) {
      res.status(404).json("Item not found");
      return;
    }

    res.status(200).json(deletedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
});


app.post("/api/equipments", (req, res) => {

  const equipmentName = req.body.equipmentName;
  const type = req.body.type;
  const amount = req.body.amount;

  const equipment = new EquipmentModel({
    equipmentName,
    type,
    amount,
  })
  equipment.save()
    .then(equipment => res.json(equipment))
    .catch(err => res.status(400).json({ succes: false }))

})








const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
