"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./ui/Container";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/poems", label: "Gallery" },
    { href: "/submit", label: "Submit" },
    { href: "/about", label: "About" },
];

export function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <header className="fixed top-0 left-0 right-0 z-[9999] py-6">
            <Container>
                <nav className="flex items-center justify-between">
                    <Link href="/" className="group flex items-center gap-3 relative z-50">
                        <img
                            src="/logo.png"
                            alt="Silent Voice Logo"
                            className="w-10 h-10 rounded-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                        <span className="font-brand text-lg tracking-[0.2em] text-gold-400 group-hover:text-gold-300 transition-colors">
                            SILENT VOICE
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative font-brand text-xs tracking-widest uppercase transition-colors",
                                    pathname === link.href ? "text-gold-400" : "text-slate-400 hover:text-slate-200"
                                )}
                            >
                                {link.label}
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute -bottom-1 left-0 right-0 h-px bg-gold-400/50"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gold-400 relative z-50 p-2"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                        aria-controls="mobile-navigation"
                        type="button"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Mobile Navigation Overlay */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 z-[9998] bg-obsidian-900/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
                                id="mobile-navigation"
                                role="dialog"
                                aria-modal="true"
                            >
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "font-brand text-2xl tracking-[0.2em] uppercase transition-colors",
                                            pathname === link.href ? "text-gold-400" : "text-slate-400 hover:text-slate-200"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </Container>
        </header>
    );
}
