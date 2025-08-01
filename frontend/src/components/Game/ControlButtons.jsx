import React from 'react'

const ControlButtons = ({ gameStarted, onStartGame, onResetGame }) => {
  return (
    <div className="text-center">
      {!gameStarted ? (
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
          onClick={onStartGame}
        >
          🎭 Bắt đầu múa rối nước
        </button>
      ) : (
        <button 
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
          onClick={onResetGame}
        >
          🔄 Chơi lại
        </button>
      )}
    </div>
  )
}

export default ControlButtons