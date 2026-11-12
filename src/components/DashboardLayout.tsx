import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";
import { useUser } from "@/hooks/useUser";
import appLogo from "../../public/images/appLogo.png";

export default function DashboardLayout({
    children,
    search,
    adminOnly = false,
}: {
    children: ReactNode;
    search?: ReactNode;
    adminOnly?: boolean;
}) {
    const router = useRouter();
    const { user, loaded } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (!loaded) return;
        if (!user) {
            router.push("/");
        } else if (adminOnly && !user.admin) {
            router.push("/training-logs");
        }
    }, [loaded, user, adminOnly, router]);

    if (!user || (adminOnly && !user.admin)) {
        return null;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-20 flex flex-wrap items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 shadow-sm md:px-6">
                <button
                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium md:hidden"
                    onClick={() => setMenuOpen(true)}
                >
                    Menu
                </button>
                <div className="flex items-center gap-2">
                    <Image src={appLogo} alt="Logo" className="h-8 w-auto" />
                    <span className="text-2xl font-bold">Progress</span>
                </div>
                {search && <div className="w-full md:ml-auto md:w-96">{search}</div>}
            </header>

            <div className="flex flex-1">
                <aside className="sticky top-[65px] hidden h-[calc(100vh-65px)] w-64 shrink-0 border-r border-gray-200 md:block">
                    <Sidebar />
                </aside>
                {menuOpen && (
                    <div className="fixed inset-0 z-30 md:hidden">
                        <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
                        <aside className="absolute inset-y-0 left-0 w-72">
                            <Sidebar />
                        </aside>
                    </div>
                )}
                <main className="min-w-0 flex-1">{children}</main>
            </div>
        </div>
    );
}
