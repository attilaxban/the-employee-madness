import React from "react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import EmployeeTable from "../../Components/EmployeeTable";

export default function MissingEmployees (){
    
    const [presented,setPresented] = useState([]);

    const updatePresentation = async (employeeId) => {
        try{
          const response = await fetch(`/api/employees/${employeeId}`,{
            method: 'PATCH',
            headers : {"Content-Type" : "application/json"},
            body: JSON.stringify({
              present: true
            })
          })
          if(response.ok){
            console.log('Presented');
          }else{
            console.error('Error check');
          }
        }catch(error){
          console.error(error);
        }         
    }

    useEffect(()=>{
        fetch('/api/employees')
            .then(response => response.json())
            .then(data =>{
                const filteredEmployees = data.filter((employee) => employee.present === false);

                if(filteredEmployees){
                    setPresented(filteredEmployees);
                }else{
                    console.log('Everyone has been presented');
                }

            })
    },[])

    return (
      <div>
        <table>
            <thead>
                <tr>
                <th>Name</th>
                <th>Level</th>
                <th>Position</th>
                </tr>
            </thead>
            <tbody>
                {presented.map((employee) =>(
                    <tr key={employee._id}>
                        <th>{employee.name}</th>
                        <th>{employee.level}</th>
                        <th>{employee.position}</th>
                        <th><button onClick={() => updatePresentation(employee._id)}>Delete</button></th>
                    </tr>
                ))}

            </tbody>
        </table>
       
      </div>
    );
  };