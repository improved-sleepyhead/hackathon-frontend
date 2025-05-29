export function MessageUser() {
	return (
		<div className="flex items-center justify-end gap-4">
			<div className="max-w-2xl rounded-xl bg-gray-800 p-4 shadow-sm">
				<p className="text-gray-100">
					Создай план наступления для 3-й танковой дивизии
				</p>
			</div>
			<div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 p-1.5 text-gray-100">
				<span className="text-xs font-bold">YOU</span>
			</div>
		</div>
	)
}
