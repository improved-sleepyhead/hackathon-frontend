"use client";

import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/shared/ui/kit/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/ui/kit/card";
import { Input } from "@/shared/ui/kit/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/shared/ui/kit/form";
import { authService } from "@/shared/api/services/auth.service";
import { MailForm } from "@/shared/api/types/auth.types";

const formSchema = z.object({
    email: z.string().email("Неверный email"),
});

export const EmailEnterCard = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const promise = authService
            .main(values as MailForm)
                .then(() => {
            form.reset();
            router.push("/");
        });
        
        toast.promise(promise, {
            loading: "Регистрация аккаунта...",
            success: "Успешная регистрация!",
            error: (error) => error?.response?.data?.message || "Ошибка регистрации",
        });
    };

    const isLoading = form.formState.isSubmitting;

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">Регистрация</CardTitle>
                <CardDescription>
                    Регистрируясь, вы принимаете нашу {" "}
                    <Link href="/privacy">
                        <span className="text-blue-700">Политику Конфиденциальности</span>{" "}
                    </Link>
                    и {" "}
                    <Link href="/terms">
                        <span className="text-blue-700">Условия Пользования</span>
                    </Link>
                </CardDescription>
            </CardHeader>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} type="email" placeholder="Введите email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                            {isLoading ? "Загрузка..." : "Зарегистрироваться"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
