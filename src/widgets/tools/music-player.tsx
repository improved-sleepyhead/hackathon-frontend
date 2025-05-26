'use client'

import { Heart, Pause, Play } from 'lucide-react'
import { useState } from 'react'

export default function MusicPlayer() {
	const [isPaused, setIsPaused] = useState(false)

	return (
		<div className="flex flex-col items-center gap-6">
			<div className="group bg-primary min-h-[400px] w-full max-w-[400px] rounded-xl hover:bg-primary/85 transition-colors duration-150 relative">
				<div
					className="rounded-full left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 absolute bg-primary p-5 text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-150 hover:scale-105 will-change-transform cursor-pointer"
					onClick={() => setIsPaused(prev => !prev)}
				>
					<div className="relative p-4">
						<Pause
							className={`absolute inset-0 transition-all duration-200  left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 ${
								isPaused ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
							}`}
						/>
						<Play
							className={`absolute inset-0 transition-all duration-200 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 ${
								isPaused ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
							}`}
						/>
					</div>
				</div>

				<div className="rounded-full right-0 bottom-0 -translate-y-1/2 -translate-x-1/2 absolute bg-primary p-4 text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-150 hover:scale-105 will-change-transform cursor-pointer">
					<Heart size={20} />
				</div>
			</div>

			<div className="flex flex-col gap-1 w-full max-w-[400px]">
				<h2 className="font-bold">Музыка</h2>
				<p className="text-sm font-medium text-primary/90">
					сгенерированная на основе ИИ и ваших предпочтений
				</p>
			</div>

			<div className="w-full max-w-[400px] flex flex-col items-center group">
				<div className="w-full bg-primary/40 h-1 rounded relative">
					<div className="max-w-[100px] bg-primary/80 h-1 rounded absolute w-full"></div>
				</div>

				<div className="mt-2 w-full flex justify-between">
					<h3 className="opacity-0 group-hover:opacity-100 text-primary/90 font-medium text-sm transition-opacity duration-150">
						0:00
					</h3>
					<h3 className="opacity-0 group-hover:opacity-100 text-primary/90 font-medium text-sm transition-opacity duration-150">
						4:20
					</h3>
				</div>
			</div>
		</div>
	)
}
