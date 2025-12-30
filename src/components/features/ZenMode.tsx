"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ZenModeProps {
    content: string;
}

export function ZenMode({ content }: ZenModeProps) {
    const lines = content.split("\n");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <div className="relative py-20 px-4 max-w-2xl mx-auto">
            <div className="space-y-6">
                {lines.map((line, index) => (
                    <motion.p
                        key={index}
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        custom={index}
                        className={cn(
                            "poetry-text text-xl md:text-3xl leading-relaxed text-slate-100 text-center",
                            line.trim() === "" ? "h-8" : ""
                        )}
                    >
                        {line.split(" ").map((word, wordIndex) => (
                            <motion.span
                                variants={child}
                                key={wordIndex}
                                className="inline-block mr-[0.4em]"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.p>
                ))}
            </div>
        </div>
    );
}
