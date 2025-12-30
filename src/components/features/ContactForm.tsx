"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Send, CheckCircle, Mail, User, MessageSquare } from "lucide-react";

type ContactReason = "feedback" | "collaboration" | "support" | "general";

interface ContactFormProps {
    className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [reason, setReason] = useState<ContactReason>("general");

    const reasons: { value: ContactReason; label: string; description: string }[] = [
        { value: "feedback", label: "Feedback", description: "Share your thoughts on the platform" },
        { value: "collaboration", label: "Collaboration", description: "Partner or feature request" },
        { value: "support", label: "Support", description: "Need help with something" },
        { value: "general", label: "General", description: "Say hello or ask a question" },
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            subject: formData.get("subject") as string,
            message: formData.get("message") as string,
            reason,
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || "Failed to send message");
            }

            setIsSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`glass-card p-10 border border-gold-600/20 text-center ${className}`}
            >
                <div className="w-20 h-20 rounded-full border-2 border-emerald-500/50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-brand text-slate-100 tracking-wider uppercase mb-4">
                    Message Received
                </h3>
                <p className="text-slate-400 font-ui mb-2">
                    Thank you for reaching out to the sanctuary.
                </p>
                <p className="text-slate-500 font-ui text-sm italic">
                    Mubarick will respond to your message soon.
                </p>
                <Button
                    variant="ghost"
                    className="mt-8"
                    onClick={() => setIsSuccess(false)}
                >
                    Send Another Message
                </Button>
            </motion.div>
        );
    }

    return (
        <div className={`glass-card border border-gold-600/20 overflow-hidden ${className}`}>
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-gold-600/10 bg-obsidian-900/30">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full border border-gold-600/30 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-brand text-slate-100 tracking-wider uppercase">
                            Contact the Founder
                        </h3>
                        <p className="text-sm text-slate-500 font-ui">
                            Reach out to Mubarick directly
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-ui"
                    >
                        {error}
                    </motion.div>
                )}

                {/* Reason Selection */}
                <div className="space-y-3">
                    <label className="font-brand text-[10px] tracking-[0.2em] text-gold-400 uppercase block">
                        What brings you here?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {reasons.map((r) => (
                            <button
                                key={r.value}
                                type="button"
                                onClick={() => setReason(r.value)}
                                className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                                    reason === r.value
                                        ? "border-gold-600/50 bg-gold-600/10 text-gold-400"
                                        : "border-gold-600/10 bg-obsidian-900/50 text-slate-500 hover:border-gold-600/30 hover:text-slate-400"
                                }`}
                            >
                                <span className="font-brand text-xs tracking-wider uppercase block">
                                    {r.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="font-brand text-[10px] tracking-[0.2em] text-gold-400 uppercase flex items-center gap-2">
                            <User size={12} />
                            Your Name
                        </label>
                        <Input
                            name="name"
                            placeholder="How should we address you?"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="font-brand text-[10px] tracking-[0.2em] text-gold-400 uppercase flex items-center gap-2">
                            <Mail size={12} />
                            Email Address
                        </label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="For our reply"
                            required
                        />
                    </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                    <label className="font-brand text-[10px] tracking-[0.2em] text-gold-400 uppercase">
                        Subject
                    </label>
                    <Input
                        name="subject"
                        placeholder="What's this about?"
                        required
                    />
                </div>

                {/* Message */}
                <div className="space-y-2">
                    <label className="font-brand text-[10px] tracking-[0.2em] text-gold-400 uppercase flex items-center gap-2">
                        <MessageSquare size={12} />
                        Your Message
                    </label>
                    <Textarea
                        name="message"
                        placeholder="Share your thoughts, ideas, or questions..."
                        className="min-h-[150px]"
                        required
                    />
                </div>

                {/* Submit */}
                <div className="pt-4">
                    <Button
                        type="submit"
                        variant="gold"
                        className="w-full flex items-center justify-center gap-2"
                        isLoading={isSubmitting}
                    >
                        <Send size={16} />
                        Send Message
                    </Button>
                    <p className="mt-4 text-center font-ui text-[10px] text-slate-600 uppercase tracking-widest">
                        We typically respond within 24-48 hours
                    </p>
                </div>
            </form>
        </div>
    );
}

