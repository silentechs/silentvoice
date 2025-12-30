"use client";

import { useState, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";

export default function SubmitPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const formData = new FormData(e.currentTarget);

            // Add the image file if selected
            if (selectedImage) {
                formData.set("image", selectedImage);
            }

            const res = await fetch("/api/poems", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Submission failed");
            }

            setIsSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "The void rejected your offering.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError("Image must be less than 5MB");
                return;
            }
            setSelectedImage(file);
        }
    };

    return (
        <main className="min-h-screen">
            <Navigation />

            <Section className="pt-40">
                <Container size="sm">
                    {!isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="mb-12 text-center">
                                <h1 className="text-4xl font-brand mb-4 tracking-widest text-slate-100">
                                    SUBMIT YOUR <span className="text-gold-600">VOICE</span>
                                </h1>
                                <p className="text-slate-400 font-ui text-lg italic poetry-text">
                                    "Let your whispered words float into the digital sanctuary."
                                </p>
                            </div>

                            <Card className="p-8 md:p-12 border-gold-600/10">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {error && (
                                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-ui">
                                            {error}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="font-brand text-[10px] tracking-[0.2em] text-gold-400 uppercase">Title of the Poem</label>
                                            <Input name="title" placeholder="E.g. The Whispering Wind" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-brand text-[10px] tracking-[0.2em] text-gold-400 uppercase">Author Name</label>
                                            <Input name="authorName" placeholder="Your pen name" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="font-brand text-[10px] tracking-[0.2em] text-gold-400 uppercase">Email Address</label>
                                        <Input name="email" type="email" placeholder="For moderation updates" required />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="font-brand text-[10px] tracking-[0.2em] text-gold-400 uppercase">The Poem</label>
                                        <Textarea
                                            name="content"
                                            placeholder="Type or paste your verses here..."
                                            className="min-h-[300px] poetry-text text-lg italic"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="font-brand text-[10px] tracking-[0.2em] text-gold-400 uppercase block">Visual Soul (Optional Image)</label>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            name="image"
                                            accept="image/png,image/jpeg,image/webp"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                        <div
                                            onClick={handleImageClick}
                                            className="border-2 border-dashed border-gold-600/10 rounded-xl p-10 text-center hover:border-gold-600/30 transition-colors cursor-pointer bg-obsidian-900/30 group"
                                        >
                                            <div className="flex flex-col items-center">
                                                {selectedImage ? (
                                                    <>
                                                        <svg className="w-10 h-10 text-gold-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                        <p className="font-ui text-sm text-gold-400">{selectedImage.name}</p>
                                                        <p className="font-ui text-[10px] text-slate-500 mt-2">Click to change</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-10 h-10 text-gold-600/30 group-hover:text-gold-400 transition-colors mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                        <p className="font-ui text-sm text-slate-500">Upload a companion image (PNG, JPG, WebP)</p>
                                                        <p className="font-ui text-[10px] text-slate-700 mt-2 uppercase tracking-widest">Max 5MB</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <Button
                                            type="submit"
                                            variant="gold"
                                            className="w-full"
                                            isLoading={isSubmitting}
                                        >
                                            Whisper into the Void
                                        </Button>
                                        <p className="mt-4 text-center font-ui text-[10px] text-slate-600 uppercase tracking-widest">
                                            Your submission will be curated by the spirits within 24-48 hours.
                                        </p>
                                    </div>
                                </form>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20"
                        >
                            <div className="w-20 h-20 rounded-full border border-gold-600 flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                                <svg className="w-10 h-10 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h2 className="text-3xl font-brand text-slate-100 mb-6 tracking-widest uppercase">The Void has Echoed</h2>
                            <p className="poetry-text text-xl text-slate-400 max-w-md mx-auto mb-12">
                                "Your verses have been received. They now await their place in the eternal sanctuary."
                            </p>
                            <Button variant="secondary" onClick={() => setIsSuccess(false)}>
                                Submit Another Verse
                            </Button>
                        </motion.div>
                    )}
                </Container>
            </Section>

            <Footer />
        </main>
    );
}
