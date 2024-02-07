import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../../Components/EmployeeForm";
import Loading from "../../Components/Loading";
import Equipments from "../Equipments/Equipments";

const updateEmployee = (employee) => {
  return fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEmployee = (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};

const EmployeeUpdater = () => {
  const [date,setDate] = useState('')
  const [currSalary,setCurrSalary] = useState('')
  const [desSalary, setDesSalary] = useState('')
  const [color,setColor] = useState('')
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
  const[equipment,setEquipment] = useState('');
  const [brands,setBrands] = useState('');
  const [games,setGames] = useState('')

  useEffect(() => {
    setEmployeeLoading(true);
    fetchEmployee(id)
      .then((employee) => {
        setEmployee(employee);
        setCurrSalary(employee.currentSalary)
        setDesSalary(employee.desiredSalary)
        setDate(employee.startDate)
        setSelectedEquipment(employee.equipment)
        setSelectedBrand(employee.favoriteBrand)
        setSelectedGame(employee.favoriteBoardGame)
        setColor(employee.favoriteColor);
        setEmployeeLoading(false);
      });
  }, [id]);

  const handleUpdateEmployee = (employee) => {
    
    if(selectedEquipment){
      employee.equipment = selectedEquipment;

    if(selectedBrand){
      employee.favoriteBrand = selectedBrand;
    }

    if(selectedGame){
      employee.favoriteBoardGame = selectedGame
    }

    employee.dateOfStart = date;
    employee.favoriteColor = color;
    employee.currentSalary = currSalary;
    employee.desiredSalary = desSalary;
    
    setUpdateLoading(true);
    updateEmployee(employee)
      .then(() => {
        setUpdateLoading(false);
        navigate("/");
      });
    }else{
      console.error("Selected equipment is not defined");
    }
  };

  useEffect(() =>{
   fetch('/api/equipments')
    .then(response => response.json())
    .then(response => {
      setEquipment(response);
      console.log(equipment);
    })

  },[])

  useEffect(() =>{
    fetch('/api/brands')
      .then(response => response.json())
      .then(response =>{
        setBrands(response)
      })

  },[])

  useEffect(() =>{
    fetch('/api/v1/games')
      .then(response => response.json())
      .then(response =>{
        setGames(response)
      })

  },[])

  // useEffect(() =>{
  //   const fetchBrand = async () =>{
  //    const response = await fetch(`/api/v1/brands/${employee.favoriteBrand}`)
  //    const data = await response.json()
  //    if(response.ok){
  //     setSelectedBrand(data.name);
  //    }else{
  //     console.log(response.status);
  //    }

  //   }
  //   fetchBrand()
  // },[])

  


  if (employeeLoading) {
    return <Loading />;
  }

  return (
    //select maradjon meg a kiválasztott controlled - uncontrolled komponensek
    <div>
      <EmployeeForm
      employee={employee}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
      
      equipments= {
          <select value={selectedEquipment} onChange={(e) => setSelectedEquipment(e.target.value)}>
        {equipment&&equipment.map(item => (
        <option key={item._id} value={item._id}>{item.equipmentName}</option>
      ))}
       </select>}
      favBrands={
        <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
          {brands && brands.map(brand =>(<option key={brand._id} value={brand._id}>{brand.name}</option>))}
        </select>
      }

      startDate={
        <input type="date" value={date}  onChange={(e) => setDate(e.target.value) } />
      }

      currSalary={
        <input type="text"  value={currSalary} onChange={(e) => setCurrSalary(e.target.value)} />
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

    />
    </div>
  );
};

export default EmployeeUpdater;
