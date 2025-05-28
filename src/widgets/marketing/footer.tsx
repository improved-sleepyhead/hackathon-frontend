import { Logo } from '@/shared/ui/logo'

export const Footer = () => {
	return (
		<footer className="bg-dark-main flex flex-col items-center px-4 py-6">
			<div className="flex w-full items-center gap-x-4">
				<div className="flex items-end justify-center">
					<Logo />
				</div>
				<div className="w-5/6 space-y-1">
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

			<div className="mt-8 text-center text-sm text-gray-500">
				Все права защищены ©NKTKLN
			</div>
		</footer>
	)
}
