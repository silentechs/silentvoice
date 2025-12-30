import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";

export default async function ProtectedAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getAdminUser();

    if (!user) {
        redirect("/admin/login");
    }

    return <>{children}</>;
}

