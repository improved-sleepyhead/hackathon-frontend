import Image from 'next/image'
import { data } from '@/widgets/marketing/constants/cards-data'
import { UserAvatar } from '@/features/user/components/user-avatar'
import { Button } from '@/shared/ui/kit/button'

export const Gallery = () => {
	return (
		<div className="flex flex-col items-center justify-center w-full">
			<div className="relative flex w-full flex-col">
				<Image
					src="/line3.png"
					alt="Фон"
					width={1920}
					height={0}
					loading="lazy"
					sizes="100vw"
					className="h-auto w-full object-cover"
				/>

				<div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white">
					<div className="mt-20 flex w-2/3 flex-col items-center md:mt-24">
						<h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
							Галерея
						</h2>
						<p className="md:text-md mt-4 text-sm text-white/70">
							Весь контент сгенерирован ИИ и не может быть
							использован в коммерчесвких целях
						</p>
					</div>
				</div>
			</div>
		<div className="bg-red-main -mt-1 flex w-full flex-col items-center justify-center">
			<div className="mt-20 md:mt-12 lg:mt-2 grid grid-cols-1 gap-x-24 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
				{data.map((item, index) => (
					<div
						key={index}
						className="flex flex-col items-start justify-end overflow-hidden rounded"
					>
						<Image
							src={item.image}
							alt={item.title}
							width={250}
							height={170}
							className="mb-4 w-full"
						/>
						<div className="flex flex-col gap-y-2 text-left">
							<div>
								<h3 className="mb-2 text-xl font-bold text-white">
									{item.title}
								</h3>
								<p className="text-base text-neutral-300">
									{item.description}
								</p>
							</div>
							<UserAvatar
								className="size-8"
								fallbackClassName="text-base"
								email={item.authorEmail}
								name={item.author}
							/>
							<p className="text-sm text-neutral-300">
								{item.date}
							</p>
						</div>
					</div>
				))}
			</div>
			<div className="p-8">
				<Button variant="secondary">Смотреть все</Button>
			</div>
		</div>
		</div>
	)
}
