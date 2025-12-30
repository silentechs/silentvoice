"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
    hover?: boolean;
}

export function Card({ className, children, hover = true, ...props }: CardProps) {
    return (
        <motion.div
            {...(hover ? { whileHover: { y: -5, transition: { duration: 0.3 } } } : {})}
            className={cn(
                "glass-card group relative",
                hover && "hover:shadow-[0_10px_40px_-15px_rgba(212,175,55,0.15)]",
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-mystic-500/5 via-transparent to-gold-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10 p-6">{children as React.ReactNode}</div>
        </motion.div>
    );
}

export function CardHeader({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("text-slate-300", className)}>{children}</div>;
}

export function CardFooter({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("mt-6 pt-4 border-t border-gold-600/10", className)}>{children}</div>;
}
