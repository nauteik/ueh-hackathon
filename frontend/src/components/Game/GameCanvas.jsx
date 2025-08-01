import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import WaterSurface from './WaterSurface'
import WaterPuppet from './WaterPuppet'

const GameCanvas = ({ gameStarted, puppetPosition, balance, score }) => {
  return (
    <div className="relative backdrop-blur-sm rounded-xl overflow-hidden mb-8 border-2 border-[#F9B949]/40">
      {/* Temple roof decoration on top */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-[#F9B949] rounded-t-md z-10"></div>
      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-24 h-3 bg-[#B91C1C] rounded-t-md z-10"></div>
      
      {/* Decorative Corners - Vietnamese style */}
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#F9B949] opacity-70 z-10"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#F9B949] opacity-70 z-10"></div>
      
      <div className="h-96 md:h-[500px]">
        <Canvas camera={{ position: [0, 6, 12], fov: 65 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 15, 5]} intensity={1.5} color="#FFFFFF" />
          <pointLight position={[-5, 8, 5]} intensity={0.8} color="#7DD3FC" />
          <pointLight position={[5, 8, 5]} intensity={0.8} color="#F9B949" />
          
          <Suspense fallback={null}>
            <WaterSurface />
            {gameStarted && <WaterPuppet position={puppetPosition} balance={balance} />}
            
            <Text
              position={[0, 5, 0]}
              fontSize={0.8}
              color="#F9B949"
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