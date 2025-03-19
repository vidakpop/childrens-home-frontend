import { useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Gallery from './components/Gallery'
import DonationTracker from './components/DonationTracker'
import Donate from './components/Donate'

import ContributionComparison from './components/Contribution'

const App = () => {
  return (
    <div className='bg-gray-50 text-gray-900'> 
    
      <Navbar />
      <HeroSection />
     <Gallery />
     <DonationTracker />
     
      
      


    </div>
   
  )
}

export default App