require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");
const employeeModel = require("./db/employee.model");
const FavoriteBrand = require("./db/brand.model");
const brandModel = require("./db/brand.model");
const toolModel = require("./db/tools.model");
const boardGameModel = require("./db/boardGame.model");
const divisionModel = require("./db/divisions.model");
const userModel = require("./db/user.model");
const trainingModel = require("./db/training.model");


const { MONGO_URL, PORT = 8000 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());



app.get("/api/employees/", async (req, res) => {
  try{
  const employees = await EmployeeModel.find().sort({ created: "desc" })
  .populate('session', 'name')
  .exec();
  if(employees){
    return res.json(employees);
  }else{
    res.status(400).json('Error finding employees')
  }
  }catch(error){
    console.error();
    res.status(500).json('Internal server error')
  }
});


app.get("/api/employees-with-equipments/", async (req, res) => {
  try{
  const employees = await EmployeeModel.find().populate("equipment").sort({ created: "desc" });
  if(employees){
    return res.json(employees);
  }else{
    res.status(400).json('Error finding employees with equipments')
  }
  }catch(error){
    console.error();
    res.status(500).json('Internal server error')
  }
});

app.get("/api/employees/:id", async (req, res) => {
  try{
    const employee = await EmployeeModel.findById(req.params.id);
  if(employee){
    return res.json(employee);
  }else{
    res.status(400).json('Error finding employee')
  }
  }catch(error){
    console.error();
    res.status(500).json('Internal server error')
  }
});

app.get('/employees/superheroes', async (req, res) => {
  try {
    const employees = await EmployeeModel.find({ position: "Superhero" });
    if(employees){
      res.json(employees);
    }else{
      res.status(400).json('Error finding superheroes')
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

app.get('/api/brands', async(req,res) =>{
  try{
    const brands = await brandModel.find()
    if(brands){
      return res.json(brands)
    }else{
      res.status(404).json('Brands not found')
    }
  }catch(error){
    console.error();
    res.status(500).json('Internal server error')
  }
})

app.get('/api/v1/brands/:id', async (req,res) =>{
  const id = req.params.id;
  try {
    const brands = await brandModel.findOne({_id:id})
    if(brands){
      return res.json(brands);
    }else{
      res.status(404).json('Brand not found')
    }
    
  } catch (error) {
    res.status(500).json('Internal server error')
  }
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
try{
  EquipmentModel.find()
    .then(equipmentList => {
      if(equipmentList){
        res.json(equipmentList)
      }else{
        res.status(404).json('Not found equipments')
      }
    })
    .catch(err => res.status(400).json({ succes: false }))
}catch(error){
  console.error();
  res.status(500).json('Internal server error')
}
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
  try {
    const equipmentName = req.body.equipmentName;
    const type = req.body.type;
    const amount = req.body.amount;
  
    const equipment = new EquipmentModel({
      equipmentName,
      type,
      amount,
    })
    equipment.save()
      .then(equipment => {
        if(equipment){
          res.json(equipment)
        }else{
          res.status(404).json('Equipment not found')
        }
      })
      .catch(err => res.status(400).json({ succes: false }))
    
  } catch (error) {
    console.error();
    res.status(500).json('Internal server error')
  }


})

app.get('/top-paid', async (req,res) =>{
   const salaries = await EmployeeModel.aggregate([
    {$group: {"_id": "$currentSalary"}},
    {$sort: {"_id": -1}},
    {$limit: 3},
   ])
    .then(salaries => res.json(salaries))
      .catch(err => res.status(500).json('Internal server error'))
})

app.get('/api/v1/tools', (req,res) =>{
  try {
    toolModel.find()
      .then(tools => res.json(tools))
      .catch(err => res.status(400).json('Bad request'));
    
  } catch (error) {
      res.status(500).json({error: error})
  }
})

app.post('/api/v1/tools', async (req,res) =>{

  try {
    const name = req.body.name;
    const weight = req.body.weight;
  
    const tool = new toolModel({
      name,
      weight,
      
    })
    await tool.save()
      .then(tools => {
        if(tools){
          res.json(tool)
        }else{
          res.status(404).json('Tool not found')
        }
      })
      .catch(err => res.status(400).json("Bad request"))
    
  } catch (error) {
    console.error();
    res.status(500).json('Internal server error')
  }

})

app.get('/api/v1/games', (req,res) =>{
  try {
    boardGameModel.find()
      .then(games => res.json(games))
      .catch(err => res.status(400).json('Bad request'))
    
  } catch (error) {
    res.status(500).json('Internal server error')
  }
})

app.post('/api/v1/games', async (req,res) =>{

  try {
    const name = req.body.name;
    const maxPlayers = req.body.maxPlayers;
  
    const game = new boardGameModel({
      name,
      maxPlayers,
      
    })
    await game.save()
      .then(games => {
        if(games){
          res.json(games)
        }else{
          res.status(404).json('Game not found')
        }
      })
      .catch(err => res.status(400).json("Bad request"))
    
  } catch (error) {
    console.error();
    res.status(500).json('Internal server error')
  }

})

app.get('/api/v1/game-list/', (req,res) =>{

  const params = req.query;


  try {
    boardGameModel.find()
    .then(games => {
      let filteredGames = games;
      if (params.maxPlayers) {
        filteredGames = games.filter(game => game.maxPlayers <= params.maxPlayers);
      }
      res.json(filteredGames);
    })
    
  } catch (error) {

    res.status(500).json('Internal server error')
    
  }

})

app.get('/api/v1/games/:id',(req,res)=>{
  const id = req.params.id;

  try {
    boardGameModel.findOne({_id:id})
      .then(game => res.json(game))
      .catch(err => res.status(404).json('Game not found'))

    
  } catch (error) {
    res.status(500).json('Internal server error')
    
  }
})

app.get('/api/v1/tools/query/',(req,res) =>{
  const name = req.params.name;

  const params = req.query;

  try {

    toolModel.find()
      .then(tools =>{
        const filteredTools = tools.filter(tool => tool.name.toLocaleLowerCase().includes(params.name));

        if(filteredTools){
          res.json(filteredTools);
        }else{
          res.status(404).json('Tool not found');
        }
      })
      .catch(err => res.status(400).json('Bad request'))
    
  } catch (error) {
    res.status(500).json('Internal server error');
  }
})

app.get('/api/v1/tools/:id',(req,res) =>{
  const id = req.params.id;

  try {
    toolModel.findById(id)
      .then(tool => res.json(tool))
      .catch(err => res.status(404).json('Not found'))
    
  } catch (error) {

    res.status(500).json('Internal server error')
    
  }
})

app.get('/api/v1/divisions',(req,res) =>{
  try {
    divisionModel.find()
      .then(division => res.json(division))
      .catch(err => res.status(400).json('Bad request'))
    
  } catch (error) {
    res.status(500).json('Internal Server Error')
  }
})

app.get('/api/v1/divisions/:id',(req,res) =>{
  const id = req.params.id;
  try {
    divisionModel.findById({_id:id})
      .then(division => res.json(division))
      .catch(err => res.status(400).json('Bad request'))

    
  } catch (error) {
    res.status(500).json('Internal server error')
  }
})


app.post('/api/v1/divisions', async (req,res) => {

  try{

  const name = req.body.name;
  const boss = req.body.boss;
  const budget = req.body.budget;
  const location = req.body.location;

  const division = new divisionModel({
    name,
    boss,
    budget,
    location
  })

  await division.save()
    .then(div => {
      if(div){
        res.json(div);
      }else{
        res.status(404).json('Not found')
      }
    })
    .catch(err => res.status(400).json('Bad request'))
  }catch(error){
    console.error(error);
  }
})

app.patch("/api/v1/divisions/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedDivision = await divisionModel.findByIdAndUpdate(id, {
      name: req.body.name,
      boss: req.body.boss,
      budget: req.body.budget,
      location: req.body.location
    }, { new: true });

    if (!updatedDivision) {
      res.status(404).json("Item not found");
      return;
    }

    res.status(200).json(updatedDivision);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
})

app.delete("/api/v1/divisions/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletedItem = await divisionModel.findByIdAndDelete(id);

    if (!deletedItem) {
      res.status(404).json("Divion not found");
      return;
    }

    res.status(200).json(deletedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
});

app.get('/api/users',(req,res) =>{
  userModel.find()
    .then(users =>res.json(users))
    .catch(err => {
      res.status(500).json('Internal Server Error')
    })
})

app.get('/api/users/find',(req,res) => {
  const q = req.query;

  userModel.find()
    .then(users =>{
      const filteredUser = users.filter(user => user.name.includes(q.name));
      if(filteredUser){
        res.json(filteredUser)
      }
    })
    .catch(error => res.status(500).json('Internal server error'))
})

app.get('/api/users/older',(req,res) =>{
  const q = req.query;
  userModel.find()
    .then(users => {
     const olderUser= users.filter(user => user.age >= q.age );

     if(olderUser){
      res.json(olderUser)
     }else{
      res.status(400).json('Bad request')
     }
    })
    .catch(err => {
      res.status(500).json('Internal server error')
    })
})

app.get('/api/older',(req,res) =>{
  userModel.find()
    .then(users => {
      const allUser = users.map(user => user);

      const filteredUsers = allUser.filter(user => user.age >= 30)

      if(filteredUsers){
        res.json(filteredUsers)
      }
    })
    .catch(err => {
      res.status(500).json('Internal server error')
    })
})

app.get('/api/email',(req,res) =>{
  userModel.find()
    .then(user => {

      const allUser = user.map(users => users);
      const filteredUsers = user.filter(users => users.email.includes('@gmail.com'))

      if(filteredUsers){
        res.json(filteredUsers)
      }
    })
    .catch(error => res.status(500).json('Internal server error', error))
})

app.get('/api/users/:id',(req,res) => {
  const id = req.params.id

  userModel.findById(id)
    .then(user => res.json(user))
    .catch(err => res.status(500).json('Internal Server Error'))
})

app.patch('/api/users/:id', (req,res) =>{
  const id = req.params.id;

  const name = req.body.name

   userModel.findByIdAndUpdate(id,{...req.body})
    .then(response => res.json(response))
    .catch(err => res.status(500).json('Internal Server Error',err))
})

app.delete('/api/users',(req,res) =>{
  userModel.deleteMany({age: {$gte: 40}})
    .then(res.json({succes:true}))
    .catch(err => res.json({succes:false}))
})

app.post('/api/users',(req,res) => {

  userModel.create({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    regDate: req.body.regDate
  })
    .then(user => {
      res.json(user)
    })
    .catch(err => res.json({succes: false}))

})

app.delete('/api/user/:id',(req,res) =>{
  const id = req.params.id;

  userModel.findByIdAndDelete(id)
    .then(response => res.json({succes:true}))
    .catch(err => res.json({succes:false}))
})

app.post('/api/users/create',(req,res) =>{
    const newUser = new userModel({
      name: req.body.name,
      age:req.body.age,
      email:req.body.email,
      regDate: Date.now()
    })
    newUser.save()
      .then(response => res.json({response}))
      .catch(err => res.status(500).json('Internal server error'))
})

app.get('/api/users/read/get',(req,res) =>{
  userModel.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json('Internal server error'))
})

app.get('/api/users/read/get/:id',(req,res) =>{
  const id = req.params.id;

    userModel.findById(id)
      .then(user => res.json(user))
      .catch(err => res.status(500).json('Internal server error'))
})

app.patch('/api/users/update/patch/:id',(req,res)=>{
  const id = req.params.id
  userModel.findByIdAndUpdate(id,{...req.body})
    .then(user => res.json(user))
    .catch(err => res.status(500).json('Internal server error'))
})

app.delete('/api/users/delete/delete/:id',(req,res)=>{
  const id = req.params.id;
    userModel.findByIdAndDelete(id)
      .then(response => res.json({succes:true}))
      .catch(err => res.status(500).json('Internal server error'))
})

app.get('/api/age/read/get',(req,res) =>{

  const q = req.query;

    userModel.find()
      .then(users => {
        const filteredUsers = users.filter(user => user.age <= q.age);

        if(filteredUsers){
          res.json(filteredUsers)
        }else{
          res.status(400).json('Bad request')
        }
      })
      .catch(err => res.status(500).json('Internal server error'))
})

app.get('/api/users/email/:email',(req,res)=>{
  const email = req.params.email;
    userModel.find()
      .then(users => {
        const filteredUser = users.filter(user => user.email === email);

        if(filteredUser){
          res.json(filteredUser)
        }else{
          res.status(400).json('Bad request')
        }
      })
      .catch(err => res.status(500).json('Internal server error'))
})

app.get('/api/users/number/count',(req,res)=>{
  let count = 0;
   userModel.countDocuments()
      .then(count => {
        res.json({count:count })
      })
      .catch(err => res.status(500).json('Internal server error'))
})

app.patch('/api/users/name/up/:id',(req,res)=>{
  const id = req.params.id
    userModel.findByIdAndUpdate(id,{
      name: req.body.name
    })
    .then(response => res.json(response))
    .catch(err => res.status(500).json('Internal server error'))
})

app.get('/api/users/date/:year',(req,res)=>{
  const year = req.params.year
    userModel.find()
      .then(response => {
        const filteredUsers = response.filter(user => user.regDate.getFullYear() === parseInt(year));

        if(filteredUsers){
          res.json(filteredUsers)
        }else{
          res.status(400).json('Bad request')
        }
      })
      .catch(err => res.status(500).json('Internal server error'))
})

app.get('/api/users/search/:search',(req,res)=>{
  const search = req.params.search;

    userModel.find()
      .then(users => {
        const filteredUser = users.filter(user => (user.name.includes(search) || user.age === parseInt(search) || user.email === search))

        filteredUser ? res.json(filteredUser) : res.status(400).json({error: 'Bad request'})
      } )
      .catch(err => res.status(500).json({error: 'Internal server error'}))
})

app.delete('/api/delete-users/:year',(req,res) =>{
  const year = parseInt(req.params.year)

    userModel.find()
      .then(users => {
        const filteredUsers = users.filter(user => user.regDate.getFullYear() === year)

        if(filteredUsers){
          const names = filteredUsers.map(user => {
            userModel.deleteOne({name:user.name})
              .then(response => res.status(204).json({succes:true, response: response}))
              .catch(err => res.status(404).json('Not found'))
          })
        }else{
          res.status(400).json('Bad request')
        }
      
      })
      .catch(err => res.status(500).json('Internal server error'))
})

app.get('/api/v1/training-session',(req,res) =>{
    trainingModel.find()
      .then(training => res.json(training))
      .catch(error => res.status(500).json({status : 'Internal  server error', error: error}))
})

app.get('/api/v1/training-session/:id',(req,res) =>{
  trainingModel.findById(req.params.id)
    .then(training => res.json(training))
    .catch(error => res.status(500).json({status : 'Internal  server error', error: error}))
})

app.post('/api/v1/training-session', async (req,res) => {

  const name = req.body.name;
  const difficulty = req.body.difficulty
    
  const newTraining = new trainingModel({
    name,
    difficulty
  })
  await newTraining.save()
    .then(response => res.json(response))
    .catch(error => res.status(500).json({status : 'Internal  server error', error: error}))
})

app.patch('/api/v1/training-session/:id',(req,res) =>{
  trainingModel.findByIdAndUpdate(req.params.id,{...req.body})
    .then(response => res.json(response))
    .catch(error => res.status(500).json({status : 'Internal  server error', error: error}))
})

app.delete('/api/v1/training-session/:id',(req,res) => {
  trainingModel.findByIdAndRemove(req.params.id)
    .then(response => res.json({succes:true}))
    .catch(error => res.status(500).json({status : 'Internal  server error', error: error}))
})



const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log(`App listening on: http://localhost:${PORT}`);
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
