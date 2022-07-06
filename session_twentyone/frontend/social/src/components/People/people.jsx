import React from "react";
import "./people.css";
import { Link } from "react-router-dom";

function getUser() {
  return [1, 3, 3, 4];
}

export default function People(props) {
  const link = "#";
  var people = [1, 3, 4, 5];
  //   if (props.type === "following") {
  //     people = props.user.following;
  //   } else if (props.type === "follower") {
  //     people = props.user.followers;
  //   } else {
  //     people = getUser();
  //   }
  return (
    <div className="people">
      <div className="people-header">
        <p>{props.type}</p>
        <Link to={link}>more..</Link>
      </div>
      <div className="people-body">
        {people.map((person) => (
          <div key={props.type + person} className="placeholder"></div>
        ))}
      </div>
    </div>
  );
}
