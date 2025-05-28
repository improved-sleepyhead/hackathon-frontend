import Image from 'next/image'
import { data } from '@/widgets/marketing/constants/music-data'
import { Button } from '@/shared/ui/kit/button'

export const Music = () => {
	return (
		<div className="bg-dark-main flex w-full flex-col items-center justify-center">
			<div className="mb-6 flex w-full flex-col">
				<div className="flex flex-col items-center justify-center px-4 text-center text-white">
					<div className="mt-24 flex w-1/2 flex-col items-center">
						<h2 className="text-xl font-bold md:text-4xl">
							Библиотека музыки
						</h2>
						<p className="md:text-md mt-4 text-sm text-white/70">
							Весь контент сгенерирован ИИ и не может быть
							использован в коммерчесвких целях
						</p>
					</div>
				</div>
			</div>
			<div className="mt-10 grid grid-cols-1 gap-x-24 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
				{data.map((item, index) => (
					<div
						key={index}
						className="flex flex-col items-start justify-end overflow-hidden rounded"
					>
						<Image
							src={item.image}
							alt="img"
							width={320}
							height={270}
							className="mb-4"
						/>
					</div>
				))}
			</div>
			<div className="p-8">
				<Button variant="secondary">Смотреть все</Button>
			</div>
		</div>
	)
}
