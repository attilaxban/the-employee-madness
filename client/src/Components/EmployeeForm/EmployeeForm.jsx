import { useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel, equipments,favBrands,startDate,favColor,desSalary,currSalary,boardGame }) => {
  const [date,setDate] = useState('')
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});


    return onSave(employee);
  };

  // const handleDateChange = (event) => {
  //   setDate

  // }

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>
      <div className="control">
        <label htmlFor="equipment">Equipment:</label>
        {equipments}
         </div>
         <div className="control">
        <label htmlFor="brands">Favorite Brand:</label>
        {favBrands}
         </div>

         <div className="controll">
          <label htmlFor="startdate">Date of Start</label>
          {startDate}
         </div>

         <div className="controll">
          <label htmlFor="currSalary">Current Salary</label>
          {currSalary}
         </div>

         <div className="controll">
          <label htmlFor="desSalary">Desired Salary</label>
          {desSalary}
         </div>

         <div className="controll">
          <label htmlFor="favColor">Favorite Color </label>
          {favColor}
          
         </div>

         <div className="control">
        <label htmlFor="games">Favorite Game:</label>
        {boardGame}
         </div>


      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
