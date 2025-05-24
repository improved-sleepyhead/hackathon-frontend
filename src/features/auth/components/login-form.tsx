"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/shared/ui/kit/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { Input } from "@/shared/ui/kit/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/shared/ui/kit/form";
import { AuthForm } from "@/shared/api/types/auth.types";
import { authService } from "@/shared/api/services/auth.service";

const formSchema = z.object({
    email: z.string().trim().min(1, "Необходимое поле").email("Неверный email"),
    code: z.string().min(1, "Необходимое поле"),
});

interface LoginFormProps {
    onCancel?: () => void;
};

export const LoginForm = ({ onCancel }: LoginFormProps) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          code: "",
        },
    });
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const promise = authService.login(values as AuthForm)
            .then(() => {
            form.reset();
            onCancel?.();
            router.push("/");
        });
    
        toast.promise(promise, {
            loading: "Вход в систему...",
            success: "Успешный вход!",
            error: (error) => error?.response?.data?.message || "Ошибка входа",
        });
    };
    
    const isLoading = form.formState.isSubmitting;

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">Введите данные для входа</CardTitle>
                <CardDescription>
                    Проверьте Вашу почту! Письмо с кодом подтверждения было направлено по указанному.
                </CardDescription>
            </CardHeader>
            <CardContent>
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
                        <FormField
                            name="code"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} type="code" placeholder="Введите код с почты" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-between">
                            {onCancel && (
                                <Button
                                    type="button"
                                    size="lg"
                                    variant="secondary"
                                    onClick={onCancel}
                                    disabled={isLoading}
                                >
                                    Отмена
                                </Button>
                            )}
                            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                                {isLoading ? "Загрузка..." : "Войти"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
