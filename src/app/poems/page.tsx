import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/Container";
import { PoemCard } from "@/components/PoemCard";
import prisma from "@/lib/prisma";

// IMPORTANT:
// This page queries the DB directly. Without this, Next.js may statically optimize
// the route in production and serve stale HTML even after the DB changes.
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Poem {
    id: string;
    title: string;
    content: string;
    imageUrl: string | null;
    author: { name: string };
    approvedAt: Date | null;
}

async function getPoems(): Promise<{ poems: Poem[]; error: string | null }> {
    try {
        const poems = await prisma.poem.findMany({
            where: { status: "approved" },
            include: { author: true },
            orderBy: { approvedAt: "desc" },
            take: 20,
        });

        return { poems: poems as Poem[], error: null };
    } catch (error) {
        console.error("Error fetching poems:", error);
        return { poems: [], error: "The spirits are resting" };
    }
}

export default async function GalleryPage() {
    const { poems, error } = await getPoems();

    return (
        <main className="min-h-screen">
            <Navigation />

            <Section className="pt-40">
                <Container>
                    <div className="mb-16 text-center">
                        <h1 className="text-4xl md:text-6xl font-brand mb-4 tracking-widest text-slate-100">
                            POETRY <span className="text-gold-600">GALLERY</span>
                        </h1>
                        <p className="text-slate-400 font-ui text-lg tracking-wide uppercase opacity-60">
                            A curated collection of whispered truths.
                        </p>
                    </div>

                    {error ? (
                        <div className="text-center py-20">
                            <p className="text-slate-500 font-ui">{error}</p>
                        </div>
                    ) : poems.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-slate-500 font-ui italic">The sanctuary awaits its first voices...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {poems.map((poem) => (
                                <PoemCard
                                    key={poem.id}
                                    id={poem.id}
                                    title={poem.title}
                                    excerpt={poem.content.substring(0, 120) + "..."}
                                    author={poem.author.name}
                                    date={poem.approvedAt ? new Date(poem.approvedAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    }) : ""}
                                    imageUrl={poem.imageUrl || undefined}
                                />
                            ))}
                        </div>
                    )}

                    <div className="mt-20 flex justify-center">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-px bg-gold-600/20" />
                            <span className="font-brand text-[10px] text-slate-500 tracking-[0.4em]">END OF CURATION</span>
                            <div className="w-12 h-px bg-gold-600/20" />
                        </div>
                    </div>
                </Container>
            </Section>

            <Footer />
        </main>
    );
}
