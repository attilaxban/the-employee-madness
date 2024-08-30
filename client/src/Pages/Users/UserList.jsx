import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function UserList(){

    const [users,setUsers] = useState('');

    const fetchUsers = async () => {
        try {

            const response = await fetch('/api/users');
            const data = await response.json();

            if(response.ok){
                setUsers(data);
            }else{
                console.log(response.status);
                throw new Error ('Network response error', Error);
            }
            
        } catch (error) {
            console.log('Internal server error',error);
        }
    }

    const handleDelete = async (id) =>{

        try {

            const response = await fetch (`/api/user/${id}`,{method: "DELETE"})
            if(response.ok){

                setUsers((users) => {
                    return users.filter((user) => user._id !== id);
              
                  });
                console.log("User Deleted");
            }else{
                throw new Error ('Network response error', Error)
            }
            
        } catch (error) {

            console.log(error);
            throw new Error ('Internal server error ', Error)
            
        }
       
    }

    useEffect(() => {
        fetchUsers();

    },[])

    return(
        <div>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Registration Date</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.email}</td>
                            <td>{user.regDate}</td>
                            <td>
                            <Link to = {`/users/${user._id}`}><button>Edit</button></Link>
                            </td>
                            <td>
                                <button onClick={(e) => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}