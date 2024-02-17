import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"


export default function TrainingCreator (){

    const navigate = useNavigate()
    const location = useLocation()

    const [name,setName] = useState('')
    const [difficulty,setDifficulty] = useState('')
    const [sessions,setSessions] = useState([])
    const [counter,setCounter] = useState(0)
    const [searchTerm,setSearchTerm] = useState('')
    const [submitted,setSubmitted] = useState(0);
    const[arrange,setArrange] = useState("asc")
    const [sortBy,setSortBy] = useState("name")

    const fetchSessions = async () =>{
        try {
            const response = await fetch('/api/v1/training-session')
            const data = await response.json()
            
            if(response.ok){
                const filteredSessions = data.filter(session => session.name.toLowerCase().startsWith(searchTerm.toLowerCase()) || session.difficulty.toLowerCase().startsWith(searchTerm.toLowerCase()))
                setSessions(filteredSessions);
            }else{
                throw new Error('Internal server error')
            }
        } catch (error) {
            console.error(error);
            throw new Error('Network response error')
        }
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const data = {name: name, difficulty: difficulty}
       try {
        const response = await fetch('/api/v1/training-session',{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })

        if(response.ok){
            setSubmitted(submitted+1)
            console.log("Session created");
            console.log(sessions);
            // setSessions([...sessions,data]) //a submitted state miatt nincs rá szükség

        }else{
            throw new Error ('Internal server error')
        }
       } catch (error) {
        console.error(error);
        throw new Error('Network response error')
       }
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/v1/training-session/${id}`,{
                method: "DELETE"
            });
            if(response.ok){
                const filteredSessions = sessions.filter(session => session._id !== id)
                setSessions(filteredSessions);
                console.log("Deleted");
            }else{
                throw new Error ('Internal server error')
            }
        } catch (error) {
            console.error(error);
            throw new Error ('Network response error')
        }
    }

    const handleSimilar = async (session) =>{
        // setCounter(counter+1)
        const filteredSimilars = sessions.filter(trainingSession => trainingSession.difficulty === session )
        setSessions(filteredSimilars)
        console.log(filteredSimilars);
    }

 

    // useEffect(() =>{
    //     setSessions(arrangeSessions(arrange,sessions,sortBy));
    // }, [arrange,sortBy]);

   

    useEffect(()=>{
        fetchSessions()
        console.log(sessions);
    },[searchTerm,submitted])


    const arrangeSessions = (dir, sessions) => {
        if (dir === 'asc') {
            return [...sessions].sort((a, b) =>
               sortBy === 'name' ?  a.name.localeCompare(b.name) : a.difficulty.localeCompare(b.difficulty)
            );
        }
        if (dir === 'desc') {
            return [...sessions].sort((a, b) =>
               sortBy === 'name' ? b.name.localeCompare(a.name) : b.difficulty.localeCompare(a.difficulty)
            );
        }
    }
    
    return(
        <div>
        
        <form onSubmit={handleSubmit}>
            <label>Session</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Difficulty</label>
            <input type="text" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
            <button type="submit">Submit</button>
        </form>


        <input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <table>
            <thead>
                <tr>
                    <th onClick={() => { setSortBy("name") ; arrange === "asc" ? setArrange("desc") : setArrange("asc")}}>Name</th>
                    <th onClick={() => {setSortBy("difficulty"); arrange === "asc" ? setArrange("desc") : setArrange("asc")}}>Difficulty</th>

                </tr>
            </thead>
            <tbody>         
            {sessions && arrangeSessions(arrange,sessions).map(session => (
                    <tr key={session._id}>
                        <td>{session.name}</td>
                        <td>{session.difficulty}</td>
                        <td><button onClick={() => handleSimilar(session.difficulty)}>Show Similar Level Sessions</button></td>
                        <td><button onClick={() => handleDelete(session._id)}>Delete</button></td>
                        <td><button onClick={() => navigate('/session/update', {state: session._id})}>Update</button></td>
                    </tr>
                ))} 
            </tbody>
        </table>

        </div>
    )
}