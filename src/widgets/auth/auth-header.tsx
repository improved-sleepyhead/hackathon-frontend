import { Button } from "@/shared/ui/kit/button"
import { Logo } from "@/shared/ui/logo";
import { ArrowLeft } from "lucide-react";
import Link from "next/link"

export const AuthHeader = () => {
    return (
        <nav className="flex justify-between items-center">
            <Logo />
            <div className="flex items-center justify-end gap-x-4">
                <Button variant="secondary" className="p-5" asChild>
                    <Link href="/">
                        <ArrowLeft /> На главную
                    </Link>
                </Button>
            </div>
        </nav>
    );
};