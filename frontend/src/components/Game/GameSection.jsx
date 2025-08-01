import React from 'react'
import GameCanvas from './GameCanvas'
import GameControls from './GameControls'
import { useGameLogic } from '../../hooks'

const GameSection = () => {
  const {
    gameStarted,
    score,
    balance,
    puppetPosition,
    startGame,
    resetGame
  } = useGameLogic()

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            🎮 Trải nghiệm Game 3D
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Điều khiển con rối nước trong môi trường 3D tương tác và thử thách khả năng thăng bằng của bạn
          </p>
        </div>

        <GameCanvas 
          gameStarted={gameStarted}
          puppetPosition={puppetPosition}
          balance={balance}
          score={score}
        />

        <GameControls
          gameStarted={gameStarted}
          score={score}
          balance={balance}
          onStartGame={startGame}
          onResetGame={resetGame}
        />
      </div>
    </section>
  )
}

export default GameSection