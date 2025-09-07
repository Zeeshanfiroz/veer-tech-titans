import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Searchbar({filters,setfilters}){

  const handelchange=(key,value)=>{
  setfilters((prev)=>({...prev,[key]:value}))
  }

  return(<>
   <div className="container-fluid py-3">
      <div className="row g-3 align-items-center justify-content-end ">
        {/* Search Bar */}
        <div className="col-lg-3 col-md-6 col-12">
          <div className="input-group shadow-sm">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by complaint ID, keyword, or citizen name"
              value={filters.searchterm}
              onChange={(e)=>handelchange("searchterm",e.target.value)}
            />
          </div>
        </div>

        {/* Issue Type Filter */}
        <div className="col-lg-3 col-md-6 col-12">
          <div className="input-group shadow-sm">
            <span className="input-group-text">
              <i className="bi bi-funnel"></i>
            </span>
            <select
            className="form-select"
            value={filters.issuetype}
            onChange={(e)=>handelchange("issuetype",e.target.value)}
            >
              <option>All Issue Types</option>
              <option>Road Damage</option>
              <option>Water Supply</option>
              <option>Electricity</option>
              <option>Waste Management</option>
              <option>Public Safety</option>
            </select>
          </div>
        </div>

        {/* Status Filter */}
        <div className="col-lg-3 col-md-6 col-12">
          <div className="input-group shadow-sm">
            <span className="input-group-text">
              <i className="bi bi-check-circle"></i>
            </span>
            <select
            className="form-select"
             value={filters.Status}
            onChange={(e)=>handelchange("Status",e.target.value)}
            >
              <option>All Status</option>
              <option>Resolved</option>
              <option>In Progress</option>
              <option>Pending</option>
              
            </select>
          </div>
        </div>

       
        {/* Date Range Filter */}
<div className="col-lg-3 col-md-6 col-12">
  <div className="input-group shadow-sm">
    <span className="input-group-text">
      <i className="bi bi-calendar"></i>
    </span>
    <select
      className="form-select"
      value={filters.daterange}
      onChange={(e) => handelchange("daterange", e.target.value)}
    >
      <option>All Time</option> {/* ✅ Added */}
      <option>Last 7 Days</option>
      <option>Last 30 Days</option>
      <option>Last 90 Days</option>
      <option>This Year</option>
    </select>
  </div>
</div>


        {/* Priority Filter */}
        {/* <div className="col-12 col-lg-2">
          <div className="input-group shadow-sm">
            <span className="input-group-text">
              <i className="bi bi-flag"></i>
            </span>
            <select 
            className="form-select"
             value={filters.priority}
            onChange={(e)=>handelchange("priority",e.target.value)}
            >
              <option>All Priorities</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>
        </div> */}
      </div>
    </div>
  

  </>)
}

export default Searchbar