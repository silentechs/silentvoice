import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/Container";

export default function ModerationSuccess() {
    return (
        <main className="min-h-screen">
            <Navigation />
            <Section className="pt-60">
                <Container size="sm" className="text-center">
                    <div className="w-20 h-20 rounded-full border border-emerald-500 flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                        <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h1 className="text-3xl font-brand text-slate-100 mb-6 tracking-widest uppercase text-emerald-500">Sacred Approval</h1>
                    <p className="poetry-text text-xl text-slate-400 max-w-md mx-auto">
                        "The poem has been enshrined. Its resonance now fills the digital sanctuary."
                    </p>
                </Container>
            </Section>
            <Footer />
        </main>
    );
}
