import React from "react";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


const LandingCarousel = () => {
  const slides = [
    {
      title: "Government Policy Update",
      text: "Check new updates affecting fuel and civic regulations.",
      img: "https://media.istockphoto.com/id/184103864/photo/clouds-on-sky.jpg?s=612x612&w=0&k=20&c=3JGI13B8xwZIObLtl8IN1VFtPErHv2pKiWV0tTuemsI=",
    },
    {
      title: "Pending Issues",
      text: "Resolve critical civic issues reported by citizens.",
      img: "https://media.istockphoto.com/id/184103864/photo/clouds-on-sky.jpg?s=612x612&w=0&k=20&c=3JGI13B8xwZIObLtl8IN1VFtPErHv2pKiWV0tTuemsI=",
    },
    {
      title: "System Notifications",
      text: "Stay updated with the latest reports and alerts.",
      img: "https://media.istockphoto.com/id/184103864/photo/clouds-on-sky.jpg?s=612x612&w=0&k=20&c=3JGI13B8xwZIObLtl8IN1VFtPErHv2pKiWV0tTuemsI=",
    },
  ];

  return (
    <div id="authorityCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={index}
          >
            <img
              src={slide.img}
              className="d-block w-100 carousel-image"
              alt={slide.title}
            />
            <div className="carousel-caption d-none d-md-block">
              <h3>{slide.title}</h3>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#authorityCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#authorityCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default LandingCarousel;
