"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Login failed");
                return;
            }

            // Redirect to admin dashboard
            router.push("/admin");
            router.refresh();
        } catch {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen">
            <Navigation />

            <Section className="pt-40 pb-20">
                <Container size="sm">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-md mx-auto"
                    >
                        {/* Header */}
                        <div className="text-center mb-12">
                            <div className="mb-6 flex items-center gap-4 justify-center opacity-50">
                                <div className="h-px w-8 bg-gold-400" />
                                <span className="font-brand text-xs tracking-[0.4em] uppercase text-gold-400">
                                    Sanctuary Access
                                </span>
                                <div className="h-px w-8 bg-gold-400" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-brand text-slate-100 mb-3 tracking-widest uppercase">
                                Guardian <span className="text-gold-600">Portal</span>
                            </h1>
                            <p className="poetry-text text-slate-400">
                                "Only those who hold the sacred key may enter."
                            </p>
                        </div>

                        {/* Login Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="glass-card p-8"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Field */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-brand uppercase tracking-wider text-slate-400 mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoComplete="email"
                                        className="w-full px-4 py-3 bg-obsidian-900/50 border border-gold-600/20 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-600/50 focus:ring-1 focus:ring-gold-600/30 transition-all font-ui"
                                        placeholder="guardian@sanctuary.art"
                                    />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-brand uppercase tracking-wider text-slate-400 mb-2"
                                    >
                                        Sacred Key
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete="current-password"
                                        className="w-full px-4 py-3 bg-obsidian-900/50 border border-gold-600/20 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-600/50 focus:ring-1 focus:ring-gold-600/30 transition-all font-ui"
                                        placeholder="••••••••••••"
                                    />
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 rounded-lg bg-red-900/20 border border-red-500/30"
                                    >
                                        <p className="text-red-400 text-sm font-ui text-center">
                                            {error}
                                        </p>
                                    </motion.div>
                                )}

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    variant="gold"
                                    size="lg"
                                    isLoading={isLoading}
                                    disabled={isLoading}
                                    className="w-full"
                                >
                                    {isLoading ? "Authenticating..." : "Enter the Sanctuary"}
                                </Button>
                            </form>
                        </motion.div>

                        {/* Decorative Element */}
                        <div className="mt-12 text-center">
                            <div className="inline-flex items-center gap-3 opacity-30">
                                <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-600/50" />
                                <svg
                                    className="w-5 h-5 text-gold-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                                <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-600/50" />
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </Section>

            <Footer />
        </main>
    );
}

