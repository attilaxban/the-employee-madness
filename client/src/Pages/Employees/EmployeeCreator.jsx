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
  const [selectedEquipment,setSelectedEquipment] = useState(null)
  const [selectedBrands,setSelectedBrand] = useState(null)

  const handleCreateEmployee = (employee) => {

    if(selectedEquipment){
      employee.equipment = selectedEquipment;
    }

    if(selectedBrands){
      employee.favoriteBrand = selectedBrands;
    }
    employee.dateOfStart = date;
    employee.favoriteColor = color;
    employee.currentSalary = currSalary;
    employee.desiredSalary = desSalary;
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
    />
  );
};

export default EmployeeCreator;
