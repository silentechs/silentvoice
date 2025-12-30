"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <div className="w-full">
                <input
                    className={cn(
                        "flex h-12 w-full rounded-lg border border-gold-600/10 bg-obsidian-800/50 px-4 py-2 text-slate-100 ring-offset-obsidian-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-600/50 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50",
                        error && "border-red-500/50 focus:ring-red-500/30",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && <p className="mt-1.5 text-xs text-red-500/80 font-ui pl-1">{error}</p>}
            </div>
        );
    }
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <div className="w-full">
                <textarea
                    className={cn(
                        "flex min-h-[120px] w-full rounded-lg border border-gold-600/10 bg-obsidian-800/50 px-4 py-3 text-slate-100 ring-offset-obsidian-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-600/50 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50",
                        error && "border-red-500/50 focus:ring-red-500/30",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && <p className="mt-1.5 text-xs text-red-500/80 font-ui pl-1">{error}</p>}
            </div>
        );
    }
);
Textarea.displayName = "Textarea";
