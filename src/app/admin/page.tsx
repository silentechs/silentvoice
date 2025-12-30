import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminPage() {
    return (
        <main className="min-h-screen">
            <Navigation />

            <Section className="pt-40">
                <Container size="md">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="mb-4 flex items-center gap-4 justify-center opacity-50">
                            <div className="h-px w-12 bg-gold-400" />
                            <span className="font-brand text-xs tracking-[0.4em] uppercase text-gold-400">
                                Administrator
                            </span>
                            <div className="h-px w-12 bg-gold-400" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-brand text-slate-100 mb-4 tracking-widest uppercase">
                            Sanctuary <span className="text-gold-600">Portal</span>
                        </h1>
                        <p className="poetry-text text-lg text-slate-400 max-w-xl mx-auto">
                            "The guardian's chamber, where whispered submissions find their fate."
                        </p>
                    </div>

                    {/* Admin Cards */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <Link href="/admin/moderation">
                            <Card className="h-full cursor-pointer">
                                <CardContent>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full border border-gold-600/30 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-brand text-slate-100 tracking-wider">Moderation</h2>
                                            <p className="text-sm text-slate-500 font-ui">Review pending submissions</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 font-ui leading-relaxed">
                                        Review, approve, or reject poems that await entry into the sanctuary.
                                        Shape the collection with your discerning vision.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Card className="h-full opacity-50" hover={false}>
                            <CardContent>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full border border-slate-600/30 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-brand text-slate-400 tracking-wider">More Soon</h2>
                                        <p className="text-sm text-slate-600 font-ui">Coming features</p>
                                    </div>
                                </div>
                                <p className="text-slate-500 font-ui leading-relaxed">
                                    Additional admin capabilities are being conjured from the ethereal realm.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-16 text-center">
                        <Button variant="ghost" asChild>
                            <Link href="/">← Return to Sanctuary</Link>
                        </Button>
                    </div>
                </Container>
            </Section>

            <Footer />
        </main>
    );
}
