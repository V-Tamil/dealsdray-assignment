import React from "react";
import "../../assets/dashboard.css";
import Navbar from "../../components/navbar";

function Dashboard() {
  return (
    <>
      <div className="main_container">
        <Navbar />
        <h1 className="main_title">Dashboard</h1>
        <h1 className="main_content">Welcome Admin Panel</h1>
      </div>
    </>
  );
}
export default Dashboard;
