import { useState } from "react"
import { useNavigate } from "react-router-dom"




export default function UserCreator() {
    const navigate = useNavigate()

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [age,setAge] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault()
        fetch(`/api/users`,{
            method:"POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                name:name,
                age: parseInt(age),
                email: email,
                regDate: Date.now()
            })
        })
        .then(response => {
            if(response.ok){
                console.log("New user created");
                navigate('/users')
            }else{
                throw new Error ('Network response error', Error)
            }
        })
        .catch(error => {
            console.log(error);
            throw new Error ('Internal server error', Error)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label>
                    Age
                </label>
                <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
                <label>
                    Email
                </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )

}