import React from 'react'
import ExperienceCard from './ExperienceCard'
import { EXPERIENCE_PACKAGES } from '../../constants'

const ExperiencePackages = () => {
  return (
    <div className="space-y-8">
      <div className="relative">
        {/* Temple roof decoration on top */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-[#F9B949] rounded-t-md"></div>
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-[#B91C1C] rounded-t-md"></div>
        
        <h3 className="text-2xl font-bold text-[#F9B949] mb-6 text-center pt-6">
          Các gói trải nghiệm
        </h3>
      </div>
      
      {EXPERIENCE_PACKAGES.map((pkg, index) => (
        <ExperienceCard
          key={index}
          title={pkg.title}
          description={pkg.description}
          price={pkg.price}
          duration={pkg.duration}
          index={index}
        />
      ))}
    </div>
  )
}

export default ExperiencePackages