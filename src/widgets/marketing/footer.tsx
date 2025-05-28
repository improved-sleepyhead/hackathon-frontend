import { Button } from '@/shared/ui/kit/button'
import { Logo } from '@/shared/ui/logo'

export const Footer = () => {
	return (
		<footer className="bg-dark-main flex flex-col items-center px-4 py-6 w-full">
			<div className="flex w-full items-center justify-between gap-x-2">
				<div className="flex items-end justify-center px-8">
					<Logo />
				</div>
				<div className='lg:hidden'>
					<Button variant="link" className="text-neutral-400 text-sm md:text-lg">
						Пользовательское соглашение
					</Button>
				</div>
				<div className="w-5/6 space-y-1 hidden lg:block">
					<p className="text-sm text-neutral-400">
						Пользовательское уведомление о точности исторических
						данных
					</p>
					<p className="text-sm text-neutral-500">
						Содержание, генерируемое искусственным интеллектом на
						этой странице, носит информационный характер и может не
						полностью соответствовать историческим или научно
						подтверждённым фактам. Мы стремимся предоставлять
						достоверную информацию, однако ИИ-системы имеют
						ограничения в интерпретации и воспроизведении точных
						исторических событий. Пожалуйста, используйте
						предоставленные данные с критической оценкой и при
						необходимости обращайтесь к авторитетным источникам.
					</p>
				</div>
			</div>

			<div className="mt-8 text-center text-sm text-neutral-400">
				Все права защищены ©NKTKLN
			</div>
		</footer>
	)
}
