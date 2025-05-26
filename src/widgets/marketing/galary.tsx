import Image from "next/image";
import { data } from "@/widgets/marketing/constants/cards-data"
import { UserAvatar } from "@/features/user/components/user-avatar";
import { Button } from "@/shared/ui/kit/button";

export const Galary = () => {
  return (
    <div className="flex flex-col bg-red-main w-full items-center justify-center">
      <div className="flex flex-col bg-white w-full relative">
        <Image
          src="/line3.png"
          alt="Фон"
          width={1920}
          height={0}
          priority
          sizes="100vw"
          className="w-fit h-auto object-cover"
        />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center px-4">
          <div className="flex flex-col items-center w-1/3 mt-24">
            <h1 className="text-4xl md:text-6xl font-bold">
              Галерея
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
                alt={item.title}
                width={250}
                height={170}
                className="w-full mb-4"
              />
            <div className="flex flex-col text-left gap-y-2">
                <div>
                    <h3 className="font-bold text-white text-xl mb-2">{item.title}</h3>
                    <p className="text-neutral-300 text-base">{item.description}</p>
                </div>
                    <UserAvatar className="size-8" fallbackClassName="text-base" email={item.authorEmail} name={item.author}/>
                    <p className="text-neutral-300 text-sm">{item.date}</p>
                </div>
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