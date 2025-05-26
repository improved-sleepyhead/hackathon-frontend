import Image from "next/image"

export const Devs = () => {
    return (
        <div className="flex items-center flex-col justify-center bg-white w-full relative">

            <h1 className="text-4xl md:text-6xl font-bold py-10 mt-10">
              Команда разработчиков
            </h1>
            <Image
                      src="/devs.png"
                      alt="Фон"
                      width={1920}
                      height={0}
                      priority
                      sizes="100vw"
                      className="w-fit h-auto object-cover"
            />
            <div className="bg-white h-[200px]">
                <p></p>
            </div>
            <div className="absolute inset-0 z-10 flex flex-col items-center mt-[440px] text-white text-center px-4">
                <div className="flex flex-col items-center w-3/5">
                    <p className="text-lg md:text-2xl mt-4 text-black">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
                    </p>
                </div>
            </div>
        </div>
    )
}