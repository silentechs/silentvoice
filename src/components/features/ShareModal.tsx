"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    X, 
    Link2, 
    Check, 
    Mail,
    MessageCircle,
    Send,
} from "lucide-react";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    author: string;
    url: string;
    excerpt?: string;
}

interface SharePlatform {
    name: string;
    icon: React.ReactNode;
    color: string;
    getUrl: (data: { url: string; title: string; text: string }) => string;
}

// Custom SVG icons for social platforms
const TwitterIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const TelegramIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
);

const RedditIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
);

const PinterestIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
    </svg>
);

const platforms: SharePlatform[] = [
    {
        name: "X (Twitter)",
        icon: <TwitterIcon />,
        color: "hover:bg-black hover:text-white",
        getUrl: ({ url, title, text }) =>
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${title}"\n\n${text}\n\n`)}&url=${encodeURIComponent(url)}`,
    },
    {
        name: "Facebook",
        icon: <FacebookIcon />,
        color: "hover:bg-[#1877F2] hover:text-white",
        getUrl: ({ url }) =>
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
        name: "LinkedIn",
        icon: <LinkedInIcon />,
        color: "hover:bg-[#0A66C2] hover:text-white",
        getUrl: ({ url, title }) =>
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
        name: "WhatsApp",
        icon: <WhatsAppIcon />,
        color: "hover:bg-[#25D366] hover:text-white",
        getUrl: ({ url, title, text }) =>
            `https://wa.me/?text=${encodeURIComponent(`"${title}"\n\n${text}\n\n${url}`)}`,
    },
    {
        name: "Telegram",
        icon: <TelegramIcon />,
        color: "hover:bg-[#0088cc] hover:text-white",
        getUrl: ({ url, title, text }) =>
            `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`"${title}"\n\n${text}`)}`,
    },
    {
        name: "Reddit",
        icon: <RedditIcon />,
        color: "hover:bg-[#FF4500] hover:text-white",
        getUrl: ({ url, title }) =>
            `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    },
    {
        name: "Pinterest",
        icon: <PinterestIcon />,
        color: "hover:bg-[#E60023] hover:text-white",
        getUrl: ({ url, title }) =>
            `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
    },
];

export function ShareModal({ isOpen, onClose, title, author, url, excerpt }: ShareModalProps) {
    const [copied, setCopied] = useState(false);

    const shareText = excerpt 
        ? `${excerpt.substring(0, 100)}...` 
        : `A poem by ${author} on Silent Voice`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleShareClick = (platform: SharePlatform) => {
        const shareUrl = platform.getUrl({ url, title, text: shareText });
        window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer");
    };

    const handleEmailShare = () => {
        const subject = encodeURIComponent(`"${title}" - A poem on Silent Voice`);
        const body = encodeURIComponent(
            `I wanted to share this beautiful poem with you:\n\n"${title}" by ${author}\n\n${shareText}\n\nRead the full poem: ${url}\n\n— Shared from Silent Voice Sanctuary`
        );
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `"${title}" by ${author}`,
                    text: shareText,
                    url: url,
                });
            } catch (err) {
                // User cancelled or error
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-obsidian-900/90 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
                    >
                        <div className="glass-card border border-gold-600/20 overflow-hidden">
                            {/* Header */}
                            <div className="p-6 border-b border-gold-600/10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-brand text-slate-100 tracking-wider uppercase">
                                            Share This Poem
                                        </h3>
                                        <p className="text-sm text-slate-500 font-ui mt-1">
                                            "{title}" by {author}
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-full hover:bg-gold-600/10 transition-colors text-slate-400 hover:text-slate-200"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Social Platforms Grid */}
                            <div className="p-6">
                                <p className="text-xs font-brand tracking-widest text-gold-600/60 uppercase mb-4">
                                    Share on Social Media
                                </p>
                                <div className="grid grid-cols-4 gap-3">
                                    {platforms.map((platform) => (
                                        <button
                                            key={platform.name}
                                            onClick={() => handleShareClick(platform)}
                                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border border-gold-600/10 bg-obsidian-900/50 text-slate-400 transition-all duration-200 ${platform.color}`}
                                            title={platform.name}
                                        >
                                            {platform.icon}
                                            <span className="text-[10px] font-ui truncate w-full text-center">
                                                {platform.name.split(" ")[0]}
                                            </span>
                                        </button>
                                    ))}
                                    <button
                                        onClick={handleEmailShare}
                                        className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gold-600/10 bg-obsidian-900/50 text-slate-400 transition-all duration-200 hover:bg-gold-600 hover:text-obsidian-900"
                                        title="Email"
                                    >
                                        <Mail size={20} />
                                        <span className="text-[10px] font-ui">Email</span>
                                    </button>
                                </div>

                                {/* Native Share (Mobile) */}
                                {"share" in navigator && (
                                    <button
                                        onClick={handleNativeShare}
                                        className="w-full mt-4 flex items-center justify-center gap-2 p-3 rounded-xl border border-gold-600/20 bg-obsidian-900/50 text-slate-300 hover:border-gold-600/50 hover:text-gold-400 transition-all duration-200"
                                    >
                                        <Send size={18} />
                                        <span className="font-brand text-xs tracking-widest uppercase">
                                            More Options
                                        </span>
                                    </button>
                                )}

                                {/* Divider */}
                                <div className="flex items-center gap-4 my-6">
                                    <div className="flex-1 h-px bg-gold-600/10" />
                                    <span className="text-xs font-brand tracking-widest text-slate-600 uppercase">
                                        or
                                    </span>
                                    <div className="flex-1 h-px bg-gold-600/10" />
                                </div>

                                {/* Copy Link */}
                                <p className="text-xs font-brand tracking-widest text-gold-600/60 uppercase mb-3">
                                    Copy Link
                                </p>
                                <div className="flex gap-2">
                                    <div className="flex-1 px-4 py-3 rounded-lg bg-obsidian-900 border border-gold-600/10 text-slate-400 font-ui text-sm truncate">
                                        {url}
                                    </div>
                                    <button
                                        onClick={handleCopyLink}
                                        className={`px-4 py-3 rounded-lg border transition-all duration-200 flex items-center gap-2 ${
                                            copied
                                                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                                                : "border-gold-600/20 text-slate-400 hover:border-gold-600/50 hover:text-gold-400"
                                        }`}
                                    >
                                        {copied ? (
                                            <>
                                                <Check size={18} />
                                                <span className="text-xs font-brand tracking-wider uppercase">Copied</span>
                                            </>
                                        ) : (
                                            <>
                                                <Link2 size={18} />
                                                <span className="text-xs font-brand tracking-wider uppercase">Copy</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 bg-obsidian-900/50 border-t border-gold-600/10">
                                <p className="text-center text-xs text-slate-600 font-ui">
                                    Share the whispers of the sanctuary ✨
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

