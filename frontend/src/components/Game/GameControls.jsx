import React from 'react'
import ScorePanel from './ScorePanel'
import ControlButtons from './ControlButtons'
import Instructions from './Instructions'

const GameControls = ({ gameStarted, score, balance, onStartGame, onResetGame }) => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
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