import { Logo } from "@/shared/ui/logo"

export const Footer = () => {
    return (
        <footer className="bg-dark-main py-6 px-4 sm:px-6 lg:px-8">
            <div className="w-full flex flex-row justify-between items-center gap-8">
                <div className="flex items-center justify-center">
                    <Logo/>
                </div>
                {/* Правая колонка - текст соглашения */}
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Какое-то то пользовательское соглашение
                    </p>
                    <p className="text-sm text-gray-500">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
                Все права защищены ©Владелец
            </div>
        </footer>
    )
}