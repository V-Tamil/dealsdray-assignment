import React from "react";
import "../assets/navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Logo</h2>
      <ul className="menu-list">
        <Link to="/dashboard" className="link">
          Home
        </Link>
        <Link to="/employee/list" className="link">
          Employee List
        </Link>
      </ul>
      <button className="btn">Logout</button>
    </nav>
  );
}
export default Navbar;
