import { Avatar, AvatarFallback } from '@/shared/ui/kit/avatar'
import { cn } from '@/lib/utils'

interface UserAvatarProps {
	name: string
	email: string
	className?: string
	fallbackClassName?: string
}

export const UserAvatar = ({
	name,
	email,
	className,
	fallbackClassName
}: UserAvatarProps) => {
	if (!email) return null
	return (
		<div className="flex items-center gap-2">
			<Avatar
				className={cn(
					'size-5 items-center rounded-full border border-neutral-300 bg-neutral-300 transition',
					className
				)}
			>
				<AvatarFallback
					className={cn(
						'flex items-center justify-center bg-neutral-200 font-medium text-neutral-500',
						fallbackClassName
					)}
				>
					{email?.charAt(0).toUpperCase()}
				</AvatarFallback>
			</Avatar>
			<div className="flex w-fit items-center justify-center text-neutral-300">
				{name && <p className="text-sm font-medium">{name}</p>}
			</div>
		</div>
	)
}
