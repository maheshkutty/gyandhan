import React from "react";
import Header from "../header/Header";
import { Link } from "react-router-dom";
import "./login.css";
import { color } from "@mui/system";

export default function RegisterHome() {
  return (
    <Header>
      <div className="container">
        <h1 className="text-center" style={{ color: "#353535" }}>
          Sign Up
        </h1>
        <div className="row justify-content-center">
          <div className="col-3 loginBox m-2 p-4">
            <Link className="nav-item nav-link" to="/student">
              <h1 className="text-center linkColor">As Student</h1>
            </Link>
          </div>
          <div className="col-3 loginBox m-2 p-4">
            <Link className="nav-item nav-link" to="/mentor">
              <h1 className="text-center linkColor">As Mentor</h1>
            </Link>
          </div>
        </div>
      </div>
    </Header>
  );
}
