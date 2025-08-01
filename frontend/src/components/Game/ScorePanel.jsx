import React from 'react'

const ScorePanel = ({ score, balance }) => {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-semibold mb-4">Điểm số: {score}</h3>
      <div className="bg-gray-100 rounded-lg p-4">
        <span className="text-sm text-gray-600 block mb-2">Thăng bằng:</span>
        <div className="relative bg-gray-200 rounded-full h-4">
          <div 
            className="absolute top-0 w-4 h-4 rounded-full transition-all duration-200"
            style={{ 
              left: `calc(${50 + balance * 50}% - 8px)`,
              backgroundColor: Math.abs(balance) < 0.3 ? '#10B981' : '#DC2626'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ScorePanel