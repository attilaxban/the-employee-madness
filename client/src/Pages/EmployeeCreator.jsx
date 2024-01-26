import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";

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
    />
  );
};

export default EmployeeCreator;
