import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



export default function GameListId() {
    const { id } = useParams()

    const [tool, setTools] = useState([]);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await fetch(`/api/v1/tools/${id}`)
                const data = await response.json();

                if (response.ok) {
                    setTools(data);
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
                    <th>Name</th>
                    <th>Weight</th>
                </thead>
                <tbody>
                    <tr key={tool._id}>
                        <td>{tool.name}</td>
                        <td>{tool.weight}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}