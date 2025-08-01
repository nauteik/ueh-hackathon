import React, { Suspense, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Box } from '@react-three/drei'
import './App.css'

// Water surface component - brighter and fresher
const WaterSurface = () => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[25, 25, 64, 64]} />
      <meshStandardMaterial 
        color="#7DD3FC" 
        transparent 
        opacity={0.8}
        roughness={0.05}
        metalness={0.3}
        emissive="#E0F2FE"
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

// Water Puppet component - traditional Vietnamese water puppet
const WaterPuppet = ({ position, balance }) => {
  const meshRef = useRef()
  const rodRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current && rodRef.current) {
      // Puppet sways based on balance
      meshRef.current.rotation.z = balance * 0.2
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
      
      // Rod follows puppet movement
      rodRef.current.rotation.z = balance * 0.1
    }
  })

  return (
    <group position={position}>
      {/* Control rod (hidden underwater) */}
      <mesh ref={rodRef} position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2]} />
        <meshStandardMaterial color="#8B4513" transparent opacity={0.3} />
      </mesh>
      
      <group ref={meshRef}>
        {/* Puppet body */}
        <Box args={[0.8, 1.2, 0.3]} position={[0, 0.6, 0]}>
          <meshStandardMaterial color="#DC2626" />
        </Box>
        
        {/* Puppet head */}
        <mesh position={[0, 1.4, 0]}>
          <sphereGeometry args={[0.3]} />
          <meshStandardMaterial color="#FBBF24" />
        </mesh>
        
        {/* Traditional hat */}
        <mesh position={[0, 1.6, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.4, 0.2, 8]} />
          <meshStandardMaterial color="#059669" />
        </mesh>
        
        {/* Arms */}
        <Box args={[0.15, 0.6, 0.15]} position={[-0.5, 0.8, 0]}>
          <meshStandardMaterial color="#FBBF24" />
        </Box>
        <Box args={[0.15, 0.6, 0.15]} position={[0.5, 0.8, 0]}>
          <meshStandardMaterial color="#FBBF24" />
        </Box>
        
        {/* Traditional costume details */}
        <Box args={[0.9, 0.3, 0.32]} position={[0, 0.3, 0]}>
          <meshStandardMaterial color="#F59E0B" />
        </Box>
      </group>
    </group>
  )
}

// Game UI component
const GameUI = ({ score, balance, gameStarted, onStartGame, onResetGame }) => {
  return (
    <div className="game-ui">
      <div className="score-panel">
        <h2>Điểm số: {score}</h2>
        <div className="balance-meter">
          <span>Thăng bằng: </span>
          <div className="balance-bar">
            <div 
              className="balance-indicator" 
              style={{ 
                left: `${50 + balance * 50}%`,
                backgroundColor: Math.abs(balance) < 0.3 ? '#10B981' : '#DC2626'
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="controls">
        {!gameStarted ? (
          <button className="game-button start-button" onClick={onStartGame}>
            🎭 Bắt đầu múa rối nước
          </button>
        ) : (
          <button className="game-button reset-button" onClick={onResetGame}>
            🔄 Chơi lại
          </button>
        )}
      </div>
      
      <div className="instructions">
        <p>🎮 Sử dụng phím A/D hoặc ←/→ để điều khiển con rối</p>
        <p>🌊 Giữ thăng bằng để con rối không ngã!</p>
        <p>🎭 Nghệ thuật rối nước truyền thống Việt Nam</p>
      </div>
    </div>
  )
}

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [balance, setBalance] = useState(0)
  const [puppetPosition, setPuppetPosition] = useState([0, 1, 0])

  // Game logic
  React.useEffect(() => {
    if (!gameStarted) return

    const handleKeyPress = (event) => {
      switch(event.key.toLowerCase()) {
        case 'a':
        case 'arrowleft':
          setBalance(prev => Math.max(prev - 0.1, -1))
          break
        case 'd':
        case 'arrowright':
          setBalance(prev => Math.min(prev + 0.1, 1))
          break
      }
    }

    // Auto-balance drift
    const balanceDrift = setInterval(() => {
      setBalance(prev => {
        const drift = (Math.random() - 0.5) * 0.05
        return Math.max(-1, Math.min(1, prev + drift))
      })
    }, 100)

    // Score increment
    const scoreInterval = setInterval(() => {
      if (Math.abs(balance) < 0.5) {
        setScore(prev => prev + 1)
      }
    }, 100)

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

  return (
    <div className="app">
      <header className="app-header">
        <img src="/logo77.png" alt="Logo" className="logo" />
        <h1>🎭 Rối Nước Việt Nam</h1>
        <p>Trải nghiệm nghệ thuật rối nước truyền thống qua game 3D tương tác</p>
      </header>

      <div className="canvas-container">
        <Canvas camera={{ position: [0, 6, 12], fov: 65 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 15, 5]} intensity={1.5} color="#FFFFFF" />
          <pointLight position={[-5, 8, 5]} intensity={0.8} color="#7DD3FC" />
          <pointLight position={[5, 8, 5]} intensity={0.8} color="#FBBF24" />
          
          <Suspense fallback={null}>
            <WaterSurface />
            {gameStarted && <WaterPuppet position={puppetPosition} balance={balance} />}
            
            <Text
              position={[0, 5, 0]}
              fontSize={0.8}
              color="#059669"
              anchorX="center"
              anchorY="middle"
            >
              {gameStarted ? `Điểm: ${score}` : "Sẵn sàng múa rối?"}
            </Text>
          </Suspense>
          
          <OrbitControls 
            enableZoom={true} 
            maxPolarAngle={Math.PI / 2.2} 
            minDistance={8}
            maxDistance={25}
            target={[0, 0, 0]}
          />
        </Canvas>
      </div>

      <GameUI 
        score={score}
        balance={balance}
        gameStarted={gameStarted}
        onStartGame={startGame}
        onResetGame={resetGame}
      />
    </div>
  )
}

export default App