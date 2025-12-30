"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";

interface Analysis {
    theme: string;
    insight: string;
    echo: string;
}

export function MysticAnalysis({ poemId }: { poemId: string }) {
    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAnalysis = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/poems/${poemId}/mystic-analysis`);
            const data = await res.json();
            if (data.success) {
                setAnalysis(data.analysis);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-20">
            {!analysis && !isLoading ? (
                <button
                    onClick={fetchAnalysis}
                    className="group flex flex-col items-center gap-4 mx-auto opacity-40 hover:opacity-100 transition-opacity"
                >
                    <div className="w-12 h-12 rounded-full border border-gold-600/30 flex items-center justify-center group-hover:border-gold-600 transition-colors">
                        <svg className="w-5 h-5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <span className="font-brand text-[10px] tracking-[0.3em] uppercase text-gold-400">Seek Mystic Insight</span>
                </button>
            ) : (
                <div className="max-w-xl mx-auto">
                    {isLoading ? (
                        <div className="text-center space-y-4">
                            <div className="w-8 h-8 rounded-full border-2 border-gold-600 border-t-transparent animate-spin mx-auto" />
                            <p className="font-brand text-[10px] tracking-widest text-gold-600/60 uppercase">Consulting the Oracle...</p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {analysis && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <Card className="p-8 border-mystic-500/20 bg-mystic-900/10">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="h-px flex-1 bg-mystic-500/20" />
                                            <span className="font-brand text-[10px] tracking-[0.4em] text-mystic-500 uppercase">Mystic Analysis</span>
                                            <div className="h-px flex-1 bg-mystic-500/20" />
                                        </div>

                                        <div className="space-y-6 text-center">
                                            <div>
                                                <p className="font-brand text-xs tracking-widest text-gold-400 mb-2 uppercase">Dominant Frequency</p>
                                                <h4 className="text-2xl text-slate-100">{analysis.theme}</h4>
                                            </div>

                                            <p className="poetry-text text-lg text-slate-400 italic leading-relaxed">
                                                "{analysis.insight}"
                                            </p>

                                            <div className="pt-4 border-t border-mystic-500/10">
                                                <p className="font-brand text-[10px] tracking-[0.2em] text-mystic-500 uppercase italic">
                                                    "{analysis.echo}"
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </div>
            )}
        </div>
    );
}
