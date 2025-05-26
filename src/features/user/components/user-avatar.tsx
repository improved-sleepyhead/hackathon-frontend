import { Avatar, AvatarFallback } from "@/shared/ui/kit/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
    name: string;
    email: string;
    className?: string;
    fallbackClassName?: string;
}

export const UserAvatar = ({
    name,
    email,
    className,
    fallbackClassName
}: UserAvatarProps) => {
    if (!email) return null;
    return (
        <div className="flex items-center gap-2">
            <Avatar className={cn("size-5 transition items-center border border-neutral-300  bg-neutral-300 rounded-full", className)}>
                <AvatarFallback className={cn(
                    "bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center",
                    fallbackClassName
                )}>
                    {email?.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="flex items-center justify-center w-fit text-neutral-300">
                {name && (<p className="text-sm font-medium">{name}</p>)}
            </div>
        </div>
    );
};