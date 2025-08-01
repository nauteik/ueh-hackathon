import React from 'react'

const Instructions = () => {
  return (
    <div className="text-center">
      <h4 className="font-semibold mb-3 text-[#F9B949]">Hướng dẫn:</h4>
      <div className="text-sm text-white/80 space-y-2">
        <p className="bg-[#B91C1C]/20 py-2 px-3 rounded-lg border border-[#F9B949]/20">
          🎮 Phím A/D hoặc ←/→ để điều khiển
        </p>
        <p className="bg-[#B91C1C]/20 py-2 px-3 rounded-lg border border-[#F9B949]/20">
          🌊 Giữ thăng bằng để không ngã
        </p>
        <p className="bg-[#B91C1C]/20 py-2 px-3 rounded-lg border border-[#F9B949]/20">
          🎭 Nghệ thuật rối nước truyền thống
        </p>
      </div>
    </div>
  )
}

export default Instructions