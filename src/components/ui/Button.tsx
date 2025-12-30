"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "gold";
type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    children?: React.ReactNode;
    className?: string;
}

interface ButtonPropsWithMotion extends BaseButtonProps, Omit<HTMLMotionProps<"button">, "ref" | "children"> {
    asChild?: false;
}

interface ButtonPropsWithSlot extends BaseButtonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild: true;
}

type ButtonProps = ButtonPropsWithMotion | ButtonPropsWithSlot;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, asChild = false, children, ...props }, ref) => {
        const variants = {
            primary: "bg-mystic-700 text-slate-50 hover:bg-mystic-600 shadow-[0_0_15px_rgba(76,29,149,0.3)]",
            secondary: "bg-obsidian-800 text-slate-200 border border-gold-600/20 hover:border-gold-600/50 hover:bg-obsidian-700",
            gold: "bg-gold-600 text-obsidian-900 font-bold hover:bg-gold-500 shadow-[0_0_20px_rgba(212,175,55,0.2)]",
            ghost: "bg-transparent text-slate-300 hover:text-gold-400 hover:bg-white/5",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
        };

        const baseClassName = cn(
            "relative inline-flex items-center justify-center rounded-lg font-brand uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
            variants[variant],
            sizes[size],
            className
        );

        if (asChild) {
            return (
                <Slot
                    ref={ref}
                    className={baseClassName}
                    {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
                >
                    {children}
                </Slot>
            );
        }

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={baseClassName}
                {...(props as HTMLMotionProps<"button">)}
            >
                {isLoading && (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                )}
                <span className="relative z-10">{children as React.ReactNode}</span>
                {variant === "gold" && (
                    <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 hover:opacity-100 transition-opacity blur-md" />
                )}
            </motion.button>
        );
    }
);

Button.displayName = "Button";
