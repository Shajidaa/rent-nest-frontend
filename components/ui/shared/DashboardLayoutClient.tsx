"use client";

import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";
import { IUser } from "@/lib/type";

export default function DashboardLayoutClient({
    user,
    children,
}: {
    user: IUser;
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* ── Sidebar (Desktop) ── */}
            <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:bg-card">
                <DashboardSidebar {...user} />
            </aside>

            {/* ── Main Content ── */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <DashboardTopbar {...user} />
                <main className="flex-1 overflow-y-auto bg-muted/30 p-4 lg:p-6">
                    <div className="mx-auto max-w-screen-2xl">{children}</div>
                </main>
            </div>
        </div>
    );
}
