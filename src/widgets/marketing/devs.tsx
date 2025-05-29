"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/kit/accordion"
import { Button } from "@/shared/ui/kit/button"
import Image from "next/image"
import { data } from '@/widgets/marketing/constants/devs'
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { useFeedbackModal } from "@/shared/stores/hooks/use-feedback-modal";

export const Devs = () => {
	const { open } = useFeedbackModal()
	return (
		<div className="relative flex w-full flex-col items-center justify-center bg-white">
			<div className="mt-12 flex w-1/2 flex-col items-center">
				<h2 className="text-3xl font-bold md:text-4xl lg:text-5xl text-center">
					Команда<br/>разработчиков
				</h2>
				<p className="md:text-md mt-4 text-sm text-white/70">
					Весь контент сгенерирован ИИ и не может быть
					использован в коммерчесвких целях
				</p>
			</div>
			<div className="flex items-center justify-center w-4/5 mb-12 lg:mt-12">
				<Accordion
					type="single"
					collapsible
					className="w-full"
					defaultValue="item-1"
					>
					{data.map((dev) => (
						<AccordionItem key={dev.id} value={dev.id} className="my-6">
						<AccordionTrigger className="text-xl font-bold md:text-2xl lg:text-3xl">
							<div className="flex items-center justify-center gap-x-4">
							<Image
								src={dev.image}
								alt={dev.name}
								width={70}
								height={70}
								loading="lazy"
								className="h-auto object-cover rounded-full"
							/>
							<h1>{`${dev.name} - ${dev.role}`}</h1>
							</div>
						</AccordionTrigger>
						<AccordionContent className="text-base md:text-lg lg:text-xl">
							<div className="flex flex-col justify-center gap-y-4">
								{dev.description}
								<div className="flex flex-row items-center">
									<GithubIcon />
									<Link href={dev.link} className="text-sm">
										{dev.link_name}
									</Link>
								</div>
							</div>
						</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
			<div className="flex items-center justify-center mb-12" onClick={() => open()}>
				<Button>Связаться с нами</Button>
			</div>
		</div>
	)
}
