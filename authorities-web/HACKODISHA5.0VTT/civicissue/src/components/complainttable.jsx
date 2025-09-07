import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Complainttable({ complaints, filters }) {
  const [currentpage, setcurrentpage] = useState(1);
  const complaintsperpage = 6;

  // ✅ Filter complaints based on search, status, priority, date range
  const filteredcomplaints = complaints.filter((c) => {
    if (
      filters.searchterm &&
      !(
        c.id.toString().includes(filters.searchterm) ||
        c.citizen.toLowerCase().includes(filters.searchterm.toLowerCase()) ||
        c.issue.toLowerCase().includes(filters.searchterm.toLowerCase())
      )
    ) {
      return false;
    }

    if (filters.issuetype !== "All Issue Types" && c.issue !== filters.issuetype) {
      return false;
    }

    if (filters.Status !== "All Status" && c.status !== filters.Status) {
      return false;
    }

    if (filters.priority !== "All Priorities" && c.priority !== filters.priority) {
      return false;
    }

    if (filters.daterange === "Last 7 Days") {
      const datelimit = new Date();
      datelimit.setDate(datelimit.getDate() - 7);
      if (new Date(c.date) < datelimit) return false;
    }

    if (filters.daterange === "Last 30 Days") {
      const datelimit = new Date();
      datelimit.setDate(datelimit.getDate() - 30);
      if (new Date(c.date) < datelimit) return false;
    }

    if (filters.daterange === "Last 90 Days") {
      const datelimit = new Date();
      datelimit.setDate(datelimit.getDate() - 90);
      if (new Date(c.date) < datelimit) return false;
    }

    if (filters.daterange === "This Year") {
      const thisYear = new Date().getFullYear();
      if (new Date(c.date).getFullYear() !== thisYear) return false;
    }

    return true;
  });

  // ✅ Pagination calculations
  const indexofLast = currentpage * complaintsperpage;
  const indexofFirst = indexofLast - complaintsperpage;
  const currentcomplaints = filteredcomplaints.slice(indexofFirst, indexofLast);
  const totalpages = Math.ceil(filteredcomplaints.length / complaintsperpage);

  // ✅ Render status badges
  const renderStatus = (status) => {
    switch (status) {
      case "Resolved":
        return <span className="badge bg-success">{status}</span>;
      case "In Progress":
        return <span className="badge bg-warning text-dark">{status}</span>;
      case "Pending":
        // Changed from gray to orange to highlight like previous Urgent
        return <span className="badge bg-danger text-dark">{status}</span>;
      default:
        return <span className="badge bg-light text-dark">{status}</span>;
    }
  };

  return (
    <div className="card shadow-sm mt-4" style={{ width: "80vw" }}>
      <div className="card-header bg-white">
        <h5 className="mb-0">Recent Complaints</h5>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Issue Type</th>
              <th>Location</th>
              <th>Citizen Name</th>
              <th>Date Submitted</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentcomplaints.length > 0 ? (
              currentcomplaints.map((c, index) => (
                <tr key={index}>
                  <td>{c.id}</td>
                  <td>{c.issue}</td>
                  <td>{c.location}</td>
                  <td>{c.citizen}</td>
                  <td>{c.date}</td>
                  <td>{renderStatus(c.status)}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">
                      <i className="bi bi-eye"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No complaints found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination controls */}
      {totalpages > 1 && (
        <div className="card-footer d-flex justify-content-center">
          <nav>
            <ul className="pagination mb-0">
              <li className={`page-item ${currentpage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setcurrentpage(currentpage - 1)}>
                  Previous
                </button>
              </li>

              {Array.from({ length: totalpages }, (_, i) => (
                <li key={i} className={`page-item ${currentpage === i + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setcurrentpage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentpage === totalpages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setcurrentpage(currentpage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Complainttable;
