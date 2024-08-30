import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";




export default function GameList(){

    const {id} = useParams();

    const [games,setGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        const fetchGames = async () =>{
            try {

                const response = await fetch('/api/v1/games');
                const data = await response.json();

                if(response.ok){
                    setGames(data);
                    console.log(data);
                }else{
                    console.log('Error:', response.status);
                }

                
            } catch (error) {

                console.log("Error: ", error );
                
            }
            
        }
        fetchGames()
    },[])

   
    const handleNavigate = (gameId) =>{
        navigate(`/games-list/${gameId}`)
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Max Player</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map(game => (
                        <tr key={game._id}>
                            <td>{game.name}</td>
                            <td>{game.maxPlayers}</td>
                            <td><button onClick={() => handleNavigate(game._id)}>Show game</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}