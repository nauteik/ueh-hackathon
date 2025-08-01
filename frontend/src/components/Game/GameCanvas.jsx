import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import WaterSurface from './WaterSurface'
import WaterPuppet from './WaterPuppet'

const GameCanvas = ({ gameStarted, puppetPosition, balance, score }) => {
  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-8">
      <div className="h-96 md:h-[500px]">
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
    </div>
  )
}

export default GameCanvas