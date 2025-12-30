"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { motion, AnimatePresence } from "framer-motion";

interface FeedbackFormProps {
    poemId: string;
    onSuccess?: () => void;
}

export function FeedbackForm({ poemId, onSuccess }: FeedbackFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            content: formData.get("content"),
            authorName: formData.get("authorName"),
            email: formData.get("email"),
        };

        try {
            const res = await fetch(`/api/poems/${poemId}/feedback`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Failed to submit");
            }

            setSuccess(true);
            setTimeout(() => {
                setIsOpen(false);
                setSuccess(false);
                onSuccess?.();
            }, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "The echo faded too quickly");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div
                        key="button"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Button
                            variant="secondary"
                            className="w-full"
                            onClick={() => setIsOpen(true)}
                        >
                            Leave a Resonance
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="glass-card p-6 border-gold-600/10"
                    >
                        {success ? (
                            <div className="text-center py-6">
                                <div className="w-12 h-12 rounded-full border border-gold-600 flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-gold-400 font-brand text-sm tracking-widest uppercase">Your resonance echoes</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
                                        {error}
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="font-brand text-[9px] tracking-widest text-gold-400 uppercase">Name</label>
                                        <Input name="authorName" placeholder="Your name" required />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="font-brand text-[9px] tracking-widest text-gold-400 uppercase">Email</label>
                                        <Input name="email" type="email" placeholder="your@email.com" required />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="font-brand text-[9px] tracking-widest text-gold-400 uppercase">Your Resonance</label>
                                    <Textarea
                                        name="content"
                                        placeholder="What echoes do you feel from this poem?"
                                        className="min-h-[100px]"
                                        required
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <Button type="submit" variant="gold" className="flex-1" isLoading={isSubmitting}>
                                        Send Echo
                                    </Button>
                                    <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
