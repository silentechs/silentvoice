import { cookies } from "next/headers";
import prisma from "./prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "sv_session";
const SESSION_EXPIRY_DAYS = 7;

/**
 * Verify user credentials and return user if valid
 */
export async function verifyCredentials(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user || !user.passwordHash || !user.isOwner) {
        return null;
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
        return null;
    }

    return user;
}

/**
 * Create a new session for the user
 */
export async function createSession(userId: string) {
    // Generate a secure random token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

    // Clean up expired sessions for this user
    await prisma.session.deleteMany({
        where: {
            OR: [
                { userId, expiresAt: { lt: new Date() } },
                { expiresAt: { lt: new Date() } },
            ],
        },
    });

    // Create new session
    const session = await prisma.session.create({
        data: {
            userId,
            token,
            expiresAt,
        },
    });

    return session;
}

/**
 * Set the session cookie
 */
export async function setSessionCookie(token: string) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_EXPIRY_DAYS * 24 * 60 * 60, // 7 days in seconds
    });
}

/**
 * Get the current session from cookies
 */
export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
        return null;
    }

    const session = await prisma.session.findUnique({
        where: { token },
        include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
        // Session expired or not found
        if (session) {
            await prisma.session.delete({ where: { id: session.id } });
        }
        return null;
    }

    return session;
}

/**
 * Get the current authenticated admin user
 */
export async function getAdminUser() {
    const session = await getSession();
    
    if (!session || !session.user.isOwner) {
        return null;
    }

    return session.user;
}

/**
 * Check if user is authenticated as admin
 */
export async function isAdminAuthenticated() {
    const user = await getAdminUser();
    return !!user;
}

/**
 * Clear the session (logout)
 */
export async function clearSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (token) {
        await prisma.session.deleteMany({ where: { token } });
    }

    cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Login user and set session cookie
 */
export async function loginUser(email: string, password: string) {
    const user = await verifyCredentials(email, password);
    
    if (!user) {
        return { success: false, error: "Invalid credentials" };
    }

    const session = await createSession(user.id);
    await setSessionCookie(session.token);

    return { success: true, user };
}

