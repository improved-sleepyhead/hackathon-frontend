import { useMedia } from 'react-use'
import { Dialog, DialogContent } from './kit/dialog'

import { Drawer, DrawerContent } from './kit/drawer'

interface ResponsiveModalProps {
	children: React.ReactNode
	open: boolean
	onOpenChange: (open: boolean) => void
}

export const ResponsiveModal = ({
	children,
	open,
	onOpenChange
}: ResponsiveModalProps) => {
	const isDesktop = useMedia('(min-width: 1024px)', true)

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="hide-scrollbar max-h-[85vh] max-w-full overflow-y-auto overflow-x-hidden border-none sm:max-w-lg">
					{children}
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent>
				<div className="hide-scrollbar max-h-[85vh] overflow-y-auto">
					{children}
				</div>
			</DrawerContent>
		</Drawer>
	)
}
