import Image from 'next/image'

export const Soldier = () => {
	return (
		<div className="relative h-screen w-full">
			<Image
				src="/soldier.png"
				alt="Фон"
				fill
				priority
				sizes="100vw"
				className="object-cover"
			/>

			<div className="absolute inset-0 z-10 mt-28 flex flex-col items-center px-4 text-center text-white">
				<div className="flex w-3/5 flex-col items-center">
					<h1 className="text-shadow text-4xl font-bold md:text-6xl">
						Оживи письма с фронта
					</h1>
					<p className="text-shadow mt-4 text-lg md:text-2xl">
						Создавайте истории, картины и музыку, вдохновленные
						подлинными письмами героев Великой Отечественной войны
					</p>
				</div>
			</div>
		</div>
	)
}
