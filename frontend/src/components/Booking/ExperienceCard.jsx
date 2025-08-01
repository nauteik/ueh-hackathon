import React from 'react'

const ExperienceCard = ({ title, description, price, duration, borderColor, priceColor }) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg border-l-4 ${borderColor}`}>
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className={`text-2xl font-bold ${priceColor}`}>{price}</span>
        <span className="text-sm text-gray-500">{duration}</span>
      </div>
    </div>
  )
}

export default ExperienceCard