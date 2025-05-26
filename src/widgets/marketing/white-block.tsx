import { Button } from "@/shared/ui/kit/button";
import Image from "next/image";

export const WhiteBlock = () => {
  return (
    <main className="bg-white text-black relative overflow-hidden">
      <section className="text text-center py-10 relative z-20">
        <h1 className="text-[#9d0b0f] text-7xl font-extrabold tracking-wide">ЮБИЛЕЙ</h1>
        <div className="mt-4 flex flex-col items-center">
          <Image src="/laurel-icon.png" alt="80 лет" width={200} height={200} />
        </div>
      </section>

      <div className="absolute top-[450px] left-0 w-full z-0 mt-36 pointer-events-none">
        <Image
          src="/line1.svg"
          alt="Пунктирная линия"
          width={1200}
          height={100}
          className="w-full h-auto mx-auto"
        />
      </div>

      <section className="relative px-4 lg:px-24 -mt-24 z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 pt-64">
            <h2 className="text-3xl font-bold">
              80 лет Великой Победы: от фронтовых писем — к вечному творчеству.
              Сохраняем память через историю, музыку и искусство
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              От первых строк, написанных в окопах, до мощного культурного
              наследия — письма героев Великой Отечественной войны пронизаны
              человечностью. Современные художники и поэты черпают вдохновение
              в этих словах, превращая живые эмоции прошлого в современные
              произведения.
            </p>
          </div>
          <div className="lg:w-1/2 flex ml-46 justify-center relative z-20">
            <Image
              src="/motorcicle.png"
              alt="Мотоцикл"
              width={500}
              height={300}
              className="relative z-20 -mt-10"
            />
          </div>
        </div>
      </section>

      <div className="absolute top-[1000px] left-0 w-full z-0 pointer-events-none">
        <Image
          src="/line2.svg"
          alt="Пунктирная линия 2"
          width={1200}
          height={100}
          className="w-full h-auto mx-auto"
        />
      </div>

      <section className="relative mt-24 -ml-48 px-4 lg:px-24 z-10 ">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 flex justify-center relative z-20">
            <Image
              src="/dove-letter.png"
              alt="Голубь с письмом"
              width={470}
              height={470}
              className="relative z-20 mt-12"
            />
          </div>
          <div className="lg:w-1/2 pb-24">
            <h2 className="text-3xl font-bold">
              Почта Победы: как письма с фронта находили своих адресатов
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              В годы Великой Отечественной войны доставка писем с фронта была
              настоящим подвигом. С помощью авиации, полевой почты и связных
              письма и в зону боёв, и обратно пересекали тысячи километров. В
              проекте были восстановлены более 6 миллионов писем, некоторые из
              которых доступны здесь не только для прочтения, но и для создания
              уникального контента.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 lg:px-24 flex flex-col gap-12 text-center relative z-10">
        <div className="grid grid-rows-1 md:grid-cols-2 ">
        <div>
          <Image
            src="/letter1st.png"
            alt="Письмо родным"
            width={280}
            height={350}
            className="mx-auto"
          />
          <p className="mt-2 text-base text-gray-500">Ленинград, 1942</p>
          <h3 className="font-semibold text-lg">Письмо родным</h3>
          <p className="text-sm text-gray-400">Иванов Иван Иванович</p>
          <Button className="mt-2 bg-[#9d0b0f] hover:bg-[#5a1a1c] text-white h-8">
            Читать
          </Button>
        </div>

        <div>
          <Image
            src="/letter2nd.png"
            alt="Письмо матери"
            width={320}
            height={390}
            className="mx-auto"
          />
          <p className="mt-2 text-base text-gray-500">Москва, 1941</p>
          <h3 className="font-semibold text-lg">Письмо матери</h3>
          <p className="text-sm text-gray-400">Иванов Иван Иванович</p>
          <Button className="mt-2 bg-[#9d0b0f] hover:bg-[#5a1a1c] text-white h-8">
            Читать
          </Button>
        </div>
        </div>

        <div className="flex justify-center items-end gap-6 mt-36">
        <Image
            src="/book.png"
            alt="Тетрадь 1945"
            width={800}
            height={850}
            className="h-auto"
        />
        <div className="mb-24 text-left">
            <p className="text-base text-gray-500">30 июня 1945</p>
            <h3 className="font-semibold text-xl">Тетрадь из 1945-го</h3>
            <Button className="mt-2 bg-[#9d0b0f] hover:bg-[#5a1a1c] text-white h-8">
                Читать
            </Button>
        </div>
        </div>
      </section>
    </main>
  );
};
