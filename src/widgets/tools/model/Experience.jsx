'use client'

import { Environment, Float, OrbitControls } from '@react-three/drei'
import { Book } from './Book'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

export const Experience = () => {
	const { camera } = useThree()

	useEffect(() => {
		// Set initial camera position for better view
		camera.position.set(2, 1.5, 4)
		camera.fov = 45
		camera.updateProjectionMatrix()
	}, [camera])

	return (
		<>
			<color attach="background" args={['#E67E00']} />

			{/* Adjusted Float component for better positioning */}
			<Float
				rotation={[0, 0, 0]}
				position={[0, 0, 0]}
				speed={2}
				floatIntensity={1}
				rotationIntensity={1}
			>
				<Book scale={[1, 1, 1]} />
			</Float>

			<OrbitControls
				enablePan={false}
				minPolarAngle={Math.PI / 4}
				maxPolarAngle={Math.PI / 1.5}
				minDistance={3}
				maxDistance={6}
				target={[0, 0, 0]}
			/>
			<Environment preset="studio" intensity={0.3} />

			{/* Improved lighting setup */}
			<directionalLight
				position={[2, 5, 2]}
				intensity={0.5}
				castShadow
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
			/>
			<ambientLight intensity={0.3} />
		</>
	)
}
