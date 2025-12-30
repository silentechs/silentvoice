"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
    const searchParams = useSearchParams();
    const reason = searchParams.get("reason");

    const messages: Record<string, string> = {
        "missing-token": "The mystical key is missing from your link.",
        "invalid-token": "The sacred seal has been broken or expired.",
        "unknown-action": "The spirits do not recognize this ritual.",
        "server-error": "The void is experiencing turbulence.",
    };

    return (
        <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full border border-red-500/50 flex items-center justify-center mx-auto mb-10">
                <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </div>
            <h2 className="text-3xl font-brand text-slate-100 mb-6 tracking-widest uppercase">Moderation Failed</h2>
            <p className="poetry-text text-xl text-slate-400 max-w-md mx-auto mb-12">
                {messages[reason || "server-error"] || "Something went wrong with the moderation link."}
            </p>
            <Button asChild variant="secondary">
                <Link href="/">Return to Sanctuary</Link>
            </Button>
        </div>
    );
}

export default function ModerationErrorPage() {
    return (
        <main className="min-h-screen">
            <Navigation />
            <Section className="pt-40">
                <Container size="sm">
                    <Suspense fallback={<div className="text-center py-20 text-slate-500">Loading...</div>}>
                        <ErrorContent />
                    </Suspense>
                </Container>
            </Section>
            <Footer />
        </main>
    );
}
