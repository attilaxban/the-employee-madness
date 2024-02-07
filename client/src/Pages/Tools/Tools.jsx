import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Tools() {
  const [tools, setTools] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filteredTools, setFilteredTools] = useState('');

  const [name,setName] = useState('');
  const [weight,setWeight] = useState('');

  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch('/api/v1/tools');
        const data = await response.json();

        if (!response.ok) {
          console.log(response.status);
        } else {
          setTools(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTools();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, weight };

    try {
      const response = await fetch('/api/v1/tools', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        console.log(response.status);
      } else {
        setTools([...tools, data]); 
        setName('');
        setWeight('');
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchName = (event) =>{
    const inputValue = event.target.value;
    setSearchName(inputValue)
    const filter = tools.filter(tool => tool.name.toLowerCase().includes(inputValue.toLowerCase()))
   setFilteredTools(filter)
  }

  return (
    <div>
      <input type="text" placeholder="Search by name" value={searchName} onChange={handleSearchName} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          { !filteredTools ? (tools.map((tool) => (
            <tr key={tool._id}>
              <td key={tool._id}>{tool.name}</td>
              <td>{tool.weight}</td>
            </tr>
          ))) :  (filteredTools.map((tool) => (
            <tr key={tool._id}>
              <td key={tool._id}>{tool.name}</td>
              <td>{tool.weight}</td>
            </tr>
          )))}
        </tbody>
      </table>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">
            Name:
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        
        <label htmlFor="">
        Weight:
            <input type="text" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
