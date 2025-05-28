'use client'

import { z } from 'zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { authService } from '@/shared/api/services/auth.service'
import { MailForm } from '@/shared/api/types/auth.types'
import { useLoginModal } from '@/shared/stores/hooks/use-login-modal'
import { Separator } from '@/shared/ui/kit/separator'
import { useUserEmail } from '@/shared/stores/hooks/use-user-email'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
	email: z.string().email('Неверный email')
})

export const EmailEnterCard = () => {
	const { open } = useLoginModal()
	const { setEmail } = useUserEmail()
	const router = useRouter()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: ''
		}
	})

	const onGuestSubmit = async () => {
		const promise = authService.guestLogin().then(() => {
			router.push('/')
		})

		toast.promise(promise, {
			loading: 'Вход в систему...',
			success: 'Успешный вход!',
			error: error => error?.response?.data?.message || 'Ошибка входа'
		})
	}

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const promise = authService.main(values as MailForm).then(() => {
			setEmail(values.email)
			form.reset()
			open()
		})

		toast.promise(promise, {
			loading: 'Отправка кода на почту...',
			success: 'Код успешно отправлен!',
			error: error =>
				error?.response?.data?.message ||
				'Ошибка отправки кода на почту'
		})
	}

	const isLoading = form.formState.isSubmitting

	return (
		<Card className="h-full w-full border-none shadow-none md:w-[487px]">
			<CardHeader className="flex items-center justify-center text-center">
				<CardTitle className="text-2xl">Регистрация</CardTitle>
				<CardDescription>
					Регистрируясь, вы принимаете нашу{' '}
					<Link href="/privacy">
						<span className="text-blue-700">
							Политику Конфиденциальности
						</span>{' '}
					</Link>
					и{' '}
					<Link href="/terms">
						<span className="text-blue-700">
							Условия Пользования
						</span>
					</Link>
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
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							disabled={isLoading}
							size="lg"
							className="w-full"
						>
							{isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
						</Button>
						<div className="mb-7 px-7">
							<Separator />
						</div>
						<CardContent className="flex items-center text-sm">
							<Button
								variant="ghost"
								className="hover:bg-transparent"
								onClick={onGuestSubmit}
								type="button"
							>
								<span className="px-2 text-sm text-blue-700">
									Войти как гость
								</span>
							</Button>
							<p>(Количество генераций контента ограничено)</p>
						</CardContent>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
