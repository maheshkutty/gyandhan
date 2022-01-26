import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./header.css";

export default function Header(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand logoColor" href="/">Gyandhan</a>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navcol">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {props.children}
    </div>
  );
}
