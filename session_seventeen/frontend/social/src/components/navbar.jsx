import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <div className="nav">
      <div className="nav-left">
        <h1>Medie</h1>
      </div>
      <div className="nav-right">
        {props.page === "register" ? (
          <Link to="/login">
            <button className="nav-button">Login</button>
          </Link>
        ) : (
          <Link to="/register">
            <button className="nav-button">Register</button>
          </Link>
        )}
      </div>
    </div>
  );
}
