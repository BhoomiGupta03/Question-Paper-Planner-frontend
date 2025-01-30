import React from 'react'
import Header from '../Pages/Header';
import HomeBanner from './HomeBanner'
import Aboutusbanner from '../Aboutus/Aboutusbanner'
import Review from '../Pages/Review'

function Home() {
  return (
    <div>
      <Header/>
<HomeBanner/>
      <Aboutusbanner/>
      <Review/>
      
    </div>
  )
}

export default Home
