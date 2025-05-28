import Image from 'next/image'
import { data } from '@/widgets/marketing/constants/cards-data'
import { UserAvatar } from '@/features/user/components/user-avatar'
import { Button } from '@/shared/ui/kit/button'

export const Galary = () => {
	return (
		<div className="bg-red-main flex w-full flex-col items-center justify-center">
			<div className="relative flex w-full flex-col bg-white">
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
					<div className="mt-20 flex w-full flex-col items-center md:mt-24">
						<h2 className="text-xl font-bold md:text-4xl">
							Галерея
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
	)
}
