import { NextResponse } from "next/server";
import { loginUser } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const result = await loginUser(email, password);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            user: {
                id: result.user!.id,
                name: result.user!.name,
                email: result.user!.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "An error occurred during login" },
            { status: 500 }
        );
    }
}

