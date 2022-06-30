import React from "react";
import "./whats.css";
import { Link } from "react-router-dom";

export default function Whats() {
  return (
    <div className="whats-body">
      <div className="whats-text">What's on your mind?</div>
      <div className="whats-content">
        <div className="whats-left">
          <input type="text" name="caption" className="whats-input" />
          <img src="/attach.svg" className="attachemt-icon" />
        </div>
        <Link to="">
          <button className="post-button">Post</button>
        </Link>
      </div>
    </div>
  );
}
