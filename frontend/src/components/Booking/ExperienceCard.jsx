import React from 'react'

const ExperienceCard = ({ title, description, price, duration, index }) => {
  // Tạo màu sắc dựa trên index để có sự đa dạng
  const colors = [
    { border: 'border-[#B91C1C]', price: 'text-[#B91C1C]', bg: 'bg-[#B91C1C]/10' },
    { border: 'border-[#F9B949]', price: 'text-[#F9B949]', bg: 'bg-[#F9B949]/10' },
    { border: 'border-[#0B4B3A]', price: 'text-[#0B4B3A]', bg: 'bg-[#0B4B3A]/20' }
  ]
  
  const colorSet = colors[index % colors.length]
  
  return (
    <div className={`group relative backdrop-blur-sm rounded-xl p-8 ${colorSet.bg} border-2 ${colorSet.border} hover:bg-[#B91C1C]/20 hover:border-[#F9B949] transition-all duration-500 hover:scale-105 hover:-translate-y-2`}>
      {/* Decorative Corners - Vietnamese style */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#F9B949] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#F9B949] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <h4 className="text-xl font-semibold mb-3 text-[#F9B949]">{title}</h4>
      <p className="text-white/80 mb-4 group-hover:text-white transition-colors duration-300">{description}</p>
      <div className="flex justify-between items-center">
        <span className={`text-2xl font-bold ${colorSet.price} group-hover:text-[#F9B949] transition-colors duration-300`}>{price}</span>
        <span className="text-sm text-white/60 px-3 py-1 rounded-full border border-[#F9B949]/30">{duration}</span>
      </div>
      
      {/* Traditional lantern decoration */}
      <div className="absolute -bottom-2 right-6 w-4 h-8 bg-[#F9B949] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  )
}

export default ExperienceCard