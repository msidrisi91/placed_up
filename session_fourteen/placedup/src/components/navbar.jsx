import React from "react";

function Navbar(props) {
  return (
    <ul>
      <li>Home</li>
      <li>About</li>
      <li>Contact</li>
      <li>{props.user}</li>
    </ul>
  );
}

export default Navbar;
