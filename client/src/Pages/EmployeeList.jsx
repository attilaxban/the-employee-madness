import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";


//hibakezelés

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState(null)
  const [searchPosition, setSearchPosition] = useState('');
  const [searchLevel, setSearchLevel] = useState('');
  const [searchName,setSearchName] = useState('')
  const [sortBy, setSortBy] = useState("");

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      })
  }, []);

  const handlePositionFilter = (event) => {
    const inputValue = event.target.value
    setSearchPosition(inputValue)
    const filteredEmployees = employees.filter(employee =>
      employee.position.toLowerCase().includes(inputValue.toLowerCase())
    );
    console.log(event.target.value);
    console.log(searchPosition);
    console.log(filteredEmployees);
    setFilteredEmployees(filteredEmployees)
  }

  const handleLevelFilter = (event) => {
    const inputValue = event.target.value
    setSearchLevel(inputValue);
    const filteredEmployees = employees.filter(employee =>
      employee.level.toLowerCase().includes(inputValue.toLowerCase()));
    setFilteredEmployees(filteredEmployees)
  }

  const arrangeItems = (event) => {

    const selectedSortBy = event.target.value;

    setSortBy(selectedSortBy);

    if (selectedSortBy === "first") {
      console.log(employees[0].name.split(" ").shift());
      const arrangeFirst = employees.sort((a, b) => {
        const nameA = a.name.split(" ").shift().toLowerCase();
        const nameB = b.name.split(" ").shift().toLowerCase();

        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      });
      console.log(arrangeFirst);
      setEmployees(arrangeFirst)
    }

    if (selectedSortBy === "middle") {
      const arrange = employees.sort((a, b) => {
        const nameA = a.name.split(" ")[1].toLowerCase();
        const nameB = b.name.split(" ")[1].toLowerCase();

        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      });
      console.log(arrange);
      setEmployees(arrange)
    }
    if (selectedSortBy === "last") {
      const arrange = employees.sort((a, b) => {
        const nameA = a.name.split(" ").pop().toLowerCase();
        const nameB = b.name.split(" ").pop().toLowerCase();

        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      });
      console.log(arrange);
      setEmployees(arrange)
    }
    if (selectedSortBy === "level") {
      const arrange = employees.sort((a, b) => {
        const levelA = a.level.toLowerCase();
        const levelB = b.level.toLowerCase();

        if (levelA < levelB) {
          return -1;
        } else if (levelA > levelB) {
          return 1;
        } else {
          return 0;
        }
      });
      setEmployees(arrange)
    }
    if (selectedSortBy === "position") {
      const arrange = employees.sort((a, b) => {
        const positionA = a.position.toLowerCase();
        const positionB = b.position.toLowerCase();

        if (positionA < positionB) {
          return -1;
        } else if (positionA > positionB) {
          return 1;
        } else {
          return 0;
        }
      });
      setEmployees(arrange)
    }
  }

  const handleSearchName = (event) =>{
    const inputValue = event.target.value;
    setSearchName(inputValue)
    const filteredEmployees = employees.filter(employee => employee.name.toLowerCase().includes(inputValue.toLowerCase()));
    setFilteredEmployees(filteredEmployees)

  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <select value={sortBy} onChange={arrangeItems}>
        <option value="select">Select</option>
        <option value="first">First name</option>
        <option value="middle">Middle name</option>
        <option value="last">Last name</option>
        <option value="level">Level</option>
        <option value="position">Position</option>
      </select>
      <input type="text" placeholder="Search by name" value={searchName} onChange={handleSearchName} />
      <input type="text" placeholder="Sort by position" value={searchPosition} onChange={handlePositionFilter} />
      <input type="text" placeholder="Sort by level" value={searchLevel} onChange={handleLevelFilter} />
      {<EmployeeTable employees={!filteredEmployees ? employees : filteredEmployees} onDelete={handleDelete} />}
    </div>
  )
};

//pagination ide -->

export default EmployeeList;
