'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/shared/ui/kit/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/shared/ui/kit/card'
import { Input } from '@/shared/ui/kit/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/shared/ui/kit/form'
import { AuthForm } from '@/shared/api/types/auth.types'
import { authService } from '@/shared/api/services/auth.service'
import { cn } from '@/lib/utils'
import { useUserEmail } from '@/shared/stores/hooks/use-user-email'
import { Separator } from '@/shared/ui/kit/separator'

const formSchema = z.object({
    name: z.string().trim().min(1, 'Необходимое поле'),
	email: z.string().trim().min(1, 'Необходимое поле').email('Неверный email'),
	text: z.string().min(1, 'Необходимое поле')
})

interface FeedbackFormProps {
	onCancel?: () => void
}

export const FeedbackForm = ({ onCancel }: FeedbackFormProps) => {
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
            name: '',
			email: '',
			text: '',
		}
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		// const promise = .then(() => {
		// 	form.reset()
		// 	onCancel?.()
		// })

		// toast.promise(promise, {
		// 	loading: 'Отправка...',
		// 	success: 'Успешно отправлено!',
		// 	error: error => error?.response?.data?.message || 'Ошибка отправки'
		// })
	}

	const isLoading = form.formState.isSubmitting

	return (
		<Card className="relative h-full w-full border-none shadow-none md:w-[487px]">
			<CardHeader className="flex items-center justify-center p-7 text-center">
				<CardTitle className="text-2xl">
					Связаться с нами
				</CardTitle>
				<CardDescription>
					Мы учтем все Ваши пожелания
				</CardDescription>
			</CardHeader>
			<div className="mb-7 px-7">
				<Separator />
			</div>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							name="email"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type="email"
											placeholder="Введите email"
											autoFocus={false}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="text"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type="code"
											placeholder="Ваши пожелания"
											autoFocus={true}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex h-full w-full items-center gap-x-4">
							<Button
								type="button"
								size="lg"
								variant="secondary"
								onClick={onCancel}
								disabled={isLoading}
								className={cn(
									!onCancel && 'invisible',
									'w-full'
								)}
							>
								Отмена
							</Button>
							<Button
								type="submit"
								disabled={isLoading}
								size="lg"
								className="w-full"
							>
								{isLoading ? 'Загрузка...' : 'Отправить'}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
