import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function DivisionId (){

    const {id} = useParams();

    const [division,setDivision] = useState([]);
    const [employees,setEmployees] = useState([]);

    const fetchDivision = async () =>{

        try {
          const response = await fetch(`/api/v1/divisions/${id}`);
          const data = await response.json();

          if(response.ok){
              setDivision(data);
          }else{
              console.log(response.status);
          }
          
        } catch (error) {

          console.error(error);
          
        }
      }

      const fetchEmployees = async () =>{
       try {
        const response = await fetch('/api/employees');
        const data = await response.json();

        if(response.ok){
            console.log(data);
            setEmployees(data)
        }else{
            console.log(response.status);
        }
        
       } catch (error) {

        console.error(error);
       }
      }


   

    useEffect(() => {
        fetchDivision();
        fetchEmployees();
    },[])
    
    const filteredEmployees = employees.filter(employee => employee.division === division._id);


    return(
        <div>
            <table>
                <thead>
                    <th>{division.name}</th>
                    <th>{division.boss}</th>
                </thead>
                <tbody>
                   {filteredEmployees && filteredEmployees.map(employee => (
                    <tr key={employee._id}>
                        <td>{employee.name}</td>
                        <td>{employee.position}</td>
                    </tr>
                   ))}
                </tbody>
            </table>
        </div>
    )
}