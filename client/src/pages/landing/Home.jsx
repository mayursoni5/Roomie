import React from 'react'
import HeroSection from '@/components/HeroSection'
import FeatureSection from '@/components/FeatureSection'
import AgreementSection from '@/components/AgreementSection'
import ListingCarousel from '@/components/ListingCarousel'
import Footer from '@/components/Footer'
function Home() {
  return (
    <div className=' bg-gray-100"'>
      <HeroSection/>
      <FeatureSection/>
      <AgreementSection/>
      <ListingCarousel/>
      <Footer/>

      
      
    </div>
  )
}

export default Home