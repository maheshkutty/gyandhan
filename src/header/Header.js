import React from "react";
import { Link, Outlet } from 'react-router-dom';

export default function Header(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link" to="/signup">
              Sign Up
            </Link>
            <Link className="nav-item nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-item nav-link" to="/mentor">
              Mentor
            </Link>
            <Link className="nav-item nav-link" to="/mentor/topics">
              Topics  
            </Link>
          </div>
        </div>
      </nav>
      {props.children}
    </div>
  );
}
