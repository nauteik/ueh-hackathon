import React from 'react'

const ScorePanel = ({ score, balance }) => {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-semibold mb-4 text-[#F9B949]">Điểm số: {score}</h3>
      <div className="bg-[#0B4B3A]/50 rounded-lg p-4 border border-[#F9B949]/30">
        <span className="text-sm text-white/80 block mb-2">Thăng bằng:</span>
        <div className="relative bg-[#0B4B3A]/80 rounded-full h-4 border border-[#F9B949]/20">
          <div 
            className="absolute top-0 w-4 h-4 rounded-full transition-all duration-200 animate-pulse"
            style={{ 
              left: `calc(${50 + balance * 50}% - 8px)`,
              backgroundColor: Math.abs(balance) < 0.3 ? '#F9B949' : '#B91C1C',
              boxShadow: Math.abs(balance) < 0.3 ? '0 0 10px #F9B949' : '0 0 10px #B91C1C'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ScorePanel