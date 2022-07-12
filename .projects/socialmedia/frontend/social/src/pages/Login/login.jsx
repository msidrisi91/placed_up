import React from "react";
import "./login.css";
import Navbar from "../../components/navbar";
import UserService from "../../utils/user";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = () => {
    console.log(email, password);
    UserService.login(email, password);
  };

  return (
    <>
      <Navbar page="login" />
      <div className="login-body">
        <div className="login-left">
          <h1>Welcome Back User</h1>
          <h2>Login To Your Account</h2>
        </div>
        <div className="login-right">
          <div className="login-form">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              type="submit"
              className="login-button"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
