import React from "react";
import { useState, useEffect } from "react";
import EquipmentTable from "../../Components/EquipmentTable/EquipmentTable";
import { Link } from "react-router-dom";


export default function Equipments ({onSelectEquipments} ){

    const [equipmentName,setEquipmentName] = useState('')
    const [type,setType] = useState('')
    const [amount,setAmount] = useState('')


    const handleSubmit = async (e) =>{
        e.preventDefault();
        const data = {equipmentName,type,amount};
        await fetch('/api/equipments',{
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(response =>{
                console.log(response);
            })

            .catch(error => console.error(error))
    }

    const handleSelectEquipments = () =>{
      onSelectEquipments([equipmentName,type,amount]);
    }



    
    return (
          
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  value={equipmentName}
                  onChange={(e) => setEquipmentName(e.target.value)}
                />
              </label>
              <label>
                Type:
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </label>
              <label>
                Amount:
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </label>
              <button type="submit">Submit</button>
              <Link  to= "/equipments" >
                <button>Equipment table</button>
              </Link>
            </form>   
      );
}