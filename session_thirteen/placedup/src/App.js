import React, { useState } from "react";
import Navbar from "./components/navbar";
import Student from "./components/student";

function App() {
  const Students = [
    "Abhay", // <div>Name of the student is Abhay</div>;
    "Karan",
    "Raj",
    "Sachin",
    "Saurabh",
    "Siddharth",
    "Vikram",
  ];

  //   var count = 0;
  //   count = 0;   Why is this not working?
  //   count++;       Why is this not working?

  const [count, setCount] = useState(0);

  const print = (name) => {
    console.log(`Hello ${name}, button is click`);
  };

  // How to use setState ?

  const handleClick = () => {
    // Method 1:
    setCount(count + 1);

    // Method 2:
    // setCount((prev) => {
    //   prev + 1;
    // });

    console.log(`Button is clicked ${count} times`);
  };

  return (
    <div>
      <Navbar user="Shaheem" />
      <h1>Hello Students</h1>

      {Students.map((std) => (
        <Student name={std} />
      ))}

      <button onClick={() => print("Shaheem")}>Click Me</button>
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}

export default App;
