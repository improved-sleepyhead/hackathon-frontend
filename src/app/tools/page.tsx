'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/shared/ui/kit/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/shared/ui/kit/form'
import { Textarea } from '@/shared/ui/kit/textarea'
import { toast } from 'sonner'
import {
	Scale3d,
	AudioLines,
	Image,
	Bold,
	Italic,
	Underline
} from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/kit/toggle-group'

const TOOLS = [
	{
		id: 1,
		icon: <Scale3d />,
		tooltip: 'Модель книги с Вашими историями',
		title: 'model',
		isLink: false
	},
	{
		id: 2,
		icon: <AudioLines />,
		tooltip: 'Музыка на основе Ваших запросов',
		title: 'music',
		isLink: false
	},
	{
		id: 3,
		icon: <Image />,
		tooltip: 'Картинка на основе Ваших предпочтений',
		title: 'image',
		isLink: false
	}
]

const FormSchema = z.object({
	bio: z
		.string()
		.min(10, { message: 'Bio must be at least 10 characters.' })
		.max(160, { message: 'Bio must not be longer than 160 characters.' }),
	type: z
		.array(z.string())
		.min(1, { message: 'Выберите хотя бы один инструмент' })
})

export default function Page() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			bio: '',
			type: []
		}
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast('Успешно')
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mx-auto w-full max-w-4xl space-y-6 bg-secondary p-16"
			>
				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-xl font-medium">
								Пожелания к истории
							</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Хочется прочитать трогательную историю о доблести и чести солдата"
									className="max-h-[300px] min-h-[300px] w-full max-w-[400px] resize-none"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-xl font-medium">
								Инструменты
							</FormLabel>
							<ToggleGroup
								type="multiple"
								variant="outline"
								className="justify-start"
								value={field.value}
								onValueChange={field.onChange}
							>
								{TOOLS.map(tool => (
									<ToggleGroupItem
										key={tool.id}
										value={tool.title}
										aria-label={tool.tooltip}
										className="p-6"
									>
										{tool.icon}
									</ToggleGroupItem>
								))}
							</ToggleGroup>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}
