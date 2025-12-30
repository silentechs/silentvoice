import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Container({ size = "lg", className, ...props }: ContainerProps) {
    const sizes = {
        sm: "max-w-3xl",
        md: "max-w-5xl",
        lg: "max-w-7xl",
        xl: "max-w-screen-2xl",
        full: "max-w-full",
    };

    return (
        <div
            className={cn("mx-auto px-4 sm:px-6 lg:px-8", sizes[size], className)}
            {...props}
        />
    );
}

export function Section({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
    return (
        <section
            className={cn("py-16 md:py-24 relative overflow-hidden", className)}
            {...props}
        />
    );
}
