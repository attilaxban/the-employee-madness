import { useEffect, useState } from "react"
import { useNavigate,Navigate } from "react-router-dom"



export default function DivisionUpdater({ id,setEdit }) {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [budget, setBudget] = useState('')
    const [boss, setBoss] = useState('')
    const [employee, setEmployee] = useState([])
    const [city,setCity] = useState('');
    const [country,setCountry] = useState('');

    

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const response = await fetch(`/api/v1/divisions/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name,
                    budget: budget,
                    boss: boss,
                    location: {
                        city: city,
                        country: country
                    }
                })
            })
            if (response.ok) {
                console.log("Data PATCHED");
            } else {
                console.log(response.status);
                console.log(id);
            }

        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch('/api/employees');
                const data = await response.json();

                if (response.ok) {
                    setEmployee(data)
                } else {
                    console.log(response.status);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchEmployee()
    }, [])

    useEffect(() => {
        const fetchDivision = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/divisions/${id}`);
                const data = await response.json();

                if (response.ok) {
                    console.log(data);
                    setName(data.name)
                    setBoss(data.boss)
                    setBudget(data.budget)
                    setCity(data.location.city)
                    setCountry(data.location.country)
                } else {
                    console.log(response.status);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchDivision()
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Budget:
                    <input type="text" placeholder="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} />
                </label>
                <label>
                    Boss:
                   <select value={boss} onChange={(e) => setBoss(e.target.value)}>
                    {employee && employee.map(names => (
                        <option key={names._id}>{names.name}</option>
                    ))}
                   </select>
                </label>
                <label>
                    Country:
                    <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                </label>
                <label>
                    City:
                    <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            <button onClick={() => setEdit(false) }>Divisions</button>
            </form>
        </div>
    )
}