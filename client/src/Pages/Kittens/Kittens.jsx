import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export default function Kittens (){
    const {employeeId} = useParams()
    const[kittens,setKittens] = useState([])

    const [name,setName] = useState('');
    const [weight,setWeight] = useState('');

    useEffect(() => {
        const fetchKittens = async () => {
          try {
            const response = await fetch(`/api/employees/${employeeId}`);
            const data = await response.json();
    
            if (!response.ok) {
              console.log(response.status);
            } else {
              setKittens(data.kittens);
              console.log(kittens);
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchKittens();
      }, []);

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const data =[...kittens, {kittenName: name, weight: weight}]
        try {

            const response = await fetch(`/api/employees/${employeeId}`,{
                method: "PATCH",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({kittens: [...kittens,{kittenName: name, weight:weight}]})
            })

            if(response.ok){
                console.log("Data PATCHED");
                setKittens(data)
            }else{
                console.log(response.status);
            }
            
        } catch (error) {
           console.error(error) 
        }
    }

    return(
        <div>
            <table>
                <thead>
                    <th>Name</th>
                    <th>Weight</th>
                </thead>
                <tbody>
                    {kittens.map(kitten => (
                        <tr key={kitten._id}>
                            <td>{kitten.kittenName}</td>
                            <td>{kitten.weight}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                </label>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <label>
                        Weight
                </label>
                    <input type="text" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                <button type="submit">Add Kitten</button>
            </form>
        </div>
    )
}