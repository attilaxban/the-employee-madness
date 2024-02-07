

const { useState, useEffect } = require("react");

export default function DivisionCreator (){
    const [name,setName] = useState('')
    const [budget,setBudget] = useState('')
    const [boss,setBoss] = useState('')
    const[country,setCountry] = useState('')
    const [city,setCity] = useState('')
    const [location,setLocation] = useState({
        city: city,
        country: country
    });
    const [employees,setEmployees] = useState('');

    useEffect (() => {
        const fetchEmployees = async () =>{
            try {
                const response = await fetch('/api/employees')
                const data = await response.json();

                if(response.ok){
                    setEmployees(data)
                }else{
                    console.log(response.status);
                }
                
            } catch (error) {
                console.error(error);
            }
        }
        fetchEmployees();
    },[])



  
    const createDivion = async (e) => {
        e.preventDefault()
        const data = {name,budget,boss,location}
        try {
            const response = await fetch('/api/v1/divisions',{
                method:"POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    name: name,
                    budget:budget,
                    boss:boss,
                    location: {
                        city: city,
                        country: country
                    }
                })
            })

            if(response.ok){
                console.log("Data POSTED");
            }else{
                console.log(response.status);
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form onSubmit={createDivion}>
                <label htmlFor="">
                    Name:
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label htmlFor="">
                    Boss
                    <select value={boss} onChange={(e) => setBoss(e.target.value)}>
                    {employees && employees.map(employee => (
                            <option>{employee.name}</option>
                            ))}
                            </select>

                </label>
                <label htmlFor="">
                    Budget
                    <input type="text" placeholder="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} />

                </label>
                <label htmlFor="">
                    Location
                    <label htmlFor="">
                        Country
                        <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />

                    </label>
                    <label htmlFor="">
                        City
                        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                        </label>
                        <button type="submit">Submit</button>
                </label>
            </form>
        </div>
    )
}
    