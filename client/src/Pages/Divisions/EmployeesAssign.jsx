import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



export default function EmployeesAssign() {
    const[employee,setEmployee] = useState('')
    const [divisions,setDivisions] = useState('')
    const [selectedDivision,setSelectedDivision] = useState('')
    const {id} = useParams();

    useEffect(() => {
        const fetchData = async (url,setFunction) =>{
            try{
            
            const response = await fetch(url);
            const data = await response.json();

            if(response.ok){
                setFunction(data);
            }else{
                console.log(response.status);
            }
        }catch(error){
            console.error(error);
        }
     }
     fetchData(`/api/employees/${id}`, setEmployee);
     fetchData(`/api/v1/divisions`,setDivisions)
    },[])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await fetch(`/api/employees/${id}`,{
                method: "PATCH",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({division: selectedDivision})
            })

            if(response.ok){
                console.log("Data PATCHED");
                console.log(selectedDivision);
            }else{
                console.log(response.status);
                console.log(selectedDivision);
            }
            
        } catch (error) {
            console.error(error );
        }
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Division</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{employee.name}</td>
                        <td> {employee.division}</td>
                    </tr>
                </tbody>
            </table>

            <form onSubmit={handleSubmit}>
                <label htmlFor="">
                    Name:
                    <input type="text" value={employee.name} disabled />
                </label>
                <label htmlFor="">
                    Position:
                    <input type="text" value={employee.position} disabled />
                </label>
                <label htmlFor="">
                    Level:
                    <input type="text" value={employee.level} disabled />
                </label>
                <label>
                    Division:
                </label>
            <select value={selectedDivision} onChange={(e) => setSelectedDivision(e.target.value)}>
                {divisions && divisions.map(division => (
                    <option key={division._id}>{division._id}</option>

                ))}
            </select>
            <button type="submit">Submit</button>
            </form>

            
        </div>
    )
}