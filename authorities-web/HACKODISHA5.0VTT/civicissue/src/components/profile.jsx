import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { officerData } from "../complaintsData.js"; // Import officer data

export default function OfficerAndDepartment() {
  const [officer, setOfficer] = useState(officerData); // Use imported data
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(officer);
  const [previewPhoto, setPreviewPhoto] = useState(officer.photo || null);

  // Editable fields
  // Editable fields
const editableFields = [
  "name",
  "position",
  "phone",
  "email",
  "employeeId",
  "reportingOfficer",
  "state",
  "district",
  "block"
];


  const handleEdit = () => {
    setFormData(officer);
    setPreviewPhoto(officer.photo || null);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewPhoto(reader.result);
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, photo: reader.result }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOfficer(formData);
    setShowModal(false);
  };

  return (
    <div className="container my-4">
      {/* Officer Details */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold">Officer Details</h5>
            <button className="btn btn-sm btn-outline-primary" onClick={handleEdit}>
              <i className="bi bi-pencil-square me-1"></i>Edit
            </button>
          </div>

          <div className="row">
            <div className="col-md-3 text-center">
              <div
                className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto"
                style={{ width: "120px", height: "120px", overflow: "hidden" }}
              >
                {previewPhoto ? (
                  <img src={previewPhoto} alt="Officer" className="w-100 h-100" />
                ) : (
                  <i className="bi bi-person fs-1 text-secondary"></i>
                )}
              </div>
              <h5 className="mt-3 fw-bold">{officer.name}</h5>
              <p className="text-muted small mb-1">{officer.position}</p>
              <span className="badge bg-primary">{officer.department}</span>
            </div>

            <div className="col-md-9">
              <div className="row">
                <div className="col-md-6 mb-2">
                  <strong>Employee ID:</strong> {officer.employeeId}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Reporting Officer:</strong> {officer.reportingOfficer}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>State:</strong> {officer.state}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>District:</strong> {officer.district}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Block:</strong> {officer.block}
                </div>
                
              </div>

              <h6 className="fw-bold mt-4 mb-2">Contact Information</h6>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <strong>Phone:</strong> {officer.phone}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Email:</strong> {officer.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department Section */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h6 className="fw-bold mb-3">
            <i className="bi bi-building me-2"></i> Department Information
          </h6>
          <h6 className="fw-bold">
            Public Works Department – Complaint Management Division
          </h6>
          <p className="text-muted fst-italic">
            “To efficiently manage and resolve citizen complaints through transparent
            processes, ensuring timely responses and maintaining high standards of
            municipal service delivery for the betterment of our community.”
          </p>

          <h6 className="fw-bold mt-3">Key Department Responsibilities:</h6>
          <ul className="mb-0">
            <li>Processing and tracking citizen complaints related to municipal services and infrastructure</li>
            <li>Coordinating with other departments to ensure timely resolution of reported issues</li>
            <li>Maintaining comprehensive records of all complaint cases and their resolution status</li>
            <li>Analyzing complaint data to identify recurring issues and recommend preventive measures</li>
            <li>Providing regular reports to city management on complaint resolution metrics and citizen satisfaction</li>
          </ul>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Officer Details</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    {/* Photo Upload */}
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Profile Photo</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handlePhotoChange}
                      />
                    </div>

                    {/* Editable Text Fields */}
                    {editableFields.map((key) => (
                      <div className="col-md-6" key={key}>
                        <label className="form-label text-capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name={key}
                          value={formData[key] || ""}
                          onChange={handleChange}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
