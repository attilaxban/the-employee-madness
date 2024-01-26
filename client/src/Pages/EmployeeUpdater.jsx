import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";
import Equipments from "./Equipments";

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
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
  const[equipment,setEquipment] = useState(null);
  const [brands,setBrands] = useState(null);

  useEffect(() => {
    setEmployeeLoading(true);
    fetchEmployee(id)
      .then((employee) => {
        setEmployee(employee);
        setEmployeeLoading(false);
      });
  }, [id]);

  const handleUpdateEmployee = (employee) => {
    
    if(selectedEquipment){
      employee.equipment = selectedEquipment;

    if(selectedBrand){
      employee.favoriteBrand = selectedBrand;
    }
    
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
          <select defaultValue={employee._id} onChange={(e) => setSelectedEquipment(e.target.value)}>
        {equipment&&equipment.map(item => (
        <option key={item._id} value={item._id}>{item.equipmentName}</option>
      ))}
       </select>}
      favBrands={
        <select defaultValue={employee._id} onChange={(e) => setSelectedBrand(e.target.value)}>
          {brands && brands.map(brand =>(<option key={brand._id} value={brand._id}>{brand.name}</option>))}
        </select>
      }

    />
    </div>
  );
};

export default EmployeeUpdater;
