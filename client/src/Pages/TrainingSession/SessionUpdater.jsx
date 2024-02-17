import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function SessionUpdater(){
    const location = useLocation()
    const navigate = useNavigate()




    const [name,setName] = useState('');
    const [difficulty,setDifficulty] = useState('')
    const [id,setId] = useState('')

    const fetchSession = async () =>{
     try {
        const response = await fetch(`/api/v1/training-session/${location.state}`)
        const data = await response.json();

        if(response.ok){
            setName(data.name)
            setDifficulty(data.difficulty)
            setId(data._id)
        }else{
            throw new Error('Internal server error')
        }
        
     } catch (error) {
        console.error(error);
        throw new Error ('Network response error');
     }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`/api/v1/training-session/${id}`,{
                method:"PATCH",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    name: name,
                    difficulty: difficulty
                })
            })

            if(response.ok){
                console.log("Patched");
                navigate('/session/create')
            }else{
                throw new Error ('Internal server error')
            }

            
        } catch (error) {
            console.error();
            throw new Error ('Network response error')
        }

    }



    
useEffect(() => {
    fetchSession()
    console.log(location.state);
},[])

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                <label>Difficulty</label>
                <input type="text" name="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )

}