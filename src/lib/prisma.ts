import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

// Only configure WebSocket for runtime (not during build)
let adapter: InstanceType<typeof PrismaNeon> | undefined;

if (typeof window === "undefined" && process.env.DATABASE_URL) {
  // Server-side: use Neon adapter
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { neonConfig } = require("@neondatabase/serverless");

  // Only set up WebSocket in Node.js runtime (not Edge or build time)
  if (process.env.NODE_ENV !== "production" || process.env.VERCEL) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const ws = require("ws");
      neonConfig.webSocketConstructor = ws;
    } catch {
      // ws not available (Edge runtime), Neon will use fetch
    }
  }

  adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // During build time or without DATABASE_URL, create a minimal client
  if (!process.env.DATABASE_URL) {
    console.warn("[Prisma] DATABASE_URL not set, using default Prisma client");
    return new PrismaClient();
  }

  console.log("[Prisma] Connecting with Neon adapter");

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
