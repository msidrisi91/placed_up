import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <div className="nav">
      <div className="nav-left">
        <h1>Medie</h1>
        {props.page === "feeds" && (
          <div className="searchbar">
            <img src="/search.svg" className="search-icon" />
            <input
              className="search-input"
              type="text"
              placeholder="Search people, post,..."
            />
          </div>
        )}
      </div>
      <div className="nav-right">
        {props.page === "register" ? (
          <Link to="/login">
            <button className="nav-button">Login</button>
          </Link>
        ) : props.page === "login" ? (
          <Link to="/register">
            <button className="nav-button">Register</button>
          </Link>
        ) : (
          // TODO: Check profile URL issue
          <div className="feeds-right-nav">
            <Link to="/">
              <p>Home</p>
            </Link>
            <Link to={props.user.profile_url}>
              <div className="nav-profile-block">
                <img src={props.user.avatar} className="nav-profile-img" />
                <div className="nav-profile-name">{props.user.name}</div>
              </div>
            </Link>
            <Link to="/logout">
              <img src="/logout.svg" className="logout-icon" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
