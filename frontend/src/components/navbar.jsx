import React from "react";
import "../assets/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Navbar() {
  const user = new Cookies(null, { path: "/" }).get("user") || {};
  const navigate = useNavigate();

  function logOut() {
    new Cookies(null, { path: "/" }).remove("user", { path: "/" });
    navigate("/");
  }

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
      <h3>{user?.username}</h3>
      <button onClick={logOut} className="btn">Logout</button>
    </nav>
  );
}
export default Navbar;
