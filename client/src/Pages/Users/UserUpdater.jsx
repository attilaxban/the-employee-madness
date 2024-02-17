import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function UserUpdater() {
    const [user,setUser] = useState('');
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [age,setAge] = useState('')

    const {id} = useParams();

    const fetchUser = async () =>{
        try {
            const response = await fetch(`/api/users/${id}`)
            const data = await response.json();

            if(response.ok){
                setUser(data)
                setName(data.name)
                setAge(data.age)
                setEmail(data.email)
            }else{
                console.log(response.status);
                throw new Error ('Network response error', Error);
            }
            
        } catch (error) {

            console.log(error);
            throw new Error ('Internal server error', Error)
            
        }
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            const response = await fetch (`/api/users/${id}`,{
                method: "PATCH",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    name: name,
                    age: parseInt(age),
                    email: email,  
                })

            })
        if(response.ok){
            console.log("Data patched");


        }else{
            throw new Error ('Network response error', Error)
        }
            
        } catch (error) {

            console.log(error);
            throw new Error ('Internal server error', Error)
            
        }

    }

    useEffect(() =>{
        fetchUser()
    },[])

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label>
                    Age:
                </label>
                <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
                <label>
                    Email:
                </label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
    
}