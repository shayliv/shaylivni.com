"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Html, PerspectiveCamera, useGLTF } from "@react-three/drei"
import { Suspense, useRef } from "react"
import type * as THREE from "three"

function CharacterModel({ isDancing = false }: { isDancing?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF("/character.glb")
  const timeRef = useRef(0)

  useFrame((state, delta) => {
    if (groupRef.current) {
      timeRef.current += delta
      
      if (isDancing) {
        // Real dancing animation with multiple layers of movement
        const t = timeRef.current
        
        // Big bouncy up and down movement (main dance beat)
        const bounce = Math.sin(t * 3) * 0.25 + Math.sin(t * 6) * 0.1
        
        // Dynamic rotation - spinning and tilting
        const spinY = t * 2 + Math.sin(t * 2) * 0.5
        const tiltX = Math.sin(t * 2.5) * 0.4
        const tiltZ = Math.cos(t * 2.3) * 0.3
        
        // Side-to-side swaying (dance moves)
        const swayX = Math.sin(t * 2.2) * 0.2 + Math.sin(t * 4) * 0.1
        const swayZ = Math.cos(t * 2.1) * 0.15
        
        // Scale pulsing for extra energy
        const scalePulse = 1 + Math.sin(t * 4) * 0.08
        
        // Apply all transformations
        groupRef.current.position.y = 0.7 + bounce
        groupRef.current.position.x = swayX
        groupRef.current.position.z = swayZ
        groupRef.current.rotation.y = spinY
        groupRef.current.rotation.x = tiltX
        groupRef.current.rotation.z = tiltZ
        groupRef.current.scale.set(scalePulse, scalePulse, scalePulse)
      } else {
        // Gentle floating animation
        const float = Math.sin(timeRef.current * 1) * 0.05
        groupRef.current.position.y = 0.7 + float
        groupRef.current.rotation.y += delta * 0.3
        groupRef.current.rotation.x = 0
        groupRef.current.rotation.z = 0
        groupRef.current.position.x = 0
        groupRef.current.position.z = 0
        groupRef.current.scale.set(1, 1, 1)
      }
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.6} position={[0, 0, 0]} />
    </group>
  )
}

function Loader() {
  return (
    <Html center>
      <div className="text-2xl font-heading font-bold uppercase animate-pulse">Loading...</div>
    </Html>
  )
}

export function Character3D({ isDancing = false }: { isDancing?: boolean }) {
  return (
    <div className="w-full h-full">
      <Canvas className="w-full h-full" shadows>
        <PerspectiveCamera makeDefault position={[0, 0.5, 3]} fov={70} />

        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-5, 5, 5]} intensity={1.2} />
        <directionalLight position={[0, -5, 3]} intensity={0.8} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-3, 3, 3]} intensity={1.2} color="#ffffff" />
        <pointLight position={[0, 5, 2]} intensity={1} color="#ffeecc" />
        <spotLight position={[0, 8, 0]} angle={0.6} penumbra={0.5} intensity={1.5} />

        <Suspense fallback={<Loader />}>
          <CharacterModel isDancing={isDancing} />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload("/character.glb")
