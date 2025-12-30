import { Container } from "./ui/Container";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-20 border-t border-gold-600/5 bg-obsidian-900/50">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                    <div className="space-y-4">
                        <h3 className="text-gold-400 text-sm tracking-[0.2em]">SILENT VOICE</h3>
                        <p className="font-ui text-sm text-slate-500 leading-relaxed max-w-xs">
                            A mystical sanctuary where the whispered words of poets find their echo in the digital void.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-slate-300 text-xs tracking-widest uppercase">Explore</h4>
                        <ul className="space-y-2 font-ui text-sm text-slate-500">
                            <li><Link href="/poems" className="hover:text-gold-400 transition-colors">Poetry Gallery</Link></li>
                            <li><Link href="/about" className="hover:text-gold-400 transition-colors">Our Story</Link></li>
                            <li><Link href="/submit" className="hover:text-gold-400 transition-colors">Submit Work</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-slate-300 text-xs tracking-widest uppercase">Curated by</h4>
                        <p className="font-brand text-xs text-gold-600/60 uppercase tracking-widest">
                            Mubarick Issahaku
                        </p>
                        <div className="flex justify-center md:justify-start gap-4 pt-2">
                            <a href="https://x.com/mubarick391" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-gold-400 transition-colors" aria-label="Follow on X (Twitter)">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>
                            <a href="https://web.facebook.com/imubarick" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-gold-400 transition-colors" aria-label="Follow on Facebook">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 text-center space-y-4">
                    <p className="font-ui text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
                        A product of <span className="font-semibold text-slate-400">Silentech Solution Enterprise</span>. 
                        Built with <span className="text-red-500">❤️</span> in Ghana for the next generation of poets and wordsmiths across Africa.
                    </p>
                    <p className="font-brand text-[10px] text-slate-700 tracking-[0.3em] uppercase">
                        © {new Date().getFullYear()} Silent Voice — Handcrafted in Ghana
                    </p>
                </div>
            </Container>
        </footer>
    );
}
