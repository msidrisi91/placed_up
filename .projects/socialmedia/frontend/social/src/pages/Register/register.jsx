import React from "react";
import "./register.css";
import Navbar from "../../components/navbar";
import UserService from "../../utils/user";

export default function Registration() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullname, setfullname] = React.useState("");

  const handleSubmit = async (e) => {
    console.log(username, email, password, fullname);
    await UserService.register(username, email, password, fullname);
  };

  return (
    <>
      <Navbar page="register" />
      <div className="register-body">
        <div className="register-left">
          <h1>Welcome User</h1>
          <h2>Register a New Account</h2>
        </div>
        <div className="register-right">
          <div className="register-form">
            <input
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setfullname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSubmit} className="register-button">
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
