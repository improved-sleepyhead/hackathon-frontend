"use client"
import { Logo } from "@/shared/ui/logo"
import { Button } from "@/shared/ui/kit/button"
import Link from "next/link"
import { UserButton } from "@/shared/ui/user-button";
import { usePathname } from "next/navigation";
import {routes} from "@/widgets/marketing/constants/routes-data"
import { useCurrentUser } from "@/shared/api/hooks/use-current-user";
import { Spinner } from "@/shared/ui/spinner";

export const Header = () => {
    const {isAuthenticated, isLoading}  = useCurrentUser();
    const pathname = usePathname();
    
    return (
        <div className="flex items-center justify-between pt-4 pb-4 px-20 w-full h-full bg-transparent rounded-2xl text-white">
            <Logo />
            <div className="flex items-center gap-10">
                <div className="flex gap-6">
                    {routes.map((item) => {
                        const fullHref = `${item.href}`;
                        const isActive = pathname === fullHref;
                        return (
                            <Button variant="header" size={isActive ? 'active' : 'default'} className="text-white text-base"  key={item.href}>
                                <Link href={fullHref}>
                                    {item.label}
                                </Link>
                            </Button>
                        );
                    })}
                </div>
            </div>
            <div className="flex items-center justify-end">
                <div className="flex items-center justify-end">
                    {isLoading ? (
                        <Spinner />
                    ) : isAuthenticated ? (
                        <UserButton />
                    ) : (
                        <Button variant="outline" size="lg">
                            <Link href="/login">Войти</Link>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};