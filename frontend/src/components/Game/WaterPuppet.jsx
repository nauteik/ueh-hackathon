import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'

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

export default WaterPuppet