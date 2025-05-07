"use client"

import { Button } from "@/shared/ui/kit/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const ErrorPage = () => {
    return (
        <div className="h-screen flex flex-col gap-y-2 items-center justify-center">
            <AlertTriangle className="size-8"/>
            <p className="text-sm">
                Something went wrong
            </p>
            <Button variant="secondary" asChild>
                <Link href="/">
                    Back to home
                </Link>
            </Button>
        </div>
    );
}
 
export default ErrorPage;