'use client'

import { Heart, Pause, Play } from 'lucide-react'
import { useState } from 'react'

export const MusicPlayer = () => {
	const [isPaused, setIsPaused] = useState(false)

	return (
		<div className="flex flex-col items-center gap-6">
			<div className="group relative min-h-[400px] w-full max-w-[400px] rounded-xl bg-primary transition-colors duration-150 hover:bg-primary/85">
				<div
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-primary p-5 text-primary-foreground opacity-0 transition-all duration-150 will-change-transform hover:scale-105 group-hover:opacity-100"
					onClick={() => setIsPaused(prev => !prev)}
				>
					<div className="relative p-4">
						<Pause
							className={`absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
								isPaused
									? 'scale-90 opacity-0'
									: 'scale-100 opacity-100'
							}`}
						/>
						<Play
							className={`absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
								isPaused
									? 'scale-100 opacity-100'
									: 'scale-90 opacity-0'
							}`}
						/>
					</div>
				</div>

				<div className="absolute bottom-0 right-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-primary p-4 text-primary-foreground opacity-0 transition-all duration-150 will-change-transform hover:scale-105 group-hover:opacity-100">
					<Heart size={20} />
				</div>
			</div>

			<div className="flex w-full max-w-[400px] flex-col gap-1">
				<h2 className="font-bold">Музыка</h2>
				<p className="text-sm font-medium text-primary/90">
					сгенерированная на основе ИИ и ваших предпочтений
				</p>
			</div>

			<div className="group flex w-full max-w-[400px] flex-col items-center">
				<div className="relative h-1 w-full rounded bg-primary/40">
					<div className="absolute h-1 w-full max-w-[100px] rounded bg-primary/80"></div>
				</div>

				<div className="mt-2 flex w-full justify-between">
					<h3 className="text-sm font-medium text-primary/90 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
						0:00
					</h3>
					<h3 className="text-sm font-medium text-primary/90 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
						4:20
					</h3>
				</div>
			</div>
		</div>
	)
}
