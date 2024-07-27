import React from "react";
import "../../assets/employeeList.css";
import Navbar from "../../components/navbar";
import EmployeeTable from "../../components/employeeTable";

function Employeelist() {
  const data = [
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      mobile: "1234567890",
      designation: "Manager",
      gender: "Male",
      course: "MCA",
      file: "path/to/image.jpg",
    },
    {
      _id: "1",
      name: " Doe",
      email: "siva@example.com",
      mobile: "1234567890",
      designation: "Sales",
      gender: "Male",
      course: "MCA",
      file: "path/to/image.jpg",
    },
    // Add more data here
  ];

  return (
    <>
      <div className="employeeList_container">
        <Navbar />
        <h1 className="employeeList_title">Employee List</h1>
        <div className="employeeList_count">
          <p>Total Count : 4</p>
          <h3 className="list">Create Employee</h3>
        </div>

        <EmployeeTable data={data} />
      </div>
    </>
  );
}
export default Employeelist;
