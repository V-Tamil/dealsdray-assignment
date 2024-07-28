import React, { useEffect, useState } from "react";
import "../../assets/employeeList.css";
import Pagination from "react-js-pagination";

import Navbar from "../../components/navbar";
import EmployeeTable from "../../components/employeeTable";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

function Employeelist() {
  const [employees, setEmployees] = useState({
    data: [],
    total: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const user = new Cookies(null, { path: "/" }).get("user") || null;

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }

    const fetchEmployees = (page) => {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/employees`, {
          params: {
            skip: (page - 1) * itemsPerPage,
            limit: itemsPerPage,
            sortBy: "createdAt",
          },
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const startSerialNumber = (page - 1) * itemsPerPage + 1;

          const employeesWithSerialNumber = res.data.data.map(
            (employee, index) => ({
              ...employee,
              serialNumber: startSerialNumber + index,
            })
          );

          setEmployees({
            data: employeesWithSerialNumber,
            total: res.data.total,
          });
        })
        .catch((err) => {
          alert("Something went wrong, Please try again");
        });
    };

    fetchEmployees(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleDelete(id) {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        alert("Employee deleted successfully");
        setEmployees((prev) => ({
          ...prev,
          data: prev.data.filter((emp) => emp._id !== id),
        }));
      })
      .catch((err) => {
        alert("Something went wrong, Please try again");
      });
  }

  function handleEdit(id) {
    navigate(`/employee/${id}`);
  }

  return (
    <div className="employeeList_container">
      <Navbar />
      <h1 className="employeeList_title">Employee List</h1>
      <div className="employeeList_count">
        <p>Total Count: {employees.total}</p>
        <Link to="/employee" className="btn">
          Create Employee
        </Link>
      </div>
      <div className="table_wrapper">
        <EmployeeTable
          data={employees.data}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
      <div className="pagination-wrapper">
        <Pagination
          activePage={currentPage}
          innerClass="paginate-inner"
          itemClass="paginate-item"
          firstPageText="First"
          lastPageText="Last"
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={employees.total}
          pageRangeDisplayed={3}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Employeelist;
