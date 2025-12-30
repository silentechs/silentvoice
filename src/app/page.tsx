import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <Section className="min-h-screen flex items-center pt-32">
        <Container className="flex flex-col items-center text-center">
          <div className="mb-8 flex items-center gap-4 opacity-50">
            <div className="h-px w-12 bg-gold-400" />
            <span className="font-brand text-xs tracking-[0.4em] uppercase text-gold-400">
              The Digital Sanctuary
            </span>
            <div className="h-px w-12 bg-gold-400" />
          </div>

          <h1 className="text-5xl md:text-8xl font-brand mb-6 tracking-[0.15em] text-slate-100">
            LOUD <span className="text-gold-600">SILENCE</span>
          </h1>

          <p className="poetry-text text-xl md:text-3xl max-w-2xl mb-12 text-slate-400">
            "Where the whispered words of the spirit find their eternal resonance."
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <Button size="lg" variant="gold" asChild>
              <Link href="/poems">Explore Poetry</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/submit">Submit Your Work</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Featured Quote Section */}
      <Section className="bg-obsidian-800/20">
        <Container size="sm" className="text-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 text-9xl text-gold-600/10 font-brand">"</div>
            <p className="poetry-text text-2xl text-slate-300 relative z-10">
              Poetry is the shadow cast by our imaginations as they leap into the void. It is the language of the unspoken, the voice of the silent.
            </p>
            <div className="mt-8 font-brand text-xs tracking-widest text-gold-400/60 uppercase">
              — The Spirit of the Sanctuary
            </div>
          </div>
        </Container>
      </Section>

      {/* About Platform Preview */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-gold-600/10 shadow-2xl group">
              <Image
                src="/founder_mubarick.jpg"
                alt="Mubarick Issahaku - Founder of Silent Voice"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/20 to-transparent z-10" />
              <div className="absolute bottom-10 left-10 z-20">
                <p className="font-brand text-xs tracking-widest text-gold-400 mb-2">FOUNDER</p>
                <h3 className="text-2xl text-slate-100">MUBARICK ISSAHAKU</h3>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl text-slate-100">Transcending the Digital Void</h2>
              <p className="text-slate-400 leading-relaxed font-ui text-lg">
                Silent Voice was born from a vision of creating a space where poetry isn't just posted, but enshrined. We believe every word carries a vibration that deserves a dedicated sanctuary.
              </p>
              <p className="text-slate-400 leading-relaxed font-ui text-lg">
                From the heart of Ghana to the global expanse, we curate voices that dare to speak in the language of the soul.
              </p>
              <Button variant="ghost" className="pl-0" asChild>
                <Link href="/about">Learn our story →</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
