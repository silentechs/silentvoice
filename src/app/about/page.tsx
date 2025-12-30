import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <Navigation />

            <Section className="pt-40">
                <Container size="sm">
                    <div className="mb-16 text-center">
                        <h1 className="text-4xl md:text-6xl font-brand mb-6 tracking-widest text-slate-100 uppercase">
                            The <span className="text-gold-600">Sanctuary</span> Story
                        </h1>
                        <p className="poetry-text text-xl text-slate-400 italic">
                            "In the beginning, there was silence. And in that silence, we found our voice."
                        </p>
                    </div>

                    <div className="space-y-20">
                        <div className="space-y-8">
                            <h2 className="text-2xl font-brand text-gold-400 tracking-widest uppercase">The Vision</h2>
                            <p className="text-slate-400 leading-relaxed font-ui text-lg">
                                Silent Voice is an avant-garde poetry platform designed to transcend the digital noise. Founded in the heart of Ghana by Mubarick Issahaku, the platform serves as a digital sanctuary for poets who seek more than just "likes" or "shares."
                            </p>
                            <p className="text-slate-400 leading-relaxed font-ui text-lg">
                                We believe that poetry is a sacred vibration—a shadow cast by the imagination as it leaps into the void. Our mission is to provide an ethereal space where these vibrations can resonate eternally.
                            </p>
                        </div>

                        <Card className="p-10 border-gold-600/10 bg-obsidian-800/30">
                            <h3 className="text-xl font-brand text-slate-100 mb-6 tracking-widest uppercase text-center">Our Philosophy</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <h4 className="text-gold-400 text-xs tracking-[0.2em] font-brand uppercase">Curation over Content</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        We don't aim for volume. We aim for resonance. Every piece submitted to the sanctuary is curated by spirits who understand the weight of a whispered word.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-gold-400 text-xs tracking-[0.2em] font-brand uppercase">Silence as Sanctuary</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        Our interface is designed to disappear. In Zen Mode, the digital world fades away, leaving only you and the unfolding verses.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <div className="space-y-8">
                            <h2 className="text-2xl font-brand text-gold-400 tracking-widest uppercase">The Founder</h2>
                            <div className="flex flex-col md:flex-row gap-10 items-center">
                                <div className="w-32 h-32 rounded-full border border-gold-600/20 p-1 flex-shrink-0">
                                    <div className="w-full h-full rounded-full bg-obsidian-800 overflow-hidden relative">
                                        <Image
                                            src="/founder_mubarick.jpg"
                                            alt="Mubarick Issahaku - Founder"
                                            fill
                                            className="object-cover"
                                            sizes="128px"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl text-slate-100">Mubarick Issahaku</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm italic poetry-text">
                                        Mubarick is a visionary developer and curator based in Ghana. With a deep passion for the intersection of technology and art, he created Silent Voice to give African and global poets a premium stage for their work.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-20 text-center border-t border-gold-600/5">
                            <p className="font-brand text-[10px] tracking-[0.5em] text-gold-600/40 uppercase">
                                Est. 2025 — Dedicated to the Unspoken
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            <Footer />
        </main>
    );
}
