import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import logo from "../images.png";
import icon from "../icon m.png";

function Header({ onLogout }) {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3"
      style={{ width: "100vw" }}
    >
      <div className="container-fluid">
        {/* Brand Logo */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={logo} alt="Logo" width="35" height="35" className="me-2" />
          <span className="fw-bold">Civic Issue Tracker</span>
        </a>

        {/* Right Section */}
        <div className="d-flex align-items-center ms-auto">
          {/* Notification Bell */}
          <li className="nav-item me-3 list-unstyled">
            <a className="nav-link position-relative me-4" href="#">
              <i className="bi bi-bell fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </a>
          </li>

          {/* Avatar Dropdown */}
          <li className="nav-item dropdown list-unstyled">
            <a
              className="nav-link dropdown-toggle d-flex align-items-center"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={icon}
                alt="Admin"
                width="35"
                height="35"
                className="rounded-circle me-2"
              />
              <span className="ms-2 d-none d-sm-inline">Admin Name</span>
            </a>

            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <button className="dropdown-item" onClick={onLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </div>
      </div>
    </nav>
  );
}

export default Header;
