import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function ComplaintManagementSystem({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example: simple hardcoded credentials
    if (username === "admin" && password === "1234") {
      onLogin(); // notify App.js that login is successful
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left Section */}
        <div
          className="col-md-6 d-flex flex-column justify-content-center text-white px-5"
          style={{ background: "#1f4e79" }}
        >
          <div className="text-center mb-4">
            <i className="bi bi-bank fs-1"></i>
          </div>
          <h2 className="fw-bold text-center">Complaint Management System</h2>
          <p className="text-center">
            A centralized platform for efficient handling and resolution of public grievances
            and administrative complaints.
          </p>

          <div className="mt-4">
            <div className="d-flex align-items-start mb-3">
              <i className="bi bi-shield-lock fs-4 me-3"></i>
              <div>
                <h6 className="fw-bold mb-1">Secure Access</h6>
                <p className="mb-0 small">
                  Multi-factor authentication and encrypted data transmission
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-3">
              <i className="bi bi-bar-chart-line fs-4 me-3"></i>
              <div>
                <h6 className="fw-bold mb-1">Comprehensive Dashboard</h6>
                <p className="mb-0 small">
                  Real-time analytics and complaint status monitoring
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start">
              <i className="bi bi-briefcase fs-4 me-3"></i>
              <div>
                <h6 className="fw-bold mb-1">Case Management</h6>
                <p className="mb-0 small">
                  Streamlined workflow for complaint processing and resolution
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
<div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
  <div className="card shadow-sm p-4 w-100 h-100 d-flex flex-column justify-content-center" style={{ borderRadius: "0" }}>
    <div className="text-center mb-3">
      <i className="bi bi-bank fs-2 text-primary"></i>
      <h5 className="mt-2 fw-bold">Department of Public Administration</h5>
      <p className="text-muted small mb-0">Government of the Republic</p>
    </div>

    <h5 className="fw-bold mb-3 text-center">Administrative Portal Login</h5>
    <p className="small text-muted mb-4 text-center">
      Enter your credentials to access the system
    </p>

    {/* LOGIN FORM */}
    <form onSubmit={handleSubmit} className="mx-3">
      <div className="mb-3">
        <label className="form-label">Username / Employee ID</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your username or ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <input type="checkbox" id="rememberMe" className="form-check-input me-2" />
          <label htmlFor="rememberMe" className="form-check-label small">
            Remember Me
          </label>
        </div>
        <a href="/" className="small text-decoration-none">
          Forgot Password?
        </a>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Login to Dashboard
      </button>

      <div className="alert alert-light border mt-3 small" role="alert">
        <strong>Notice:</strong> This is a restricted system for authorized personnel
        only. Unauthorized access is prohibited and may result in legal action.
      </div>

      <div className="text-success text-center small">
        <i className="bi bi-lock-fill me-1"></i> Secure SSL Connection
      </div>
    </form>

    <div className="text-center small text-muted mt-4">
      <a href="/" className="text-muted text-decoration-none mx-2">
        Privacy Policy
      </a>
      |
      <a href="/" className="text-muted text-decoration-none mx-2">
        Terms of Service
      </a>
      |
      <a href="/" className="text-muted text-decoration-none mx-2">
        Help & Support
      </a>
      |
      <a href="/" className="text-muted text-decoration-none mx-2">
        Contact
      </a>
      <p className="mt-2 mb-0">
        © 2023 Department of Public Administration | Complaint Management System v2.4.1
      </p>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}
