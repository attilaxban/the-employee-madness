import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../../Components/EmployeeForm";

const createEmployee = (employee) => {
  return fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const EmployeeCreator = () => {
  const [date,setDate] = useState('')
  const [currSalary,setCurrSalary] = useState('')
  const [desSalary, setDesSalary] = useState('')
  const [color,setColor] = useState('')
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const[equipment,setEquipment] = useState(null);
  const [brands,setBrands] = useState(null);
  const [sessions,setSessions] = useState(null)
  const [games,setGames] = useState(null);
  const [tools,setTools] = useState(null)
  const [country,setCountry] = useState('');
  const [city,setCity] = useState('');
  const [street,setStreet] = useState('');
  const [zipcode,setZipcode] = useState('');
  const [selectedEquipment,setSelectedEquipment] = useState(null)
  const [selectedBrands,setSelectedBrand] = useState(null)
  const [selectedSession,setSelectedSession] = useState(null)
  const[selectedGame,setSelectedGame] = useState(null)
  const [selectedTool,setSelectedTool] = useState(null)

  const handleCreateEmployee = (employee) => {

    if(selectedEquipment){
      employee.equipment = selectedEquipment;
    }

    if(selectedBrands){
      employee.favoriteBrand = selectedBrands;
    }
    if(selectedSession){
      employee.session = selectedSession;
    }
    if(selectedGame){
      employee.favoriteBoardGame = selectedGame;
    }
    if(selectedTool){
      employee.favoriteTool = selectedTool;
    }
    employee.dateOfStart = date;
    employee.favoriteColor = color;
    employee.currentSalary = currSalary;
    employee.desiredSalary = desSalary;
    employee.address = {
      country:country,
      city: city,
      street:street,
      zipCode: parseInt(zipcode)
    }
    setLoading(true);

    createEmployee(employee)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
  };

  useEffect(()=>{
    fetch('/api/equipments')
      .then(resp => resp.json())
      .then(resp => {
        setEquipment(resp);
      })
  },[])

  useEffect(()=>{
    fetch('/api/brands')
      .then(resp => resp.json())
      .then(resp => {
        setBrands(resp);
      })
  },[])

  useEffect(()=>{
    fetch('/api/v1/training-session')
      .then(resp => resp.json())
      .then(resp => {
        setSessions(resp);
      })
  },[])

  useEffect(()=>{
    fetch('/api/v1/tools')
      .then(resp => resp.json())
      .then(resp => {
        setTools(resp);
      })
  },[])

  useEffect(()=>{
    fetch('/api/v1/games')
      .then(resp => resp.json())
      .then(resp => {
        setGames(resp);
      })
  },[])

  return (
    <EmployeeForm
      onCancel={() => navigate("/")}
      disabled={loading}
      onSave={handleCreateEmployee}
      equipments= {
        <select  onChange={(e) => setSelectedEquipment(e.target.value)}>
      {equipment&&equipment.map(item => (
      <option key={item._id} value={item._id}>{item.equipmentName}</option>
    ))}
     </select>}
    favBrands={
      <select  onChange={(e) => setSelectedBrand(e.target.value)}>
        {brands && brands.map(brand =>(<option key={brand._id} value={brand._id}>{brand.name}</option>))}
      </select>
    }
    startDate={
      <input type="date" value={date} onChange={(e) => setDate(e.target.value) } />
    }

    currSalary={
      <input type="text" value={currSalary} onChange={(e) => setCurrSalary(e.target.value)} />
    }
    desSalary={
      <input type="text" value={desSalary} onChange={(e) => setDesSalary(e.target.value)} />
    }

    favColor={
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
    }
    boardGame={
      <select value={selectedGame} onChange={(e) => setSelectedGame(e.target.value)}>
        {games && games.map(game =>(<option key={game._id} value={game._id}>{game.name}</option>))}
      </select>
    }
    favTool={
      <select value={selectedTool} onChange={(e) => setSelectedTool(e.target.value)}>
        {tools && tools.map(tool => (
          <option key={tool._id} value={tool._id}>{tool.name}</option>
        ))}
      </select>
    }
    session={
      <select value={selectedSession} onChange={(e) => setSelectedSession(e.target.value)}>
        {sessions && sessions.map(session =>(<option key={session._id} value={session._id}>{session.name}</option>))}
      </select>
  }
  address={
    <div>
        <label htmlFor="">Country</label>
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} /> 
        <label htmlFor="" >City</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} /> 
        <label htmlFor="" >Street</label>
        <input type="text" value={street} onChange={(e) => setStreet(e.target.value)}  /> 
        <label htmlFor="" >Zip-Code</label>
        <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} /> 
      </div>

  }
    />
  );
};

export default EmployeeCreator;
