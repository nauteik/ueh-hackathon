import React from 'react'
import './ExperienceCard.css'

const ExperienceCard = ({ title, description, price, duration, borderColor, priceColor }) => {
  return (
    <div className="experience-card">
      <div className="experience-icon">
        🎭
      </div>
      <h4 className="experience-title">{title}</h4>
      <p className="experience-description">{description}</p>
      <div className="flex justify-between items-center">
        <span className="experience-price">{price}</span>
        <span className="duration-badge">{duration}</span>
      </div>
    </div>
  )
}

export default ExperienceCard