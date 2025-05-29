'use client'

import { LetterPreview } from '@/widgets/tools/letter-preview'
import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Experience } from '@/widgets/tools/model/Experience'
import { UI } from '@/widgets/tools/model/UI'

export default function Page() {
	return (
		<div className="relative h-[90vh] w-screen">
			{/* <LetterPreview /> */}

			<UI />
			<Loader />
			<Canvas
				shadows
				dpr={[1, 2]}
				camera={{ position: [-0.5, 1, 4], fov: 45 }}
				gl={{ antialias: true }}
				onCreated={({ gl }) => {
					gl.setClearColor('#000000', 0)
				}}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%'
				}}
			>
				<Suspense fallback={null}>
					<Experience />
				</Suspense>
			</Canvas>
		</div>
	)
}
