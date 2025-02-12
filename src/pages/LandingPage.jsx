import React from "react";
import { Link } from "react-router-dom";
import landingVideo from '../assets/Landing video.mp4';




const LandingPage = () => {
  return (
    <div className="main">
      <video src={landingVideo} type="video/mp4" autoPlay muted loop className="background-video"></video>
      <div className="landing-content">
        <h1>Embark on Your Next Adventure with Lucy Travels</h1>
        <p>"Discover breathtaking destinations and unforgettable experiences"</p>

        <Link to="/signup">
          <button className="call-btn">Join the Adventure</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
