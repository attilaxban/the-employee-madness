import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ToolsQuery() {
  const [tools, setTools] = useState([]);
  const location = useLocation();

  
  const [name,setName] = useState('');
  const [weight,setWeight] = useState('');

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch(`api/v1/tools/query${location.search}`);
        const data = await response.json();

        if (!response.ok) {
          console.log(response.status);
        } else {
          setTools(data);
          console.log(location);
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

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          { tools.map((tool) => (
            <tr key={tool._id}>
              <td key={tool._id}>{tool.name}</td>
              <td>{tool.weight}</td>
            </tr>
          ))}
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
