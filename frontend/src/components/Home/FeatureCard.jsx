import React from 'react'

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="group relative bg-[#B91C1C]/10 backdrop-blur-sm rounded-xl p-8 border-2 border-[#F9B949]/30 hover:bg-[#B91C1C]/20 hover:border-[#F9B949] transition-all duration-500 hover:scale-105 hover:-translate-y-2">
      {/* Temple roof decoration - inspired by the image */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-[#F9B949] rounded-t-md"></div>
      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-[#B91C1C] rounded-t-md"></div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#B91C1C]/20 to-[#F9B949]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
      
      <div className="relative z-10 pt-4">
        <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-[#F9B949] mb-4 group-hover:text-[#F9B949] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Decorative Corners - Vietnamese style */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#F9B949] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#F9B949] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Traditional lantern decoration */}
      <div className="absolute -bottom-2 right-6 w-4 h-8 bg-[#F9B949] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  )
}

export default FeatureCard