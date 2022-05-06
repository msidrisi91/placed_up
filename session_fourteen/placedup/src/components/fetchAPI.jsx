import React, { useState, useEffect } from "react";

export default function FetchAPI(props) {
  const [joke, setJoke] = useState("Click button to get joke !!!");

  const getJoke = async () => {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Miscellaneous,Pun,Spooky,Christmas"
    );
    const data = await response.json();
    setJoke(data.setup + "     :      " + data.delivery);
  };

  useEffect(() => {
    getJoke();
  }, []);

  return (
    <div>
      <button onClick={getJoke}>Get Joke</button>
      <p>{joke}</p>
    </div>
  );
}
