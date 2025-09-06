// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// const LandingContent = () => {
//   const columnData = [
//     {
//       title: "Community Projects",
//       text: "Engage with local community projects and initiatives happening nearby.",
//       img: "https://images.unsplash.com/photo-1556742400-b5f9dbeae2a7?crop=entropy&cs=tinysrgb&fit=crop&h=140&w=140",
//     },
//     {
//       title: "Public Services",
//       text: "Get information about public services, updates, and upcoming events.",
//       img: "https://images.unsplash.com/photo-1581091215364-6ffac67d34be?crop=entropy&cs=tinysrgb&fit=crop&h=140&w=140",
//     },
//     {
//       title: "Reports & Alerts",
//       text: "Stay informed with latest notifications and civic reports.",
//       img: "https://images.unsplash.com/photo-1564869739036-0f1bc3a2b7bb?crop=entropy&cs=tinysrgb&fit=crop&h=140&w=140",
//     },
//   ];

//   const featuretteData = [
//     {
//       heading: "First featurette heading.",
//       sub: "It’ll blow your mind.",
//       text: "Some great placeholder content for the first featurette here. Imagine some exciting prose here.",
//       img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=crop&h=500&w=500",
//       order: false,
//     },
//     {
//       heading: "Oh yeah, it’s that good.",
//       sub: "See for yourself.",
//       text: "Another featurette? Of course. More placeholder content here to give you an idea of how this layout would work with some actual real-world content in place.",
//       img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=crop&h=500&w=500",
//       order: true,
//     },
//     {
//       heading: "And lastly, this one.",
//       sub: "Checkmate.",
//       text: "And yes, this is the last block of representative placeholder content. Again, not really intended to be actually read, simply here to give you a better view of what this would look like with some actual content.",
//       img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=crop&h=500&w=500",
//       order: false,
//     },
//   ];

//   return (
//     <div className="container marketing">
//       {/* Three columns of text below the carousel */}
//       <div className="row text-center mb-5">
//         {columnData.map((col, index) => (
//           <div className="col-lg-4" key={index}>
//             <img
//               src={col.img}
//               alt={col.title}
//               className="rounded-circle mb-3"
//               width="140"
//               height="140"
//             />
//             <h2 className="fw-normal">{col.title}</h2>
//             <p>{col.text}</p>
//             <p>
//               <a className="btn btn-secondary" href="#">
//                 View details »
//               </a>
//             </p>
//           </div>
//         ))}
//       </div>

//       <hr className="featurette-divider" />

//       {/* Featurettes */}
//       {featuretteData.map((feat, index) => (
//         <React.Fragment key={index}>
//           <div className="row featurette align-items-center mb-5">
//             <div className={`col-md-7 ${feat.order ? "order-md-2" : ""}`}>
//               <h2 className="featurette-heading fw-normal lh-1">
//                 {feat.heading}{" "}
//                 <span className="text-body-secondary">{feat.sub}</span>
//               </h2>
//               <p className="lead">{feat.text}</p>
//             </div>
//             <div className={`col-md-5 ${feat.order ? "order-md-1" : ""}`}>
//               <img
//                 src={feat.img}
//                 alt={feat.heading}
//                 className="img-fluid mx-auto featurette-image"
//               />
//             </div>
//           </div>
//           <hr className="featurette-divider" />
//         </React.Fragment>
//       ))}
//     </div>
//   );
// };

// export default LandingContent;


import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const LandingContent = () => {
  const authoritiesData = [
    {
      heading: "Prime Minister",
      sub: "Narendra Modi",
      text: "Leading national policy initiatives and representing India on the global stage. Responsible for overall governance and key national decisions.",
      img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Narendra_Modi_%28cropped%29.jpg",
    },
    {
      heading: "President",
      sub: "Droupadi Murmu",
      text: "Ceremonial head of state, overseeing constitutional duties and national protocols. Advocates for social and cultural initiatives.",
      img: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Droupadi_Murmu_official_portrait.jpg",
    },
    {
      heading: "Municipal Commissioner",
      sub: "Anjali Sharma",
      text: "Responsible for city-level governance, urban planning, and ensuring efficient civic services in the municipality.",
      img: "https://images.unsplash.com/photo-1596495577886-d920f6d9e5e8?crop=entropy&cs=tinysrgb&fit=crop&h=500&w=500",
    },
  ];

  const featuretteData = [
    {
      heading: "Citizen Engagement Portal",
      sub: "Empowering citizens daily",
      text: "Our portal allows citizens to submit complaints, provide feedback, and participate in surveys. Every voice matters in shaping better public services.",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=crop&h=500&w=500",
      order: false,
    },
    {
      heading: "Smart Public Services",
      sub: "Fast, reliable, transparent",
      text: "Access essential public services online, track service requests, and reduce waiting times. We are making governance efficient and user-friendly.",
      img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=crop&h=500&w=500",
      order: true,
    },
    {
      heading: "Real-Time Reporting & Notifications",
      sub: "Immediate alerts & updates",
      text: "Get notifications about local events, emergencies, and civic issues in real-time. Participate actively and ensure community safety and awareness.",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=crop&h=500&w=500",
      order: false,
    },
  ];

  return (
    <div className="container marketing">
      {/* Authorities Section */}
      <div className="row text-center mb-5">
        {authoritiesData.map((auth, index) => (
          <div className="col-lg-4" key={index}>
            <img
              src={auth.img}
              alt={auth.sub}
              className="rounded-circle mb-3"
              width="140"
              height="140"
            />
            <h2 className="fw-normal">{auth.heading}</h2>
            <h5 className="text-muted">{auth.sub}</h5>
            <p>{auth.text}</p>
            <p>
              <a className="btn btn-secondary" href="#">
                View Profile »
              </a>
            </p>
          </div>
        ))}
      </div>

      <hr className="featurette-divider" />

      {/* Featurettes Section */}
      {featuretteData.map((feat, index) => (
        <React.Fragment key={index}>
          <div className="row featurette align-items-center mb-5">
            <div className={`col-md-7 ${feat.order ? "order-md-2" : ""}`}>
              <h2 className="featurette-heading fw-normal lh-1">
                {feat.heading}{" "}
                <span className="text-body-secondary">{feat.sub}</span>
              </h2>
              <p className="lead">{feat.text}</p>
            </div>
            <div className={`col-md-5 ${feat.order ? "order-md-1" : ""}`}>
              <img
                src={feat.img}
                alt={feat.heading}
                className="img-fluid mx-auto featurette-image"
              />
            </div>
          </div>
          <hr className="featurette-divider" />
        </React.Fragment>
      ))}
    </div>
  );
};

export default LandingContent;
