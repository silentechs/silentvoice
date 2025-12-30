"use client";

import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "pending" | "approved" | "rejected" | "suspended" | "default";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const variants = {
        default: "bg-obsidian-800 text-slate-300 border-gold-600/20",
        pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        rejected: "bg-red-500/10 text-red-500 border-red-500/20",
        suspended: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-brand tracking-wider uppercase transition-colors",
                variants[variant],
                className
            )}
            {...props}
        />
    );
}
