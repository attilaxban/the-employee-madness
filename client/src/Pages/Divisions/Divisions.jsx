import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import DivisionUpdater from "./DivisionUpdater";



export default function Division (){

    const navigate = useNavigate()

    const [divisions,setDivisions] = useState([]);
    const [edit,setEdit] = useState(false);
    const [divisionId,setDivisionId] = useState('');

    useEffect(() => {
        const fetchDivision = async () => {
            try {
                const response = await fetch('/api/v1/divisions');
                const data = await response.json();

                if(response.ok){
                    setDivisions(data);
                }else{
                    console.log(response.status);
                }
                
            } catch (error) {
                console.error(error);
            }
        }
        fetchDivision()
    },[])

    const deleteDivision = async (id) => {
        console.log(id);
        try {
            const response = await fetch(`/api/v1/divisions/${id}`, { method: "DELETE" });
            if (response.ok) {
                const updatedDivisions = divisions.filter(division => division._id !== id);
                setDivisions(updatedDivisions);
                console.log('Division deleted successfully');
            } else {
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.error('Error deleting division:', error);
        }
    };
    return (
        <div>
        {!edit ? (<table>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Budget</th>
                        <th>Boss</th>
                        <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {divisions && divisions.map(division => (
                            <tr key={division._id}>
                                <td>{division.name}</td>
                                <td>{division.budget}</td>
                                <td>{division.boss}</td>
                                <td>{division.location.city}</td>
                                <td><button onClick={() => deleteDivision(division._id)}>Delete</button></td>
                                <td><button onClick={() => {setEdit(true); setDivisionId(division._id)}}>Edit</button></td>
                               <td><button onClick={() => navigate(`/division/${division._id}`)}>Show More</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>):(
                    <div>
                        <DivisionUpdater
                        id={divisionId}
                        setEdit={setEdit}
                         />
                    </div>
                )}
        </div>
    )
}