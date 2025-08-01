import React from 'react'
import './ExperienceCard.css'

const ExperienceCard = ({ title, description, price, duration, index }) => {
  // Tạo màu sắc dựa trên index để có sự đa dạng
  const colors = [
    { border: 'border-[#B91C1C]', price: 'text-[#B91C1C]', bg: 'bg-[#B91C1C]/10' },
    { border: 'border-[#F9B949]', price: 'text-[#F9B949]', bg: 'bg-[#F9B949]/10' },
    { border: 'border-[#0B4B3A]', price: 'text-[#0B4B3A]', bg: 'bg-[#0B4B3A]/20' }
  ]
  
  const colorSet = colors[index % colors.length]
  
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
      
      {/* Traditional lantern decoration */}
      <div className="absolute -bottom-2 right-6 w-4 h-8 bg-[#F9B949] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  )
}

export default ExperienceCard