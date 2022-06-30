import React from "react";
import "./register.css";
import Navbar from "../../components/navbar";

export default function Registration() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullname, setfullname] = React.useState("");

  const handleSubmit = () => {
    console.log(username, email, password, fullname);
    fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        fullname,
      }),
    });
    window.location.href = "/login";
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
