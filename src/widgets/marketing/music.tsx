import Image from "next/image";
import { data } from "@/widgets/marketing/constants/music-data"
import { Button } from "@/shared/ui/kit/button";

export const Music = () => {
  return (
    <div className="flex flex-col bg-dark-main w-full items-center justify-center">
      <div className="flex flex-col w-full mb-6">
        <div className="flex flex-col items-center justify-center text-white text-center px-4">
          <div className="flex flex-col items-center w-1/2 mt-24">
            <h1 className="text-4xl md:text-6xl font-bold">
              Библиотека музыки
            </h1>
            <p className="text-lg md:text-2xl mt-4">
              Весь контент сгенерирован ИИ и не может быть использован в коммерчесвких целях
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-x-36 gap-y-12">
          {data.map((item, index) => (
            <div key={index} className="flex items-start justify-end flex-col rounded overflow-hidden">
              <Image
                src={item.image}
                alt="img"
                width={320}
                height={270}
                className="mb-4"
              />
            </div>
          ))}
        </div>
        <div className="p-8">
            <Button variant="secondary">
                Смотреть все
            </Button>
        </div>
    </div>
  );
};