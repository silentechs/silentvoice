import Link from "next/link";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { resolvePublicImageUrl } from "@/lib/images";

interface PoemCardProps {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    imageUrl?: string;
    status?: "pending" | "approved" | "rejected";
}

export function PoemCard({ id, title, excerpt, author, date, imageUrl, status = "approved" }: PoemCardProps) {
    const publicImageUrl = resolvePublicImageUrl(imageUrl);

    return (
        <Link href={`/poems/${id}`}>
            <Card className="h-full flex flex-col group overflow-hidden border-gold-600/5">
                <div className="relative aspect-[16/10] bg-obsidian-900 overflow-hidden">
                    {publicImageUrl ? (
                        <img
                            src={publicImageUrl}
                            alt={title}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                            decoding="async"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-mystic-900 to-obsidian-900 flex items-center justify-center">
                            <span className="font-brand text-gold-600/20 text-4xl">SV</span>
                        </div>
                    )}
                    <div className="absolute top-4 right-4 z-20">
                        <Badge variant={status}>{status}</Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent opacity-60" />
                </div>

                <div className="flex-1 p-6">
                    <CardHeader className="mb-2">
                        <h3 className="text-xl text-slate-100 group-hover:text-gold-400 transition-colors line-clamp-1">
                            {title}
                        </h3>
                    </CardHeader>
                    <CardContent>
                        <p className="poetry-text text-slate-400 line-clamp-3 italic">
                            "{excerpt}"
                        </p>
                    </CardContent>
                    <CardFooter className="mt-4 pt-4 border-t border-gold-600/5 flex items-center justify-between">
                        <span className="font-brand text-[10px] tracking-widest text-gold-600 uppercase">
                            {author}
                        </span>
                        <span className="font-ui text-[10px] text-slate-600">
                            {date}
                        </span>
                    </CardFooter>
                </div>
            </Card>
        </Link>
    );
}
