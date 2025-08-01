import React from 'react'

const ControlButtons = ({ gameStarted, onStartGame, onResetGame }) => {
  return (
    <div className="text-center">
      {!gameStarted ? (
        <button 
          className="bg-[#B91C1C] hover:bg-[#B91C1C]/80 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-[#F9B949] hover:scale-105"
          onClick={onStartGame}
        >
          🎭 Bắt đầu múa rối nước
        </button>
      ) : (
        <button 
          className="bg-[#0B4B3A] hover:bg-[#0B4B3A]/80 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-[#F9B949] hover:scale-105"
          onClick={onResetGame}
        >
          🔄 Chơi lại
        </button>
      )}
    </div>
  )
}

export default ControlButtons