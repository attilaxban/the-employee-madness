import { useEffect, useState } from "react"

export default function Games(){

    const [name,setName] = useState('')
    const [maxPlayers,setMaxPlayers] = useState('');

    const [game,setGame] = useState([]);

    useEffect(() =>{
        const fetchGames = async () =>{

           try {
            const response = await fetch('/api/v1/games')
            const data = await response.json();

            if(response.ok){
                setGame(data);
            }else{
                console.log(response.status);
            }
            
           } catch (error) {

            console.error(error)
            
           }

        }
        fetchGames();
    },[])

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const data = {name,maxPlayers}

        try {

            const response = await fetch ('/api/v1/games',{
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(data)
            })

            if(response.ok){
                console.log("Data POSTED");
            }else{
                console.log(response.status)
            }
            
        } catch (error) {

            console.error(error)
            
        }

    }



    return (
       <div>
        <table>
            <thead>
                <tr>
                <th>Name</th>
                <th>MaxPlayers</th>
                </tr>
            </thead>
            <tbody>
                {game.map(games => (
                    <tr key={games._id}>
                        <td>{games.name}</td>
                        <td>{games.maxPlayers}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <form onSubmit={handleSubmit}>
            <label>
                Name
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Max Players
                <input type="text" placeholder="Max Players" value={maxPlayers} onChange={(e) => setMaxPlayers(e.target.value)} />
            </label>

            <button type="submit">Submit</button>
        </form>
       </div>
    )
}