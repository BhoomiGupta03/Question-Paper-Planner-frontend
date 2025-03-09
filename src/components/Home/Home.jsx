import React from 'react'
import Header from '../Pages/Header';
import HomeBanner from './HomeBanner'
import Aboutusbanner from '../Aboutus/Aboutusbanner'
import Reviewbanner from '../Review/Reviewbanner'

function Home() {
  return (
    <div>
      <Header/>
<HomeBanner/>
      <Aboutusbanner/>
      <Reviewbanner/>
      
    </div>
  )
}

export default Home
