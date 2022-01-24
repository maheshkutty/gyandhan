import React from "react";
// import "./student.css";
import Helmet from "react-helmet";
import "./sidebar.scss";
import { Link } from "react-router-dom";

export default function SideMenu({ children }) {
  return (
    <div id="wrapper">
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="#"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Gyandhan</div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item">
          <Link to="/student/home" className="nav-link">
            <i class="fas fa-home"></i>
            <span>Home</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/student/topics" className="nav-link">
            <i class="fas fa-book-open"></i>
            <span>Topics</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/student/classes" className="nav-link">
            <i class="fas fa-chalkboard-teacher"></i>
            <span>Classes</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/student/doubts" className="nav-link">
            <i class="far fa-question-circle"></i>
            <span>Doubts</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/blogs" className="nav-link">
            <i class="fas fa-blog"></i>
            <span>Blogs</span>
          </Link>
        </li>
      </ul>
      {children}
    </div>
  );
}
