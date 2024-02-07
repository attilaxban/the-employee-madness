import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";





export default function GameListQuery() {

    const location = useLocation();

    let [searchParams, setSearchParams] = useSearchParams();


    const queryParams = new URLSearchParams(location.search);
    const maxPlayers = queryParams.get('maxPlayers');

    const [games, setGames] = useState([]);

    useEffect(() => {
        console.log(searchParams.get("maxPlayers"));
        const fetchGames = async () => {
            try {

                const response = await fetch(`/api/v1/game-list?maxPlayers=${searchParams.get("maxPlayers")}`);
                const data = await response.json();

                if (response.ok) {
                    setGames(data);
                    

                } else {
                    console.log('Error:', response.status);
                }


            } catch (error) {

                console.log("Error: ", error);

            }

        }
        fetchGames()
    }, [maxPlayers])

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
                    {games && games.map(game => (
                        <tr key={game._id}>
                            <td>{game.name}</td>
                            <td>{game.maxPlayers}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}