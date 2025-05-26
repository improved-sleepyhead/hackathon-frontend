import Image from "next/image";

export const Soldier = () => {
    return (
        <div className="relative w-full h-screen">
            <Image
                src="/soldier.png"
                alt="Фон"
                fill
                priority
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 z-10 flex flex-col items-center mt-28 text-white text-center px-4">
                <div className="flex flex-col items-center w-3/5">
                    <h1 className="text-4xl md:text-6xl font-bold text-shadow">Оживи письма с фронта</h1>
                    <p className="text-lg md:text-2xl mt-4 text-shadow">
                        Создавайте истории, картины и музыку, вдохновленные подлинными письмами героев Великой Отечественной войны
                    </p>
                </div>
            </div>
        </div>
    );
};