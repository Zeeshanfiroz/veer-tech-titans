import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Home() {
  return (
    <main>
      {/* Carousel */}
      <div
        id="myCarousel"
        className="carousel slide mb-6"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="1"
            className="active"
            aria-current="true"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item" style={{ height: "500px" }}>
            <svg
              aria-hidden="true"
              className="bd-placeholder-img"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="100%"
                height="100%"
                fill="var(--bs-secondary-color)"
              />
            </svg>
            <div className="container">
              <div className="carousel-caption text-start">
                <h1>Example headline.</h1>
                <p className="opacity-75">
                  Some representative placeholder content for the first slide of
                  the carousel.
                </p>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item active" style={{ height: "500px" }}>
            <svg
              aria-hidden="true"
              className="bd-placeholder-img"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="100%"
                height="100%"
                fill="var(--bs-secondary-color)"
              />
            </svg>
            <div className="container">
              <div className="carousel-caption">
                <h1>Another example headline.</h1>
                <p>
                  Some representative placeholder content for the second slide
                  of the carousel.
                </p>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item" style={{ height: "500px" }}>
            <svg
              aria-hidden="true"
              className="bd-placeholder-img"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="100%"
                height="100%"
                fill="var(--bs-secondary-color)"
              />
            </svg>
            <div className="container">
              <div className="carousel-caption text-end">
                <h1>One more for good measure.</h1>
                <p>
                  Some representative placeholder content for the third slide of
                  this carousel.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Rest of your marketing and footer sections remain unchanged */}
    </main>
  );
}

export default Home;
