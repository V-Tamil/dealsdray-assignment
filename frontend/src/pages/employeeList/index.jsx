import React from "react";
import "../../assets/employeeList.css";
import Pagination from "react-js-pagination";

import Navbar from "../../components/navbar";
import EmployeeTable from "../../components/employeeTable";
import { Link } from "react-router-dom";

function Employeelist() {
  const data = [
    {
      _id: "66a5db5739fa1e1509f71b8c",
      employeeId: 1,
      image: "https://picsum.photos/200/300",
      name: "Tamil",
      email: "tamilselvi@mail.com",
      mobile: 1234567890,
      designation: "Developer",
      gender: "Female",
      course: "MCA",
      createdAt: "2024-07-28T05:47:03.239Z",
      updatedAt: "2024-07-28T05:47:03.239Z",
      __v: 0,
    },
    {
      _id: "66a5e120851d1b096edcefe0",
      employeeId: 2,
      image: "https://picsum.photos/200/300",
      name: "Jone",
      email: "jone@mail.com",
      mobile: 0,
      designation: "Sales",
      gender: "Male",
      course: "BBA",
      createdAt: "2024-07-28T06:11:44.498Z",
      updatedAt: "2024-07-28T06:11:44.498Z",
      __v: 0,
    },
  ];

  return (
    <div className="employeeList_container">
      <Navbar />
      <h1 className="employeeList_title">Employee List</h1>
      <div className="employeeList_count">
        <p>Total Count : 4</p>
        <Link to="/employee" className="btn">
          Create Employee
        </Link>
      </div>
      <div className="table_wrapper">
        <EmployeeTable data={data} />
      </div>
      <div className="pagination-wrapper">
        <Pagination
          activePage={Number(1)}
          innerClass="paginate-inner"
          itemClass="paginate-item"
          firstPageText="First"
          lastPageText="Last"
          itemsCountPerPage={Number(1)}
          totalItemsCount={Number(10)}
          pageRangeDisplayed={3}
          onChange={() => {}}
        />
      </div>
    </div>
  );
}
export default Employeelist;
