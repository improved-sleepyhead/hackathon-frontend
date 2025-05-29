export function ChatItem({
	id,
	title,
	date,
	isSelected,
	onSelect
}: {
	id: number
	title: string
	date: string
	isSelected: boolean
	onSelect: (id: number) => void
}) {
	return (
		<div
			onClick={() => onSelect(id)}
			className={`cursor-pointer rounded-lg p-4 transition-all ${
				isSelected ? 'bg-blue-200' : 'hover:bg-gray-100'
			}`}
		>
			<h3 className="font-medium text-gray-800">{title}</h3>
			<p className="mt-1 text-sm text-gray-500">{date}</p>
		</div>
	)
}
