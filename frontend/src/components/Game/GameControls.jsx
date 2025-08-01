import React from 'react'
import ScorePanel from './ScorePanel'
import ControlButtons from './ControlButtons'
import Instructions from './Instructions'

const GameControls = ({ gameStarted, score, balance, onStartGame, onResetGame }) => {
  return (
    <div className="relative backdrop-blur-sm rounded-xl p-8 bg-[#0B4B3A]/30 border-2 border-[#F9B949]/40">
      {/* Temple roof decoration on bottom */}
      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 rotate-180 w-32 h-6 bg-[#F9B949] rounded-t-md"></div>
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 rotate-180 w-24 h-3 bg-[#B91C1C] rounded-t-md"></div>
      
      {/* Decorative Corners - Vietnamese style */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#F9B949] opacity-50"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#F9B949] opacity-50"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ScorePanel score={score} balance={balance} />
        <ControlButtons 
          gameStarted={gameStarted}
          onStartGame={onStartGame}
          onResetGame={onResetGame}
        />
        <Instructions />
      </div>
    </div>
  )
}

export default GameControls