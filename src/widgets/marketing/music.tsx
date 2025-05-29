import { data } from '@/widgets/marketing/constants/music-data'
import { Button } from '@/shared/ui/kit/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card"
import { ArrowRight, PlayIcon } from 'lucide-react'

export const Music = () => {
	return (
		<div className="bg-dark-main flex w-full flex-col items-center justify-center">
			<div className="mb-6 flex w-full flex-col">
				<div className="flex flex-col items-center justify-center px-4 text-center text-white">
					<div className="mt-24 flex w-1/2 flex-col items-center">
						<h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
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
						className="flex flex-col items-center justify-center overflow-hidden"
					>
						<Card className="w-[350px] h-[500px] bg-neutral-800/70 text-white flex flex-col">
							<CardHeader className="w-3/4">
								<CardTitle>Мелодии фронтовых лет</CardTitle>
								<CardDescription className="text-neutral-200">
								Музыка, вдохновлённая солдатскими письмами
								</CardDescription>
							</CardHeader>

							<div className="flex-1 flex flex-col justify-end">
								<CardContent className="w-2/3 self-start">
								<p className="text-xs">
									Когда звучат эти ноты — оживают письма с фронта. <br />
									Музыка, которая не смолкла даже через 80 лет.
								</p>
								</CardContent>
							</div>

							<CardFooter className="flex justify-between">
								<Button className="rounded-2xl" size="sm">
								Открыть в отдельном окне <ArrowRight />
								</Button>
								<Button
								size="icon"
								className="bg-white hover:bg-neutral-300 text-black"
								>
								<PlayIcon className="h-10 w-10" />
								</Button>
							</CardFooter>
						</Card>
					</div>
				))}
			</div>
			<div className="p-8">
				<Button variant="secondary">Смотреть все</Button>
			</div>
		</div>
	)
}
