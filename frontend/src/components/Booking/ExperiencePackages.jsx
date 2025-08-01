import React from 'react'
import ExperienceCard from './ExperienceCard'
import { EXPERIENCE_PACKAGES } from '../../constants'

const ExperiencePackages = () => {
  return (
    <div className="experience-packages-container animate-fade-in-right">
      <div className="mb-8">
        <h3 className="experience-packages-title text-2xl font-bold text-white mb-4">
          Chọn gói phù hợp với nhu cầu của bạn
        </h3>
      </div>
      
      <div className="experience-cards-grid space-y-8">
        {EXPERIENCE_PACKAGES.map((pkg, index) => (
          <div 
            key={index} 
            className={`experience-card-wrapper animate-fade-in-up animate-delay-${(index + 1) * 100}`}
          >
            <ExperienceCard
              title={pkg.title}
              description={pkg.description}
              price={pkg.price}
              duration={pkg.duration}
              borderColor={pkg.borderColor}
              priceColor={pkg.priceColor}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExperiencePackages