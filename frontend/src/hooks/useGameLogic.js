import { useState, useEffect } from 'react'
import { GAME_CONSTANTS } from '../constants'

export const useGameLogic = () => {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [balance, setBalance] = useState(0)
  const [puppetPosition, setPuppetPosition] = useState([0, 1, 0])

  useEffect(() => {
    if (!gameStarted) return

    const handleKeyPress = (event) => {
      switch(event.key.toLowerCase()) {
        case 'a':
        case 'arrowleft':
          setBalance(prev => Math.max(prev - GAME_CONSTANTS.BALANCE_STEP, -1))
          break
        case 'd':
        case 'arrowright':
          setBalance(prev => Math.min(prev + GAME_CONSTANTS.BALANCE_STEP, 1))
          break
      }
    }

    // Auto-balance drift
    const balanceDrift = setInterval(() => {
      setBalance(prev => {
        const drift = (Math.random() - 0.5) * GAME_CONSTANTS.BALANCE_DRIFT_RATE
        return Math.max(-1, Math.min(1, prev + drift))
      })
    }, GAME_CONSTANTS.DRIFT_INTERVAL)

    // Score increment
    const scoreInterval = setInterval(() => {
      if (Math.abs(balance) < GAME_CONSTANTS.SCORE_THRESHOLD) {
        setScore(prev => prev + 1)
      }
    }, GAME_CONSTANTS.SCORE_INTERVAL)

    window.addEventListener('keydown', handleKeyPress)
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      clearInterval(balanceDrift)
      clearInterval(scoreInterval)
    }
  }, [gameStarted, balance])

  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setBalance(0)
  }

  const resetGame = () => {
    setGameStarted(false)
    setScore(0)
    setBalance(0)
  }

  return {
    gameStarted,
    score,
    balance,
    puppetPosition,
    startGame,
    resetGame
  }
}