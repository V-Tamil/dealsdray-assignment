import React from "react";
import "../assets/navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Logo</h2>
      <ul className="menu-list">
        <Link to="/dashboard">Home</Link>
        <Link to="/employee/list">Employee List</Link>
      </ul>
      <button>Logout</button>
    </nav>
  );
}
export default Navbar;
