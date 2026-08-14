import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment, Stars } from '@react-three/drei'
import * as THREE from 'three'
import useMousePosition from '../../hooks/useMousePosition'

/* ── Floating Glass Cube ── */
const GlassCube = ({ position, size = 1, speed = 1, color = '#00F0FF' }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.3
      meshRef.current.rotation.y += 0.003 * speed
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5} floatingRange={[-0.5, 0.5]}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.15}
          roughness={0.05}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1}
        />
        {/* Wireframe overlay */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(size, size, size)]} />
          <lineBasicMaterial color={color} transparent opacity={0.3} />
        </lineSegments>
      </mesh>
    </Float>
  )
}

/* ── Floating Particle Field ── */
const ParticleField = ({ count = 200 }) => {
  const pointsRef = useRef()
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      
      // Blue to cyan gradient colors
      const t = Math.random()
      colors[i * 3] = t * 0.0 + (1 - t) * 0.23 // R
      colors[i * 3 + 1] = t * 0.94 + (1 - t) * 0.51 // G
      colors[i * 3 + 2] = t * 1.0 + (1 - t) * 0.96 // B
      
      sizes[i] = Math.random() * 2 + 0.5
    }
    
    return { positions, colors, sizes }
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles.positions}
          count={particles.positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={particles.colors}
          count={particles.colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ── Grid Floor ── */
const HolographicGrid = () => {
  const gridRef = useRef()

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 2
    }
  })

  return (
    <group position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper args={[40, 40, '#0066FF', '#0066FF']} ref={gridRef}>
        <meshBasicMaterial attach="material" color="#0066FF" transparent opacity={0.06} />
      </gridHelper>
    </group>
  )
}

/* ── Glowing Orb ── */
const GlowingOrb = ({ position, color = '#00F0FF', size = 0.15 }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.2)
    }
  })

  return (
    <Float speed={2} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
      {/* Outer glow */}
      <mesh position={position}>
        <sphereGeometry args={[size * 2.5, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.05} />
      </mesh>
    </Float>
  )
}

/* ── Camera Rig ── */
const CameraRig = () => {
  const { camera } = useThree()
  const mousePosition = useMousePosition()
  
  useFrame(() => {
    const targetX = (mousePosition.x / window.innerWidth - 0.5) * 0.5
    const targetY = -(mousePosition.y / window.innerHeight - 0.5) * 0.3
    
    camera.position.x += (targetX - camera.position.x) * 0.02
    camera.position.y += (targetY + 1 - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ── Main Scene ── */
const Scene = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#3B82F6" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#00F0FF" />
      <pointLight position={[0, 5, -5]} intensity={0.3} color="#8B5CF6" />
      
      {/* Glass Cubes */}
      <GlassCube position={[-3, 1, -2]} size={1.2} speed={0.8} color="#3B82F6" />
      <GlassCube position={[3.5, -0.5, -3]} size={0.8} speed={1.2} color="#00F0FF" />
      <GlassCube position={[1, 2.5, -4]} size={1.5} speed={0.5} color="#8B5CF6" />
      <GlassCube position={[-2, -1.5, -1]} size={0.6} speed={1.5} color="#00F0FF" />
      <GlassCube position={[2, 0, -5]} size={1} speed={0.7} color="#3B82F6" />
      
      {/* Particles */}
      <ParticleField count={300} />
      
      {/* Glowing orbs */}
      <GlowingOrb position={[-4, 2, -3]} color="#00F0FF" size={0.1} />
      <GlowingOrb position={[4, -1, -2]} color="#3B82F6" size={0.12} />
      <GlowingOrb position={[0, 3, -6]} color="#8B5CF6" size={0.08} />
      <GlowingOrb position={[-2, -2, -4]} color="#EC4899" size={0.1} />
      
      {/* Stars */}
      <Stars radius={50} depth={50} count={1000} factor={2} saturation={0} fade speed={1} />
      
      {/* Grid */}
      <HolographicGrid />
      
      {/* Camera movement */}
      <CameraRig />
    </>
  )
}

/* ── Exported Canvas ── */
const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1, 6], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default HeroScene
