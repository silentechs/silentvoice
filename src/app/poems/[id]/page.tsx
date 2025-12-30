"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ZenMode } from "@/components/features/ZenMode";
import { MysticAnalysis } from "@/components/features/MysticAnalysis";
import { FeedbackForm } from "@/components/features/FeedbackForm";
import { ShareModal } from "@/components/features/ShareModal";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Share2, MessageCircle } from "lucide-react";

interface Poem {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    author: { name: string };
    approvedAt: string;
    feedback: Array<{
        id: string;
        content: string;
        author: { name: string };
        createdAt: string;
    }>;
}

export default function PoemDetailPage() {
    const params = useParams();
    const [poem, setPoem] = useState<Poem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isShareOpen, setIsShareOpen] = useState(false);

    useEffect(() => {
        async function fetchPoem() {
            try {
                const res = await fetch(`/api/poems/${params.id}`);
                if (!res.ok) {
                    throw new Error("Poem not found");
                }
                const data = await res.json();
                setPoem(data.poem);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load poem");
            } finally {
                setIsLoading(false);
            }
        }

        if (params.id) {
            fetchPoem();
        }
    }, [params.id]);

    if (isLoading) {
        return (
            <main className="min-h-screen">
                <Navigation />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="w-8 h-8 rounded-full border-2 border-gold-600 border-t-transparent animate-spin" />
                </div>
                <Footer />
            </main>
        );
    }

    if (error || !poem) {
        return (
            <main className="min-h-screen">
                <Navigation />
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <h1 className="text-3xl font-brand text-slate-100 mb-4">The Void is Empty</h1>
                    <p className="text-slate-400 mb-8">{error || "This poem has not yet been whispered into existence."}</p>
                    <Button asChild variant="secondary">
                        <Link href="/poems">Return to Gallery</Link>
                    </Button>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen">
            <Navigation />

            {/* Detail Hero */}
            <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-obsidian-900">
                    {poem.imageUrl && (
                        <img
                            src={poem.imageUrl}
                            alt={poem.title}
                            className="w-full h-full object-cover opacity-40 blur-sm scale-105"
                        />
                    )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 to-transparent" />

                <Container className="h-full flex flex-col justify-end pb-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <Badge variant="approved">CURATED</Badge>
                            <span className="font-ui text-xs text-slate-500 uppercase tracking-widest">
                                {new Date(poem.approvedAt).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-brand text-slate-100 tracking-[0.2em] mb-4 uppercase">
                            {poem.title}
                        </h1>
                        <p className="font-brand text-sm tracking-[0.4em] text-gold-400">
                            BY {poem.author.name.toUpperCase()}
                        </p>
                    </motion.div>
                </Container>
            </div>

            {/* Zen Mode Reading Section */}
            <Section className="bg-obsidian-900/50">
                <Container>
                    <div className="mb-10 flex justify-center">
                        <div className="text-[10px] font-brand tracking-[0.5em] text-gold-600/30 uppercase">
                            Entering Zen Mode
                        </div>
                    </div>

                    <ZenMode content={poem.content} />

                    <MysticAnalysis poemId={poem.id} />

                    <div className="mt-20 flex flex-col items-center gap-10">
                        <div className="w-20 h-px bg-gold-600/20" />

                        <div className="flex gap-4">
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setIsShareOpen(true)}
                                className="flex items-center gap-2"
                            >
                                <Share2 size={16} />
                                Share
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                    document.getElementById("resonances")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="flex items-center gap-2"
                            >
                                <MessageCircle size={16} />
                                Discuss
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Feedback Section */}
            <Section id="resonances" className="border-t border-gold-600/5">
                <Container size="sm">
                    <h3 className="text-2xl font-brand text-slate-100 mb-10 tracking-widest uppercase text-center">Resonances</h3>

                    <div className="space-y-8">
                        {poem.feedback && poem.feedback.length > 0 ? (
                            poem.feedback.map((fb) => (
                                <div key={fb.id} className="glass-card p-6 border-gold-600/5">
                                    <p className="font-ui text-slate-400 italic mb-4">"{fb.content}"</p>
                                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                                        <span className="text-gold-400">{fb.author.name}</span>
                                        <span className="text-slate-600">
                                            {new Date(fb.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-slate-500 italic font-ui">No resonances yet. Be the first to echo.</p>
                        )}

                        <div className="pt-8">
                            <FeedbackForm poemId={poem.id} onSuccess={() => window.location.reload()} />
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Share Modal */}
            <ShareModal
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                title={poem.title}
                author={poem.author.name}
                url={typeof window !== "undefined" ? window.location.href : ""}
                excerpt={poem.content.substring(0, 150)}
            />

            <Footer />
        </main>
    );
}
