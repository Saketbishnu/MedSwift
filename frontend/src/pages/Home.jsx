import React from 'react'
import Doctor from '../components/Doctor'
import LatestCollection from '../components/LatestCollection'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import BestSeller from '../components/BestSeller'






const Home = () => {
  return (
    <div>
      <Doctor/>
      <LatestCollection/>
      <BestSeller/>

      <OurPolicy/>
      <NewsletterBox/>
      

    
  
      
    </div>
  )
}

export default Home