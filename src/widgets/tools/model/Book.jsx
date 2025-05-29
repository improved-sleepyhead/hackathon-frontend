'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { pageAtom, pages } from './UI'
import {
	Bone,
	BoxGeometry,
	Float32BufferAttribute,
	Skeleton,
	SkinnedMesh,
	Uint16BufferAttribute,
	Vector3,
	MeshStandardMaterial,
	Color,
	SkeletonHelper,
	SRGBColorSpace,
	MathUtils
} from 'three'
import { useCursor, useHelper, useTexture, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { degToRad } from 'three/src/math/MathUtils'
import { useAtom } from 'jotai'
import { easing } from 'maath'
import { generateTextTexture } from './lib/textureGenerator'

const lerpFactor = 0.01 // скорость поворота страницы (линейная)
const easingFactor = 0.5 // скорость поворота страницы
const easingFactorFold = 0.3
const insideCurveStrength = 0.15
const outsideCurveStrength = 0.05
const turningCurveStrength = 0.09

const PAGE_WIDTH = 1.0
const PAGE_HEIGHT = 1.4
const PAGE_DEPTH = 0.003
const PAGE_SEGMENTS = 30
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS

const pageGeometry = new BoxGeometry(
	PAGE_WIDTH,
	PAGE_HEIGHT,
	PAGE_DEPTH,
	PAGE_SEGMENTS,
	2
)

pageGeometry.translate(PAGE_WIDTH / 2, 0, 0)

const position = pageGeometry.attributes.position
const vertex = new Vector3()
const skinIndexes = []
const skinWeights = []

for (let i = 0; i < position.count; i++) {
	vertex.fromBufferAttribute(position, i) // get the vertex ;
	const x = vertex.x

	const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH))
	let skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH

	skinIndexes.push(skinIndex, skinIndex + 1, 0, 0) // 2 bones in use;
	skinWeights.push(1 - skinWeight, skinWeight, 0, 0)
}

pageGeometry.setAttribute(
	'skinIndex',
	new Uint16BufferAttribute(skinIndexes, 4)
)

pageGeometry.setAttribute(
	'skinWeight',
	new Float32BufferAttribute(skinWeights, 4)
)

const whiteColor = new Color('white')
const emissiveColor = new Color('orange')

const pageMaterials = [
	new MeshStandardMaterial({
		color: whiteColor,
		roughness: 0.8
	}),
	new MeshStandardMaterial({
		color: '#111', // Цвет переплета
		roughness: 0.7
	}),
	new MeshStandardMaterial({
		color: whiteColor,
		roughness: 0.8
	}),
	new MeshStandardMaterial({
		color: whiteColor,
		roughness: 0.8
	}),
	new MeshStandardMaterial({
		color: whiteColor,
		roughness: 0.8
	}),
	new MeshStandardMaterial({
		color: whiteColor,
		roughness: 0.8
	})
]

pages.forEach(page => {
	useTexture.preload(`/textures/${page.front}.jpg`)
	useTexture.preload(`/textures/${page.back}.jpg`)
})

const Page = ({
	number,
	front,
	back,
	frontText,
	backText,
	page,
	opened,
	bookClosed,
	...props
}) => {
	const [picture, picture2, pictureRoughness] = useTexture([
		'/textures/book-cover.jpg',
		'/textures/book-back.jpg',
		'/textures/page.png'
	])

	picture.colorSpace = picture2.colorSpace = SRGBColorSpace

	// Generate text textures
	const frontTextTexture = useMemo(() => {
		if (!frontText) return null
		return generateTextTexture(frontText)
	}, [frontText])

	const backTextTexture = useMemo(() => {
		if (!backText) return null
		return generateTextTexture(backText)
	}, [backText])

	const group = useRef()
	// для анимаций
	const turnedAt = useRef(0)
	const lastOpened = useRef(opened)

	const skinnedMeshRef = useRef()

	const manualSkinnedMesh = useMemo(() => {
		const bones = []
		let prevBone = null

		for (let i = 0; i <= PAGE_SEGMENTS; i++) {
			const bone = new Bone()
			bone.position.x = i === 0 ? 0 : SEGMENT_WIDTH
			if (prevBone) {
				prevBone.add(bone)
			}
			bones.push(bone)
			prevBone = bone
		}

		const skeleton = new Skeleton(bones)
		const materials = Array(6)
			.fill(null)
			.map(
				() =>
					new MeshStandardMaterial({
						color: whiteColor,
						roughness: 0.8,
						emissive: whiteColor,
						emissiveIntensity: 0
					})
			)

		// Front material
		materials[4] = new MeshStandardMaterial({
			map: frontText ? frontTextTexture : null,
			color: whiteColor,
			roughness: 0.8,
			emissive: whiteColor,
			emissiveIntensity: 0
		})

		// Back material
		materials[5] = new MeshStandardMaterial({
			map: backText ? backTextTexture : null,
			color: whiteColor,
			roughness: 0.8,
			emissive: whiteColor,
			emissiveIntensity: 0
		})

		const mesh = new SkinnedMesh(pageGeometry, materials)
		mesh.castShadow = true
		mesh.receiveShadow = true
		mesh.frustumCulled = false
		mesh.add(skeleton.bones[0])
		mesh.bind(skeleton)

		return mesh
	}, [frontTextTexture, backTextTexture])

	// показывает все сегменты
	// useHelper(skinnedMeshRef, SkeletonHelper, "red");

	useFrame((_, delta) => {
		if (!group.current || !manualSkinnedMesh?.skeleton?.bones) return

		const bones = manualSkinnedMesh.skeleton.bones
		let turningTime = Math.min(400, new Date() - turnedAt.current) / 400
		turningTime = Math.sin(turningTime * Math.PI)

		let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2
		if (!bookClosed) {
			targetRotation += degToRad(number * 0.8)
		}

		for (let i = 0; i < bones.length; i++) {
			const target = i === 0 ? group.current : bones[i]
			const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0
			const outsideCurveIntensity = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0
			let turningIntensity =
				Math.sin(i * Math.PI * (1 / bones.length)) * turningTime

			let rotationAngle =
				insideCurveStrength * insideCurveIntensity * targetRotation -
				outsideCurveStrength * outsideCurveIntensity * targetRotation +
				turningCurveStrength * turningIntensity * targetRotation

			let foldRotationAngle = degToRad(Math.sign(targetRotation) * 2)

			if (bookClosed) {
				if (i === 0) {
					rotationAngle = targetRotation
					foldRotationAngle = 0
				} else {
					rotationAngle = 0
				}
			}

			easing.dampAngle(
				target.rotation,
				'y',
				rotationAngle,
				easingFactor,
				delta
			)

			const foldIntensity =
				i > 8
					? Math.sin(i * Math.PI * (1 / bones.length) - 0.5) *
						turningTime
					: 0
			easing.dampAngle(
				target.rotation,
				'x',
				foldRotationAngle * foldIntensity,
				easingFactorFold,
				delta
			)
		}

		if (lastOpened.current !== opened) {
			turnedAt.current = +new Date()
			lastOpened.current = opened
		}
	})

	const [_, setPage] = useAtom(pageAtom)
	const [highlighted, setHighlighted] = useState(false)
	useCursor(highlighted)

	return (
		<group
			{...props}
			ref={group}
			onPointerEnter={e => {
				e.stopPropagation()
				setHighlighted(true)
			}}
			onPointerLeave={e => {
				e.stopPropagation()
				setHighlighted(false)
			}}
			onClick={e => {
				e.stopPropagation()
				setPage(opened ? number : number + 1)
				setHighlighted(false)
			}}
		>
			<primitive
				object={manualSkinnedMesh}
				ref={skinnedMeshRef}
				position-z={-number * PAGE_DEPTH + page * PAGE_DEPTH}
			/>
		</group>
	)
}

export const Book = ({ ...props }) => {
	const [page] = useAtom(pageAtom)
	const [delayedPage, setDelayedPage] = useState(page)

	useEffect(() => {
		let timeout

		const goToPage = () => {
			setDelayedPage(delayedPage => {
				if (page === delayedPage) {
					return delayedPage
				} else {
					timeout = setTimeout(
						() => {
							goToPage()
						},
						Math.abs(page - delayedPage) > 2 ? 50 : 150
					)

					if (page > delayedPage) {
						return delayedPage + 1
					}
					if (page < delayedPage) {
						return delayedPage - 1
					}
				}
			})
		}
		goToPage()
		return () => {
			clearTimeout(timeout)
		}
	}, [page])

	return (
		<group {...props} rotation-y={-Math.PI / 2}>
			{[...pages].map((pageData, index) => (
				<Page
					key={index}
					page={delayedPage}
					number={index}
					opened={delayedPage > index}
					bookClosed={
						delayedPage === 0 || delayedPage === pages.length
					}
					{...pageData}
				/>
			))}
		</group>
	)
}

useGLTF.preload('/models/book.glb')
