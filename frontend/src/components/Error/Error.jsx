import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";
const Error = () => {
  return (
    <div className="container">
      <div className="content">
        <h1>
          <span id="notfound">404</span> Not Found
        </h1>
        <Link to="/">
          <button id="button">Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
