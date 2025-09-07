import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

function Sidebar({onmenuselect}) {
  const[active,setactive]=useState("dashboard");

  const handelclick=(menu)=>{
    setactive(menu);
    if(onmenuselect) onmenuselect(menu);
  }
  return (
    <div
      className="d-flex flex-column flex-shrink-0 bg-light vh-100 pt-3 sidebar-fixed"
      style={{ width: "180px" }}
    >
      

      {/* Nav Items */}
      <ul className="nav nav-pills flex-column mb-auto">
       
        <li>
          <a href="#" className={`nav-link  d-flex align-items-center ${ active=== "dashboard" ? "active" : "link-dark"}`}
          onClick={() => handelclick("dashboard")}
          >
            <i className="bi bi-speedometer2 fs-5"></i>
            <span className="ms-2 d-none d-lg-inline">Dashboard</span>
          </a>
        </li>
         <li className="nav-item">
          <a href="#"
          className={`nav-link  d-flex align-items-center ${active==="profile" ? "active" : "link-dark"}`}
          onClick={() => handelclick("profile")}
          >
            <i className="bi bi-house-door fs-5"></i>
            <span className="ms-2 d-none d-lg-inline">Profile</span>
          </a>
        </li>
      </ul>

      <hr />
      

      {/* Extra CSS for responsive width */}
      <style>{`
      .nav-pills .nav-link.active {
          background-color: black !important;
          color: white !important;
        }
        .nav-pills .nav-link {
          color: black !important;
        }
        @media (max-width: 991.98px) {
          .flex-shrink-0 {
            width: 70px !important; /* shrink sidebar */
          }
        }
      `}</style>
    </div>
  );
}

export default Sidebar;
