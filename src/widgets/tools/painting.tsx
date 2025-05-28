export const Painting = () => {
	return (
		<div className="group relative mx-auto h-full max-h-[500px] w-full max-w-4xl overflow-hidden rounded-xl shadow-xl">
			<img
				src="/war.jpg"
				alt="Картина войны"
				className="h-[500px] w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
			/>

			<div className="absolute inset-0 flex flex-col justify-end bg-black/50 p-6 transition-all duration-500 group-hover:bg-black/30">
				<h2 className="mb-2 text-3xl font-bold tracking-widest text-white">
					Первый год войны
				</h2>
				<p className="max-w-xl text-sm text-white/80">
					На картине изображены бойцы и их техника
				</p>
			</div>

			<div className="absolute left-4 top-4 rounded bg-primary px-3 py-1 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow">
				1941 — Фронт
			</div>
		</div>
	)
}
