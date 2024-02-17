import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../../Components/EmployeeForm";
import Loading from "../../Components/Loading";
import Equipments from "../Equipments/Equipments";


const updateEmployee = (employee) => {
  return fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEmployee = (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};

const EmployeeUpdater = () => {
  const [date, setDate] = useState('')
  const [currSalary, setCurrSalary] = useState('')
  const [desSalary, setDesSalary] = useState('')
  const [color, setColor] = useState('')
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedSession, setSelectedSession] = useState('')
  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [equipment, setEquipment] = useState('');
  const [brands, setBrands] = useState('');
  const [games, setGames] = useState('')
  const [tools, setTools] = useState('');
  const [selectedTool, setSelectedTool] = useState('')
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    setEmployeeLoading(true);
    fetchEmployee(id)
      .then((employee) => {
        setEmployee(employee);
        setCurrSalary(employee.currentSalary)
        setDesSalary(employee.desiredSalary)
        setDate(employee.startDate)
        setSelectedEquipment(employee.equipment)
        setSelectedBrand(employee.favoriteBrand)
        setSelectedGame(employee.favoriteBoardGame)
        setColor(employee.favoriteColor);
        setEmployeeLoading(false);
        setSelectedTool(employee.favoriteTool)
        setSelectedSession(employee.session)
        setCountry(employee.address.country)
        setCity(employee.address.city)
        setStreet(employee.address.street)
        setZipcode(employee.address.zipCode)
      });
  }, [id]);

  const handleUpdateEmployee = (employee) => {

    if (selectedEquipment) {
      employee.equipment = selectedEquipment;

      if (selectedBrand) {
        employee.favoriteBrand = selectedBrand;
      }

      if (selectedGame) {
        employee.favoriteBoardGame = selectedGame
      }
      if (selectedTool) {
        employee.favoriteTool = selectedTool
      }
      if (selectedSession) {
        employee.session = selectedSession
      }

      employee.dateOfStart = date;
      employee.favoriteColor = color;
      employee.currentSalary = currSalary;
      employee.desiredSalary = desSalary;

      employee.address = {
        country: country,
        city: city,
        street: street,
        zipCode: parseInt(zipcode)
      }

      setUpdateLoading(true);
      updateEmployee(employee)
        .then(() => {
          setUpdateLoading(false);
          navigate("/");
        });
    } else {
      console.error("Selected equipment is not defined");
    }
  };

  useEffect(() => {
    fetch('/api/equipments')
      .then(response => response.json())
      .then(response => {
        setEquipment(response);
        console.log(equipment);
      })

  }, [])

  useEffect(() => {
    fetch('/api/brands')
      .then(response => response.json())
      .then(response => {
        setBrands(response)
      })

  }, [])

  useEffect(() => {
    fetch('/api/v1/games')
      .then(response => response.json())
      .then(response => {
        setGames(response)
      })

  }, [])

  useEffect(() => {
    fetch('/api/v1/tools')
      .then(response => response.json())
      .then(response => {
        setTools(response)
      })

  }, [])
  useEffect(() => {
    fetch('/api/v1/training-session')
      .then(response => response.json())
      .then(response => {
        setSessions(response)
      })

  }, [])

  // useEffect(() =>{
  //   const fetchBrand = async () =>{
  //    const response = await fetch(`/api/v1/brands/${employee.favoriteBrand}`)
  //    const data = await response.json()
  //    if(response.ok){
  //     setSelectedBrand(data.name);
  //    }else{
  //     console.log(response.status);
  //    }

  //   }
  //   fetchBrand()
  // },[])




  if (employeeLoading) {
    return <Loading />;
  }

  return (
    //select maradjon meg a kiválasztott controlled - uncontrolled komponensek
    <div>
      <EmployeeForm
        employee={employee}
        onSave={handleUpdateEmployee}
        disabled={updateLoading}
        onCancel={() => navigate("/")}

        address={
          <div>
            <label htmlFor="">Country</label>
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
            <label htmlFor="" >City</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            <label htmlFor="" >Street</label>
            <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
            <label htmlFor="" >Zip-Code</label>
            <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
          </div>
        }

        equipments={
          <select value={selectedEquipment} onChange={(e) => setSelectedEquipment(e.target.value)}>
            {equipment && equipment.map(item => (
              <option key={item._id} value={item._id}>{item.equipmentName}</option>
            ))}
          </select>}
        favBrands={
          <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
            {brands && brands.map(brand => (<option key={brand._id} value={brand._id}>{brand.name}</option>))}
          </select>
        }

        startDate={
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        }

        currSalary={
          <input type="text" value={currSalary} onChange={(e) => setCurrSalary(e.target.value)} />
        }
        desSalary={
          <input type="text" value={desSalary} onChange={(e) => setDesSalary(e.target.value)} />
        }
        favColor={
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        }
        boardGame={
          <select value={selectedGame} onChange={(e) => setSelectedGame(e.target.value)}>
            {games && games.map(game => (<option key={game._id} value={game._id}>{game.name}</option>))}
          </select>
        }
        favTool={
          <select value={selectedTool} onChange={(e) => setSelectedTool(e.target.value)}>
            {tools && tools.map(tool => (
              <option key={tool._id} value={tool._id}>{tool.name}</option>
            ))}
          </select>
        }

        session={
          <select value={selectedSession} onChange={(e) => setSelectedSession(e.target.value)}>
            {sessions && sessions.map(session => (<option key={session._id} value={session._id}>{session.name}</option>))}
          </select>

        }

      />
    </div>
  );
};

export default EmployeeUpdater;
