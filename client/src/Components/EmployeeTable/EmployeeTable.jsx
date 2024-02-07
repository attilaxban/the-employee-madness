/* eslint-disable no-mixed-operators */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete }) => {

  const itemPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [ascending, setAscending] = useState(null)
  const [clickNo, setClickNo] = useState(0);
  const [checked, setChecked] = useState(true)
  const [thicked, setThicked] = useState(false)
  const [brands, setBrands] = useState("");
  const[games,setGames] = useState("");
  const [confirmed, setConfirmed] = useState(false)
  const [employeeId, setEmployeeId] = useState('');

  const lastEmployeeIndex = currentPage * itemPerPage;
  const firstEmployeeIndex = lastEmployeeIndex - itemPerPage;
  const currentEmployee = employees.slice(firstEmployeeIndex, lastEmployeeIndex);

  const handlePageChange = (increment) => {
    setCurrentPage((currentPage) => {
      return currentPage + increment
    });
  }

  const handleAscending = () => {
    setClickNo(1)
    const arrange = employees.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    })
    if (clickNo === 1) {
      setClickNo(0)
      const arrange = employees.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA > nameB) {
          return -1;
        } else if (nameA < nameB) {
          return 1;
        } else {
          return 0;
        }
      })
    }
    setAscending(arrange)
  }

  const setFalse = async (id) => {

    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          present: false
        })
      })
      if (response.ok) {
        console.log('All set false');
      } else {
        console.error('Error set');
      }
    } catch (error) {
      console.error(error);
    }

  }



  const handleCheckBox = async (employeeId) => {
    setThicked(true)
    try {
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          present: checked
        })
      })
      if (response.ok) {
        console.log('Unchecked');
      } else {
        console.error('Error check');
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetch('/api/brands')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setBrands(data)
      })
  }, [])

  useEffect(() => {
    fetch('/api/v1/games')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setGames(data)
      })
  }, [])

  const handleConfirm = (event, id) => {
    setConfirmed(true)
    setEmployeeId(id)
    console.log(event);
    console.log(id);
  }


  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Date of Start</th>
            <th>City</th>
            <th onClick={handleAscending}>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th>Current Salary</th>
            <th>Desired Salary</th>
            <th>Difference</th>
            <th>Favorite Color</th>
            <th>Favorite Brand</th>
            <th>Favorite Board Game</th>
            <th>Present</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployee.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.dateOfStart.toString()}</td>
              <td>{employee.address.city}</td>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>{employee.currentSalary.toString()}</td>
              <td>{employee.desiredSalary.toString()}</td>
              <td>{(employee.desiredSalary - employee.currentSalary) > 0 ? ((employee.desiredSalary - employee.currentSalary).toString()) : (0)}</td>
              <td style={{ backgroundColor: employee.favoriteColor, color: employee.favoriteColor === "white" ? "black" : "white" }}></td>
              <td> {brands && brands.find(brand => brand._id === employee.favoriteBrand)?.name || 'Unknown Brand'}</td>
              <td> {games && games.find(game => game._id === employee.favoriteBoardGame)?.maxPlayers || 'Unknown Game'}</td>
              <td></td>
              <td>
                <input type="checkbox" onChange={() => handleCheckBox(employee._id)} />
              </td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={(e) => { handleConfirm(e, employee._id); setConfirmed(true) }}>
                  Delete
                </button>
                <button onClick={() => setFalse(employee._id)}>Missing</button>
             
                <Link to={`/kittens/${employee._id}`}> <button>Kittens</button></Link>

              </td>

            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Link to={"/missing"}>
          <button>Missing employees</button>
        </Link>
        <button onClick={() => handlePageChange(- 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={() => handlePageChange(+ 1)} disabled={lastEmployeeIndex >= employees.length}>
          Next
        </button>

      </div>
      {confirmed ? (
        <div>
          <h2>Are you sure you want to delete this employee?</h2>
          <button onClick={() => { onDelete(employeeId); setConfirmed(false) }}>Yes</button>
          <button onClick={() => setConfirmed(false)}>No</button>
        </div>
      ) : (<></>)}



    </div>
  )
};

export default EmployeeTable;
