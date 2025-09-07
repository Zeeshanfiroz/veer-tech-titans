import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const StatCard = ({ icon, title, count }) => {
  return (
    <div
      className="card shadow-sm border-0 text-center p-3 m-2 flex-grow-1 position-relative"
      // style={{ minWidth: "200px", maxWidth: "250px" }}
    >
      {/* Animated Border */}
      <span
        className="position-absolute top-0 start-0 w-100 h-100 rounded"
        style={{
          border: "3px solid transparent",
          borderRadius: "12px",
          background:
            "linear-gradient(90deg,#ff0000,#ff7300,#ffeb00,#47ff00,#00ffee,#2b65ff,#8000ff,#ff0080,#ff0000)",
          backgroundSize: "400% 400%",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: "borderMove 5s linear infinite",
          zIndex: 0,
        }}
      ></span>

      <div className="card-body d-flex align-items-center justify-content-center position-relative z-1">
        {/* Icon */}
        <div className="me-3">
          <i className={`bi ${icon} fs-1`}></i>
        </div>

        {/* Count + Title */}
        <div className="text-start statcards-row">
          <h4 className="fw-bold mb-0">{count}</h4>
          <small className="text-muted">{title}</small>
        </div>
      </div>

      {/* Inline Keyframes */}
      <style>
        {`
          @keyframes borderMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default StatCard;
