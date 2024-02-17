import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export default function FindUser(){
    const [users,setUsers] = useState('');

    const location = useLocation()

    const params = new URLSearchParams(location.search).get('name');
    console.log(params);

    const fetchUsers = async () => {
        try {

            const response = await fetch('/api/users');
            const data = await response.json();

            if(response.ok){
                const user = data.map(users => users)

                const filteredUser = user.filter(x => x.name.includes(params))

                if(filteredUser){
                    console.log(filteredUser);
                    setUsers(filteredUser)
                }

                    
            }else{
                console.log(response.status);
                throw new Error ('Network response error', Error);
            }
            
        } catch (error) {
            console.log('Internal server error',error);
        }
    }

    useEffect(() => {

        fetchUsers()
       
    },[])


    return(
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
                    </tr>
                       ))}
                </tbody>
            </table>
    )

}