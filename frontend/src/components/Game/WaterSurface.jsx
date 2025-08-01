import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

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

export default WaterSurface