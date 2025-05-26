"use client"

import {Avatar, AvatarFallback } from "@/shared/ui/kit/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/ui/kit/dropdown-menu"
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Separator } from "./kit/separator";
import { authService } from "@/shared/api/services/auth.service";
import { useCurrentUser } from "@/shared/api/hooks/use-current-user";
import { Spinner } from "./spinner";

export const UserButton = () => {
    const router = useRouter();
    const { currentUser, isLoading, isAuthenticated } = useCurrentUser();

    const email = currentUser?.email;

    const onLogout = () => {
        const promise = authService.logout().then(() => {
            router.push("/login");
        });

        toast.promise(promise, {
            loading: "Выход из аккаунта...",
            success: "Успешный выход из аккаунта!",
            error: (error) => error?.response?.data?.message || "Ошибка при выходе из аккаунта",
        });
    };
    
    const avatarFallback = email?.charAt(0).toUpperCase() ?? "?";
    const displayEmail = email ?? "Гость";
    const accessLevel = email ? "Полный доступ" : "Макимум 20 генераций";

    if (isLoading) return (
        <div className="flex items-center justify-center">
            <Spinner />
        </div>
    )
    if (!isAuthenticated) return null

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
                    <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom" className="w-60" sideOffset={10}>
                <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
                    <Avatar className="size-14 border border-neutral-300">
                        <AvatarFallback className="bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center">
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-sm font-medium text-neutral-900">
                            {displayEmail}
                        </p>
                        <p className="text-xs text-neutral-500">{accessLevel}</p>
                    </div>
                </div>
                <Separator className="mb-1"/>
                <DropdownMenuItem
                    className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer"
                    onClick={onLogout}
                >
                    <LogOut className="size-4 mr-2" />
                    Выйти из аккаунта
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
