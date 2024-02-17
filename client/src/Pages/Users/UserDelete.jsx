import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";




export default function UserDelete (){
    const[user,setUser] = useState('')
    const {id} = useParams()    
    const navigate = useNavigate()

    const fetchUser = () =>{
        fetch(`/api/users/${id}`)
            .then(response => response.json())
            .then(data => {
                setUser(data)
            })
            .catch(error => {
                throw new Error ('Network response error', Error)
            })
    }

    const handleDelete = async () =>{

        try {

            const response = await fetch (`/api/user/${id}`,{method: "DELETE"})
            if(response.ok){
                console.log("User Deleted");
                navigate('/users')
            }else{
                throw new Error ('Network response error', Error)
            }
            
        } catch (error) {

            console.log(error);
            throw new Error ('Internal server error ', Error)
            
        }
       
    }

    useEffect(() =>{
        fetchUser()
    },[])


    return (
        <div>


        <h1>Are you sure you want to delete {user.name}?</h1>
        <button onClick={handleDelete}>Yes</button>
        <button onClick={(e) => navigate('/users')}>No</button>

        </div>
    )
}