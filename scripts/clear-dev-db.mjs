/**
 * Dev-only DB cleanup script.
 *
 * Calls the running dev server's endpoint so it uses the exact same env/DB
 * that Next.js is using (no separate DATABASE_URL loading issues).
 *
 * Usage:
 *   CONFIRM_DB_CLEAR=YES APP_URL=http://localhost:3001 npm run db:clear
 */

async function main() {
  // Don't rely on NODE_ENV being set in the shell; the API endpoint is dev-only
  // and will return 404 outside development.

  if (process.env.CONFIRM_DB_CLEAR !== "YES") {
    console.error("Refusing to clear DB. Set CONFIRM_DB_CLEAR=YES to proceed.");
    process.exit(1);
  }

  const baseUrl =
    process.env.APP_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";

  const url = `${baseUrl.replace(/\/+$/, "")}/api/debug/clear?confirm=YES`;

  console.log(`🧹 Clearing DB via ${url}`);

  const res = await fetch(url, { method: "POST" });
  const text = await res.text();

  if (!res.ok) {
    console.error(`Failed (${res.status}): ${text}`);
    if (res.status === 404) {
      console.error(
        "Tip: Make sure your Next dev server is running and APP_URL points to it (e.g. http://localhost:3001)."
      );
    }
    process.exit(1);
  }

  console.log("✅ Cleared.");
  console.log(text);
}

main().catch((e) => {
  console.error("DB clear failed:", e);
  process.exit(1);
});


