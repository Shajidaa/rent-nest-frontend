"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    LayoutDashboard,
    Home,
    Building2,
    Users,
    FileText,
    CreditCard,
    KeyRound,
    BarChart3,
    MessageSquare,

    ClipboardList,
    Search,
    Star,
    LogOut,
    User,
    Settings,
    ChevronRight,
    HomeIcon,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { logout } from "@/service/logout";
import { IUser } from "@/lib/type";

// ─── Role nav config ──────────────────────────────────────────────────────────

type NavItem = {
    label: string;
    href: string;
    icon: React.ElementType;
};

type NavGroup = {
    group: string;
    items: NavItem[];
};

const roleNav: Record<string, NavGroup[]> = {
    ADMIN: [
        {
            group: "Main",
            items: [
                { label: "Overview", href: "/admin-dashboard", icon: LayoutDashboard },
                { label: "Users", href: "/admin-dashboard/users", icon: Users },
                { label: "Properties", href: "/admin-dashboard/properties", icon: Building2 },
                { label: "Create Category", href: "/admin-dashboard/create-category", icon: Building2 },
                { label: "Rentals", href: "/admin-dashboard/rentals", icon: Building2 },
            ],
        }
    ],
    LANDLORD: [
        {
            group: "Main",
            items: [
                { label: "Overview", href: "/landlord-dashboard", icon: LayoutDashboard },
                { label: "Create Properties", href: "/landlord-dashboard/create-property", icon: HomeIcon },
                { label: "Properties", href: "/landlord-dashboard/requests", icon: Building2 },

              
            ],
        },
        
    ],
    TENANT: [
        {
            group: "Main",
            items: [
                { label: "Overview", href: "/tenant-dashboard", icon: LayoutDashboard },
                { label: "Browse Properties", href: "/properties", icon: Search },
                { label: "My Rentals", href: "/tenant-dashboard/rentals", icon: KeyRound },
            ],
        },
        {
            group: "Account",
            items: [
                { label: "Applications", href: "/tenant-dashboard/applications", icon: FileText },
                { label: "Payments", href: "/tenant-dashboard/payments", icon: CreditCard },
            ],
        }
    ],
};

const roleMeta: Record<string, { label: string; color: string; bg: string; border: string }> = {
    ADMIN: {
        label: "Administrator",
        color: "text-violet-700",
        bg: "bg-violet-50",
        border: "border-violet-200",
    },
    LANDLORD: {
        label: "Landlord",
        color: "text-emerald-700",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
    },
    TENANT: {
        label: "Tenant",
        color: "text-sky-700",
        bg: "bg-sky-50",
        border: "border-sky-200",
    },
};

function getInitials(name: string) {
    return name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase();
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export default function DashboardSidebar({ ...user }: IUser) {
    const pathname = usePathname();
    const router = useRouter();

    const role = user?.data?.profile?.role ?? "TENANT";
    const profile = user?.data?.profile;
    const navGroups = roleNav[role] ?? roleNav.TENANT;
    const meta = roleMeta[role] ?? roleMeta.TENANT;
    const initials = profile?.name ? getInitials(profile.name) : "U";
    const avatarUrl = profile?.profile?.profilePhoto ?? "";

    const handleLogout = async () => {
        await logout();
        toast.success("Logged out successfully");
        router.push("/");
    };

    return (
        <aside className="flex h-full w-full flex-col">
            {/* ── Brand ── */}
            <div className="flex items-center gap-3 px-4 py-5">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
                        <Home className="h-4 w-4" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">
                        Nest<span className="text-primary">Rent</span>
                    </span>
                </Link>
            </div>



            <Separator className="mb-2" />

          {/* ── Nav Groups ── */}
<nav className="flex flex-1 flex-col gap-4 overflow-y-auto px-3 py-2">
    {navGroups.map((group) => (
        <div key={group.group}>
            <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {group.group}
            </p>
            <div className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                    const Icon = item.icon;

                    // Root routes definition
                    const isDashboardRoot = [
                        "/admin-dashboard",
                        "/landlord-dashboard",
                        "/tenant-dashboard",
                    ].includes(item.href);

                    const isActive = isDashboardRoot
                        ? pathname === item.href
                        : pathname === item.href ||
                          (item.href !== "/properties" && pathname.startsWith(item.href + "/"));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <span className="flex items-center gap-3">
                                <Icon className="h-4 w-4 shrink-0" />
                                {item.label}
                            </span>
                            {isActive && <ChevronRight className="h-3.5 w-3.5 opacity-70" />}
                        </Link>
                    );
                })}
            </div>
        </div>
    ))}
</nav>

            <Separator className="mt-2" />

            {/* ── Bottom Actions ── */}
            <div className="flex flex-col gap-0.5 px-3 py-3">
                <Link
                    href={`/${role.toLowerCase()}-dashboard/profile`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                    <User className="h-4 w-4" />
                    Profile
                </Link>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    Log out
                </button>
            </div>
        </aside>
    );
}
