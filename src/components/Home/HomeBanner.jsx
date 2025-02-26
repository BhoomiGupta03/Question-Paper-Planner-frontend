import React from 'react'
import homebannerimg from "../../img/home-banner.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";


function banner() {
  return (

    <div className='banner-container'>

      <div className='banner-content'>
        <h1>Want to make question ??</h1>
        <div className="start-link">
          <Link to="/main" >
          Start <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>


      <div className="img-block">
        <img src={homebannerimg} alt="home-baner" />
      </div>


    </div>
  )
}

export default banner
