import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"



export default function EmployeeAddress (){

    const {id} = useParams();
    const navigate = useNavigate()

    const [employeeData,setEmployeeData] = useState([]);
    const[clicked,setClicked] = useState(false);
    const [country,setCountry] = useState('');
    const [city,setCity] = useState('');
    const [street,setStreet] = useState('');
    const [zipcode,setZipcode] = useState('');


    useEffect(() => {
        const fetchEmployee = async () =>{
            try {
                const response = await fetch(`/api/employees/${id}`)
                const data = await response.json();

                if(response.ok){
                    setEmployeeData(data.address);
                    console.log(data);
                }else{
                    console.log(response.status);
                }
                
            } catch (error) {

                console.error(error);
                
            }
        }
        fetchEmployee()
    },[])

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const data = {country,city,street,zipcode}
        try {

            const response = await fetch(`/api/employees/${id}`,{
                method: "PATCH",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({address: {
                    country: country,
                    city: city,
                    street: street,
                    zipCode: parseInt(zipcode)
                }})
            })

            if(response.ok){
                console.log("Data PATCHED");
                setEmployeeData(data)
                console.log(response.status);   
            }else{
                console.log(response.status);
            }
            
        } catch (error) {

            console.error(error);
            
        }
    }


    return (
        <div>
            <table>
                <thead>
                    <th>Country</th>
                    <th>City</th>
                    <th>Street</th>
                    <th>Zip-Code</th>
                </thead>
                <tbody>
                    {employeeData ? (<tr>
                        <td>{employeeData.country}</td>
                        <td>{employeeData.city}</td>
                        <td>{employeeData.street}</td>
                        <td>{employeeData.zipCode}</td>
                        <td><button onClick={() => setClicked(true)}>Edit</button></td>
                    </tr>) : (<></>)}
                </tbody>
            </table>
            {clicked ?(
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                        </label>
                        <label>
                            <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                        </label>
                        <label>
                            <input type="text" placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} />
                        </label>
                        <label>
                            <input type="text" placeholder="Zip-Code" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
                        </label>
                        <button type="submit">Submit</button>
                        <button onClick={() => navigate('/')}>Save</button>
                    </form>
                </div>
            ) : (<></>)}
        </div>
    )
}