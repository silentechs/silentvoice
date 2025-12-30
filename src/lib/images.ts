/**
 * Image URL helpers
 *
 * Historically we stored `Poem.imageUrl` as either:
 * - a full URL (https://...)
 * - a relative path (/some-key.png) when R2_PUBLIC_URL was missing
 * - a raw key (some-key.png)
 *
 * This helper normalizes those values into a public URL when possible.
 */

export function resolvePublicImageUrl(imageUrl?: string | null): string | null {
    if (!imageUrl) return null;

    const value = imageUrl.trim();
    if (!value) return null;

    // Already a usable URL
    if (/^https?:\/\//i.test(value) || value.startsWith("data:") || value.startsWith("blob:")) {
        return value;
    }

    // Treat non-http values as an R2 object key
    const key = value.startsWith("/") ? value.slice(1) : value;
    if (!key) return null;

    const base = (process.env.R2_PUBLIC_URL || process.env.R2_PUBLIC_DOMAIN || "")
        .trim()
        .replace(/\/+$/, "");

    // If we don't know the public base URL, prefer hiding the broken image (show placeholder)
    if (!base) return null;

    // Encode path segments but keep `/` separators intact
    const encodedKey = key
        .split("/")
        .map((segment) => encodeURIComponent(segment))
        .join("/");

    return `${base}/${encodedKey}`;
}


