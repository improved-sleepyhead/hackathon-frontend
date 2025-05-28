import { Button } from '@/shared/ui/kit/button'
import Image from 'next/image'

export const WhiteBlock = () => {
	return (
		<main className="relative flex w-full flex-col items-center overflow-hidden bg-white text-black">
			<section className="text relative z-20 mb-20 pt-10 text-center">
				<h1 className="text-7xl font-extrabold tracking-wide text-[#9d0b0f]">
					ЮБИЛЕЙ
				</h1>
				<div className="mt-4 flex flex-col items-center">
					<Image
						src="/laurel-icon.png"
						alt="80 лет"
						width={200}
						height={200}
					/>
				</div>
			</section>

			<section className="relative z-10 mb-[28vh] w-full px-4 lg:mb-[48vh] lg:px-24">
				<div className="pointer-events-none absolute left-0 top-[150px] z-0 w-full">
					<div className="relative w-full">
						<Image
							src="/line1.svg"
							alt="Пунктирная линия"
							width={100}
							height={100}
							className="mx-auto h-auto w-full"
						/>
						<Image
							src="/motorcicle.png"
							alt="Мотоцикл"
							width={500}
							height={300}
							className="absolute left-[50%] top-[-200px] z-10 md:left-[90%] md:top-[-250px]"
						/>
					</div>
				</div>
				<div className="flex flex-col-reverse gap-10 text-left lg:flex-row">
					<div className="">
						<h2 className="text-lg font-extralight md:text-3xl 2xl:text-5xl">
							<strong className="font-bold">
								80 лет Великой Победы
							</strong>{' '}
							<br /> От фронтовых писем — к вечному творчеству.
						</h2>
						<p className="mt-4 hidden max-w-[400px] text-gray-700 md:block md:text-lg 2xl:max-w-[650px] 2xl:text-3xl">
							От первых строк, написанных в окопах, до мощного
							культурного наследия — письма героев{' '}
							<strong>Великой Отечественной войны</strong>{' '}
							пронизаны человечностью.
						</p>
					</div>
				</div>
			</section>

			<section className="relative z-10 mb-96 w-full px-12 lg:px-24">
				<div className="pointer-events-none absolute left-0 top-[150px] z-0 w-full">
					<div className="relative w-full">
						<Image
							src="/line2.svg"
							alt="Пунктирная линия 2"
							width={1200}
							height={100}
							className="mx-auto w-full"
						/>
						<Image
							src="/dove-letter.png"
							alt="Голубь с письмом"
							width={470}
							height={470}
							className="absolute left-[-25%] top-[-170px] z-10 md:left-[-10%] md:top-[-170px]"
						/>
					</div>
				</div>

				<div className="flex w-full flex-col-reverse items-end justify-end gap-10 lg:flex-row">
					<div className="w-1/2 text-left">
						<h2 className="text-lg font-extralight md:text-3xl 2xl:text-5xl">
							<strong className="font-bold">Почта побед</strong>{' '}
							<br />
							как письма с фронта находили своих адресатов
						</h2>
						<p className="hidden max-w-[400px] text-gray-700 md:block md:text-lg 2xl:max-w-[650px] 2xl:text-2xl">
							В годы <strong>Великой Отечественной войны</strong>{' '}
							доставка писем с фронта была настоящим подвигом. С
							помощью авиации, полевой почты и связных письма
							пересекали тысячи километров.
						</p>
					</div>
				</div>
			</section>

			<section className="relative z-10 flex flex-col gap-12 px-4 py-16 text-center lg:px-24">
				<div className="flex flex-col items-center justify-center gap-24 md:flex-row">
					<div className="flex flex-col items-center">
						<Image
							src="/letter1st.png"
							alt="Письмо родным"
							width={280}
							height={350}
							className="mx-auto"
						/>
						<p className="mt-2 text-base text-gray-500">
							Ленинград, 1942
						</p>
						<h3 className="text-lg font-semibold">Письмо родным</h3>
						<p className="text-sm text-gray-400">
							Иванов Иван Иванович
						</p>
						<Button className="mt-2 h-8 bg-[#9d0b0f] text-white hover:bg-[#5a1a1c]">
							Читать
						</Button>
					</div>

					<div className="flex flex-col items-center">
						<Image
							src="/letter2nd.png"
							alt="Письмо матери"
							width={320}
							height={390}
							className="mx-auto"
						/>
						<p className="mt-2 text-base text-gray-500">
							Москва, 1941
						</p>
						<h3 className="text-lg font-semibold">Письмо матери</h3>
						<p className="text-sm text-gray-400">
							Иванов Иван Иванович
						</p>
						<Button className="mt-2 h-8 bg-[#9d0b0f] text-white hover:bg-[#5a1a1c]">
							Читать
						</Button>
					</div>
				</div>

				<div className="mt-36 flex flex-col items-center justify-center gap-6 xl:flex-row xl:items-end">
					<Image
						src="/book.png"
						alt="Тетрадь 1945"
						width={800}
						height={850}
						className="h-auto"
					/>
					<div className="mb-24 text-center xl:text-left">
						<p className="text-base text-gray-500">30 июня 1945</p>
						<h3 className="text-xl font-semibold">
							Тетрадь из 1945-го
						</h3>
						<Button className="mt-2 h-8 bg-[#9d0b0f] text-white hover:bg-[#5a1a1c]">
							Читать
						</Button>
					</div>
				</div>
			</section>
		</main>
	)
}
