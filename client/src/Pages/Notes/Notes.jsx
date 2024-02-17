import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



export default function Notes (){

    const {employeeId} = useParams();

    const [employee,setEmployee] = useState([]);
    const [newNote,setNewNote] = useState('');

    const fetchEmployee = async() =>{

       try {
        const response = await fetch (`/api/employees/${employeeId}`);
        const data = await response.json();

        if(response.ok){
            setEmployee(data.notes)
        }else{
            console.log(response.status);
            throw new Error ('Network response error')
        }
        
       } catch (error) {
        console.error(error);
       }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const data = [...employee,newNote];

     try {

        const response = await fetch(`/api/employees/${employeeId}`,{
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({notes: [...employee,newNote]})
        })

        if(response.ok){
            console.log("Data POSTED");
            setEmployee(data)
        }else{
            console.log(response.status);
        }
        
     } catch (error) {

        console.error(error);
        
     }

    }

    useEffect(() =>{
        fetchEmployee()
    },[])

    return (
        <div>
            <ul>
                {employee && employee.map((note,index) => (
                    <li key={index}>{note}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <label>
                    New Note:
                </label>
                    <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )

}