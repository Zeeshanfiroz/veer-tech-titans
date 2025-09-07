import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import api from "../client/Client";

const IssueCard = ({ issue, onBack, onUpdate }) => {
const [status, setStatus] = useState(issue?.status || "Pending");
const [note, setNote] = useState("");
const [isUpdating, setIsUpdating] = useState(false);
const [localUpdates, setLocalUpdates] = useState(issue?.updates ? [...issue.updates] : []);

const handleUpdate = async () => {
setIsUpdating(true);
try {
const newUpdate = {
status,
note,
date: new Date().toISOString(),
};

  await api.put(`/api/complaints/${issue.id}`, {
    status,
    note,
  });

  setLocalUpdates((prev) => [...prev, newUpdate]);
  setNote("");

  alert("Issue updated successfully!");

  if (onUpdate) onUpdate(); // Re-fetch updated list
} catch (error) {
  console.error("Failed to update issue:", error);
  alert("Failed to update issue");
} finally {
  setIsUpdating(false);
}


};

const getStatusBadgeClass = (status) => {
const statusColors = {
Resolved: "bg-success",
"In Progress": "bg-warning text-dark",
Pending: "bg-secondary",
};
return statusColors[status] || "bg-light text-dark";
};

return (
<div className="container py-4">
<button className="btn btn-outline-secondary mb-4" onClick={onBack}>
<i className="bi bi-arrow-left me-2"></i>Back to Dashboard
</button>

  <div className="row">
    <div className="col-lg-8">
      {/* Issue Image */}
      {(issue?.images || []).length > 0 && (
        <div className="card shadow-sm mb-4">
          <img
            src={issue.images[0]}
            className="card-img-top"
            alt={issue?.issue || "Issue"}
            style={{ height: "400px", objectFit: "cover" }}
          />
        </div>
      )}

      {/* Issue Info */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="fw-bold mb-3">{issue.issue}</h3>

          <div className="d-flex gap-2 mb-4">
            <span className={`badge ${getStatusBadgeClass(status)}`}>{status}</span>
            <span className="badge bg-info text-white">{issue.department}</span>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <h6 className="fw-bold">Complaint Details</h6>
              <p><strong>ID:</strong> {issue.id}</p>
              <p><strong>Date:</strong> {issue.date}</p>
              <p><strong>Location:</strong> {issue.location}</p>
              <p><strong>Officer:</strong> {issue.assignedOfficer}</p>
            </div>
            <div className="col-md-6">
              <h6 className="fw-bold">Citizen</h6>
              <p><strong>Name:</strong> {issue.citizen}</p>
              <p><strong>Phone:</strong> {issue.citizenPhone}</p>
              <p><strong>Email:</strong> {issue.citizenEmail}</p>
            </div>
          </div>

          <div className="mb-4">
            <h6 className="fw-bold">Description</h6>
            <p className="text-muted">{issue.description}</p>
          </div>

          <div className="mb-4">
            <h6 className="fw-bold">Updates</h6>
            <div className="timeline">
              {(localUpdates || []).map((update, index) => (
                <div key={index} className="d-flex mb-3">
                  <div className="flex-shrink-0 me-3">
                    <div className={`badge ${getStatusBadgeClass(update.status)}`}>
                      {update.status}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <small className="text-muted">{update.date}</small>
                    <p className="mb-0">{update.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Update Panel */}
    <div className="col-lg-4">
      <div className="card shadow-sm sticky-top" style={{ top: "20px" }}>
        <div className="card-body">
          <h5 className="card-title">Update Issue</h5>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Note</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Add note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={handleUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Updating...
              </>
            ) : (
              "Update Issue"
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


);
};

export default IssueCard;