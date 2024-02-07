import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import EmployeeTable from "../../Components/EmployeeTable";


export default function Superheroes (){
    const [superHeroes, setSuperheroes] = useState([]);

    useEffect(() =>{
        fetch('/employees/superheroes')
            .then(response => response.json())
            .then(data => {
                setSuperheroes(data)
            })
    },[])


    return (
        <EmployeeTable
        employees={superHeroes} />
    )
}