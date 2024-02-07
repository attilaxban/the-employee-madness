import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



export default function GameListId() {
    const { id } = useParams()

    const [game, setGame] = useState([]);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await fetch(`/api/v1/games/${id}`)
                const data = await response.json();

                if (response.ok) {
                    setGame(data);
                } else {
                    console.log(response.status, "error")
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchGame()

    }, [])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Max Players</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={game._id}>
                        <td>{game.name}</td>
                        <td>{game.maxPlayers}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}