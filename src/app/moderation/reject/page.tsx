import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/Container";

export default function ModerationReject() {
    return (
        <main className="min-h-screen">
            <Navigation />
            <Section className="pt-60">
                <Container size="sm" className="text-center">
                    <div className="w-20 h-20 rounded-full border border-red-500 flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                    <h1 className="text-3xl font-brand text-slate-100 mb-6 tracking-widest uppercase text-red-500">Graceful Rejection</h1>
                    <p className="poetry-text text-xl text-slate-400 max-w-md mx-auto">
                        "The voice did not resonate with the sanctuary this time. It remains in the whispers of the void."
                    </p>
                </Container>
            </Section>
            <Footer />
        </main>
    );
}
