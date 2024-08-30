import { useEffect, useState } from "react"



export default function SearchEmployee() {
    console.log('asdasfadfadfaa');

    const [employees, setEmployees] = useState([])
    const [searchName, setSearchName] = useState('');
    const [allEmployee, setAllEmployee] = useState([]);
    const [level, setLevel] = useState('');
    const [position, setPosition] = useState('');


    const [clicked, setClicked] = useState(false)


    useEffect(() => {
        const fetchEmployees = async () => {

            try {
                const response = await fetch('/api/employees');
                const data = await response.json();

                if (response.ok) {
                    setAllEmployee(data)

                    const filteredEmployees = data.filter(employee => employee.name.toLowerCase().startsWith(searchName.toLowerCase()))

                    if (filteredEmployees) {
                        setEmployees(filteredEmployees)
                        console.log(filteredEmployees);
                    } else {
                        throw new Error('Employee not found', Error)
                    }

                } else {
                    console.log(response.status);
                    throw new Error('Internal server error', Error)
                }

            } catch (error) {
                console.log(error);
                throw new Error('Network response error', Error)
            }

        }
        fetchEmployees()
        console.log("Lángos");
        console.log(searchName);
    }, [searchName]);


    
    
    useEffect(() => {
        if (clicked) {
            const filteredEmployee = allEmployee.filter(employees => employees.level === level && employees.position === position);
            setEmployees(filteredEmployee);
        }
    }, [clicked, allEmployee, level, position]);
    console.log(level);
    console.log(position);

    return (

        <div>
            <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} />

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Level</th>
                        <th>Position</th>
                    </tr>

                </thead>
                <tbody>
                    {
                        employees && employees.map(employee => (
                            <tr key={employee._id}>
                                <td>{employee.name}</td>
                                <td>{employee.level}</td>
                                <td>{employee.position}</td>
                                <td><button onClick={(e) =>  {setPosition(employee.position); setLevel(employee.level); setClicked(true)}}>Similar Employees</button></td>
                            </tr>
                        ))

                    }

                </tbody>
            </table>
        </div>
    )

}