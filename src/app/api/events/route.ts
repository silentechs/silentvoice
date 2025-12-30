// Minimal endpoint to avoid noisy 404s in dev environments.
// If you later implement SSE/analytics under this path, replace this handler.
export function GET() {
    return new Response(null, { status: 204 });
}


