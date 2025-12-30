"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import useSWR, { mutate } from "swr";

interface Author {
    id: string;
    name: string;
    email: string;
}

interface Poem {
    id: string;
    title: string;
    content: string;
    imageUrl: string | null;
    status: "pending" | "approved" | "rejected";
    submittedAt: string;
    approvedAt: string | null;
    rejectionReason: string | null;
    author: Author;
}

interface PoemsResponse {
    poems: Poem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ModerationPage() {
    const [filter, setFilter] = useState<"pending" | "approved" | "rejected" | "all">("pending");
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const [showRejectModal, setShowRejectModal] = useState<string | null>(null);

    const { data, error, isLoading } = useSWR<PoemsResponse>(
        `/api/admin/poems?status=${filter}`,
        fetcher
    );

    const handleModerate = async (poemId: string, action: "approve" | "reject", reason?: string) => {
        setLoadingId(poemId);
        try {
            const response = await fetch(`/api/admin/poems/${poemId}/moderate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action, rejectionReason: reason }),
            });

            if (response.ok) {
                mutate(`/api/admin/poems?status=${filter}`);
                setShowRejectModal(null);
                setRejectionReason("");
            }
        } catch (error) {
            console.error("Moderation failed:", error);
        } finally {
            setLoadingId(null);
        }
    };

    const poems = data?.poems || [];
    const pagination = data?.pagination;

    return (
        <main className="min-h-screen">
            <Navigation />

            <Section className="pt-40">
                <Container>
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
                        <div>
                            <Link href="/admin" className="text-gold-600 font-ui text-sm hover:underline mb-2 inline-block">
                                ← Admin Portal
                            </Link>
                            <h1 className="text-3xl md:text-4xl font-brand text-slate-100 tracking-widest uppercase">
                                Poem <span className="text-gold-600">Moderation</span>
                            </h1>
                            <p className="poetry-text text-slate-400 mt-2">
                                {pagination?.total || 0} {filter === "pending" ? "awaiting review" : `${filter} poems`}
                            </p>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex gap-2 flex-wrap">
                            {(["pending", "approved", "rejected", "all"] as const).map((status) => (
                                <Button
                                    key={status}
                                    variant={filter === status ? "gold" : "secondary"}
                                    size="sm"
                                    onClick={() => setFilter(status)}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="text-center py-20">
                            <div className="w-8 h-8 border-2 border-gold-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-slate-400 font-ui">Summoning poems from the void...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <Card className="text-center py-12">
                            <CardContent>
                                <p className="text-red-400">Failed to load poems. The spirits are unresponsive.</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Empty State */}
                    {!isLoading && !error && poems.length === 0 && (
                        <Card className="text-center py-16">
                            <CardContent>
                                <div className="w-16 h-16 rounded-full border border-gold-600/20 flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-gold-600/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-brand text-slate-300 mb-2 tracking-wide">The Void is Clear</h3>
                                <p className="text-slate-500 font-ui">No {filter === "all" ? "" : filter} poems to display.</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Poems List */}
                    <div className="space-y-6">
                        {poems.map((poem) => (
                            <Card key={poem.id} hover={false} className="overflow-hidden">
                                <CardContent>
                                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                        {/* Image */}
                                        {poem.imageUrl && (
                                            <div className="w-full lg:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-obsidian-900">
                                                <img
                                                    src={poem.imageUrl}
                                                    alt={poem.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <div>
                                                    <h3 className="text-xl font-brand text-slate-100 tracking-wide mb-1 line-clamp-1">
                                                        {poem.title}
                                                    </h3>
                                                    <div className="flex items-center gap-3 text-sm">
                                                        <span className="text-gold-600 font-brand text-xs tracking-wider">
                                                            {poem.author.name}
                                                        </span>
                                                        <span className="text-slate-600">•</span>
                                                        <span className="text-slate-500 font-ui">
                                                            {new Date(poem.submittedAt).toLocaleDateString("en-US", {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Badge variant={poem.status}>{poem.status}</Badge>
                                            </div>

                                            {/* Poem Excerpt / Full Content */}
                                            <div className="mb-4">
                                                <p className={`poetry-text text-slate-400 ${expandedId === poem.id ? "" : "line-clamp-3"}`}>
                                                    "{poem.content}"
                                                </p>
                                                {poem.content.length > 200 && (
                                                    <button
                                                        onClick={() => setExpandedId(expandedId === poem.id ? null : poem.id)}
                                                        className="text-gold-600 text-sm font-ui mt-2 hover:underline"
                                                    >
                                                        {expandedId === poem.id ? "Show less" : "Read more"}
                                                    </button>
                                                )}
                                            </div>

                                            {/* Rejection Reason */}
                                            {poem.status === "rejected" && poem.rejectionReason && (
                                                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
                                                    <p className="text-red-400 text-sm font-ui">
                                                        <strong>Rejection reason:</strong> {poem.rejectionReason}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Actions */}
                                            {poem.status === "pending" && (
                                                <div className="flex items-center gap-3">
                                                    <Button
                                                        variant="gold"
                                                        size="sm"
                                                        isLoading={loadingId === poem.id}
                                                        onClick={() => handleModerate(poem.id, "approve")}
                                                    >
                                                        ✓ Approve
                                                    </Button>
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        className="!border-red-500/50 !text-red-400 hover:!border-red-500"
                                                        onClick={() => setShowRejectModal(poem.id)}
                                                    >
                                                        ✗ Reject
                                                    </Button>
                                                    <Link
                                                        href={`/poems/${poem.id}`}
                                                        className="text-slate-500 text-sm font-ui hover:text-gold-600 ml-auto"
                                                    >
                                                        View Full →
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Rejection Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-obsidian-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card hover={false} className="w-full max-w-md">
                        <CardContent>
                            <h3 className="text-xl font-brand text-slate-100 mb-4 tracking-wider">Reject Poem</h3>
                            <p className="text-slate-400 font-ui text-sm mb-4">
                                Provide a reason for rejection (optional). This will be sent to the author.
                            </p>
                            <textarea
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                placeholder="E.g., Does not align with the sanctuary's vision..."
                                className="w-full h-24 bg-obsidian-900 border border-gold-600/20 rounded-lg p-3 text-slate-200 font-ui text-sm resize-none focus:outline-none focus:border-gold-600/50"
                            />
                            <div className="flex gap-3 mt-4">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="!border-red-500/50 !text-red-400"
                                    isLoading={loadingId === showRejectModal}
                                    onClick={() => handleModerate(showRejectModal, "reject", rejectionReason)}
                                >
                                    Confirm Rejection
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setShowRejectModal(null);
                                        setRejectionReason("");
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            <Footer />
        </main>
    );
}
