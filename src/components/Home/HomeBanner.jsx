import React from 'react';
import homebannerimg from "../../img/home-banner.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
// import { Link } from "react-router-dom";


function Banner() {
  const navigate = useNavigate();

  const handleStartClick = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    navigate("/login");  // Ask to login only if they click Start
  } else {
    navigate("/main");   // Go to question creation
  }
};

  return (
    <div className='banner-container'>
      <div className='banner-content'>
        <h1>Want to make question paper??</h1>
        <div className="start-link">
                 {/* <Link to="/main" >
          Start <FontAwesomeIcon icon={faArrowRight} />
          </Link> */}
          <button onClick={handleStartClick} className="start-btn">
            Start <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      <div className="img-block">
        <img src={homebannerimg} alt="home-banner" />
      </div>
    </div>
  );
}

export default Banner;
