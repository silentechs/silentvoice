"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function LogoutButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await fetch("/api/admin/logout", { method: "POST" });
            router.push("/admin/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant="secondary"
            size="sm"
            isLoading={isLoading}
            onClick={handleLogout}
            className="!border-red-500/30 !text-red-400 hover:!border-red-500/50"
        >
            Logout
        </Button>
    );
}

