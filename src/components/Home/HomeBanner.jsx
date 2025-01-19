import React from 'react'
import homebannerimg from "../../img/home-banner.png"
import arrow from "../../img/arrow.png"

import { Link } from "react-router-dom";


function banner() {
  return (

    <div className='banner-container'>

      <div className='banner-content'>
        <h1>Want to make question ??</h1>
        <div className="start-link">
                  <Link to="/Main" >
                    Start <img src={arrow} alt="arrow" />
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
