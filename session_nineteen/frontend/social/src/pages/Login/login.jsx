import React from "react";
import "./login.css";
import Navbar from "../../components/navbar";

export default function Login() {
  return (
    <>
      <Navbar page="login" />
      <div className="login-body">
        <div className="login-left">
          <h1>Welcome Back User</h1>
          <h2>Login To Your Account</h2>
        </div>
        <div className="login-right">
          <form>
            <div className="login-form">
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
