import React from 'react'
import ExperienceCard from './ExperienceCard'
import { EXPERIENCE_PACKAGES } from '../../constants'

const ExperiencePackages = () => {

  return (
    <div className="space-y-6">
      {EXPERIENCE_PACKAGES.map((pkg, index) => (
        <ExperienceCard
          key={index}
          title={pkg.title}
          description={pkg.description}
          price={pkg.price}
          duration={pkg.duration}
          borderColor={pkg.borderColor}
          priceColor={pkg.priceColor}
        />
      ))}
    </div>
  )
}

export default ExperiencePackages