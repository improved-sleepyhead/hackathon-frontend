import Image from 'next/image'

export const Devs = () => {
	return (
		<div className="relative flex w-full flex-col items-center justify-center bg-white">
			<h1 className="mt-10 py-10 text-4xl font-bold md:text-6xl">
				Команда разработчиков
			</h1>
			<Image
				src="/devs.png"
				alt="Фон"
				width={1920}
				height={0}
				priority
				sizes="100vw"
				className="h-auto w-fit object-cover"
			/>
			<div className="h-[200px] bg-white">
				<p></p>
			</div>
			<div className="absolute inset-0 z-10 mt-[440px] flex flex-col items-center px-4 text-center text-white">
				<div className="flex w-3/5 flex-col items-center">
					<p className="mt-4 text-lg text-black md:text-2xl">
						Lorem Ipsum is simply dummy text of the printing and
						typesetting industry. Lorem Ipsum has been the
						industry's standard dummy text ever since the 1500s,
						when an unknown printer took a galley of type and
						scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into
						electronic typesetting, remaining essentially unchanged.
						It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages.
					</p>
				</div>
			</div>
		</div>
	)
}
