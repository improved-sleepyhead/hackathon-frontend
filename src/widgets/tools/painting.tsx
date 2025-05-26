export const Painting = () => {
	return (
		<div className="relative w-full max-w-4xl max-h-[500px] h-full mx-auto rounded-xl overflow-hidden shadow-xl group">
			<img
				src="/war.jpg"
				alt="Картина войны"
				className="w-full h-[500px] object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
			/>

			<div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 transition-all duration-500 group-hover:bg-black/30">
				<h2 className="text-3xl font-bold text-white mb-2 tracking-widest">
					Первый год войны
				</h2>
				<p className="text-white/80 text-sm max-w-xl">
					На картине изображены бойцы и их техника
				</p>
			</div>

			<div className="absolute top-4 left-4 bg-primary px-3 py-1 text-sm font-bold text-primary-foreground rounded shadow uppercase tracking-wider">
				1941 — Фронт
			</div>
		</div>
	)
}
