import React from 'react'
import homebannerimg from "../../img/home-banner.png"
import { IoIosArrowForward } from "react-icons/io";

import { Link } from "react-router-dom";


function banner() {
  return (

    <div className='banner-container'>

      <div className='banner-content'>
        <h1>Want To Make Question Paper ??</h1>
        <div className="start-link">
          <Link to="/main" >
            Start
            <IoIosArrowForward />
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
