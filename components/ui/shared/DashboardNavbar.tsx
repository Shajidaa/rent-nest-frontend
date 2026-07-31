"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import {
    Menu,
    LogOut,
    User,
    Settings,
    LayoutDashboard,
    Home,
    Building2,
    Users,
    FileText,
    CreditCard,
    Bell,
    ChevronDown,
    ShieldCheck,
    KeyRound,
    BarChart3,
    MessageSquare,
    Wrench,
    ClipboardList,
    Search,
    Star,
    PanelLeftOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { logout } from "@/service/logout";
import { IUser } from "@/lib/type";

// ─── Role-based nav config ────────────────────────────────────────────────────

type NavItem = {
    label: string;
    href: string;
    icon: React.ElementType;
};

const roleNavItems: Record<string, NavItem[]> = {
    ADMIN: [
        { label: "Overview", href: "/admin-dashboard", icon: LayoutDashboard },
        { label: "Users", href: "/admin-dashboard/users", icon: Users },
        { label: "Properties", href: "/admin-dashboard/properties", icon: Building2 },
        { label: "Reports", href: "/admin-dashboard/reports", icon: BarChart3 },
        { label: "Settings", href: "/admin-dashboard/settings", icon: Wrench },
    ],
    LANDLORD: [
        { label: "Overview", href: "/landlord-dashboard", icon: LayoutDashboard },
        { label: "My Properties", href: "/landlord-dashboard/properties", icon: Building2 },
        { label: "Applications", href: "/landlord-dashboard/applications", icon: ClipboardList },
        { label: "Payments", href: "/landlord-dashboard/payments", icon: CreditCard },
        { label: "Reviews", href: "/landlord-dashboard/reviews", icon: Star },
        { label: "Messages", href: "/landlord-dashboard/messages", icon: MessageSquare },
    ],
    TENANT: [
        { label: "Overview", href: "/tenant-dashboard", icon: LayoutDashboard },
        { label: "Browse", href: "/properties", icon: Search },
        { label: "My Rentals", href: "/tenant-dashboard/rentals", icon: KeyRound },
        { label: "Applications", href: "/tenant-dashboard/applications", icon: FileText },
        { label: "Payments", href: "/tenant-dashboard/payments", icon: CreditCard },
        { label: "Messages", href: "/tenant-dashboard/messages", icon: MessageSquare },
    ],
};

const roleMeta: Record<string, { label: string; color: string; bg: string }> = {
    ADMIN: {
        label: "Admin",
        color: "text-violet-700 dark:text-violet-400",
        bg: "bg-violet-100 dark:bg-violet-900/30",
    },
    LANDLORD: {
        label: "Landlord",
        color: "text-emerald-700 dark:text-emerald-400",
        bg: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    TENANT: {
        label: "Tenant",
        color: "text-sky-700 dark:text-sky-400",
        bg: "bg-sky-100 dark:bg-sky-900/30",
    },
};

// ─── Helper ───────────────────────────────────────────────────────────────────

function getInitials(name: string) {
    return name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase();
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardNavbar({ ...user }: IUser) {
    const router = useRouter();
    const pathname = usePathname();

    const role = user?.data?.profile?.role ?? "TENANT";
    const profile = user?.data?.profile;
    const navItems = roleNavItems[role] ?? roleNavItems.TENANT;
    const meta = roleMeta[role] ?? roleMeta.TENANT;
    const initials = profile?.name ? getInitials(profile.name) : "U";
    const avatarUrl = profile?.profile?.profilePhoto ?? "";

    const handleLogout = async () => {
        await logout();
        toast.success("Logged out successfully");
        router.push("/");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">

                {/* ── Left: Menu Button + Logo + Role Badge ── */}
                <div className="flex items-center gap-3">
                    {/* Navigation Sheet Trigger */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon-sm" className="text-muted-foreground hover:text-foreground">
                                <PanelLeftOpen className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="left" className="flex w-72 flex-col p-0">
                            {/* Sheet Header */}
                            <div className="flex items-center gap-3 border-b px-4 py-4">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                    <Home className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">
                                        Nest<span className="text-primary">Rent</span>
                                    </p>
                                    <span
                                        className={cn(
                                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                                            meta.color,
                                            meta.bg
                                        )}
                                    >
                                        <ShieldCheck className="h-2.5 w-2.5" />
                                        {meta.label}
                                    </span>
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="flex items-center gap-3 bg-muted/40 px-4 py-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={avatarUrl} />
                                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium">{profile?.name}</p>
                                    <p className="truncate text-xs text-muted-foreground">{profile?.email}</p>
                                </div>
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-3">
                                <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                                    Navigation
                                </p>
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive =
                                        pathname === item.href ||
                                        (item.href !== "/" && pathname.startsWith(item.href + "/"));
                                    return (
                                        <SheetClose asChild key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                                    isActive
                                                        ? "bg-primary/10 text-primary"
                                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                )}
                                            >
                                                <Icon className="h-4 w-4 shrink-0" />
                                                {item.label}
                                            </Link>
                                        </SheetClose>
                                    );
                                })}
                            </nav>

                            {/* Sheet Footer */}
                            <div className="border-t px-3 py-3 space-y-1">
                                <SheetClose asChild>
                                    <Link
                                        href="/"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                    >
                                        <Home className="h-4 w-4" />
                                        Go to Homepage
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link
                                        href={`/${role.toLowerCase()}-dashboard/profile`}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                    >
                                        <User className="h-4 w-4" />
                                        Profile
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link
                                        href={`/${role.toLowerCase()}-dashboard/settings`}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                    >
                                        <Settings className="h-4 w-4" />
                                        Settings
                                    </Link>
                                </SheetClose>
                                <Separator className="my-2" />
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Log out
                                </button>
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow transition-transform group-hover:scale-105">
                            <Home className="h-4 w-4" />
                        </div>
                        <span className="hidden text-lg font-bold tracking-tight sm:block">
                            Nest<span className="text-primary">Rent</span>
                        </span>
                    </Link>

                    <Separator orientation="vertical" className="hidden h-5 sm:block" />

                    {/* Role Badge */}
                    <span
                        className={cn(
                            "hidden rounded-full px-2.5 py-0.5 text-xs font-semibold sm:inline-flex items-center gap-1",
                            meta.color,
                            meta.bg
                        )}
                    >
                        <ShieldCheck className="h-3 w-3" />
                        {meta.label}
                    </span>
                </div>

                {/* ── Right: Notifications + User Menu ── */}
                <div className="flex items-center gap-2">
                    {/* Notification Bell */}
                    <Button variant="ghost" size="icon-sm" className="relative text-muted-foreground hover:text-foreground">
                        <Bell className="h-4 w-4" />
                        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
                    </Button>

                    {/* User Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted focus:outline-none">
                                <Avatar className="h-7 w-7">
                                    <AvatarImage src={avatarUrl} alt={profile?.name} />
                                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="hidden flex-col text-left lg:flex">
                                    <span className="max-w-[120px] truncate text-sm font-medium leading-tight">
                                        {profile?.name}
                                    </span>
                                    <span className="max-w-[120px] truncate text-xs text-muted-foreground leading-tight">
                                        {profile?.email}
                                    </span>
                                </div>
                                <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground lg:block" />
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={avatarUrl} />
                                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="truncate text-sm font-medium">{profile?.name}</span>
                                        <span className="truncate text-xs text-muted-foreground">{profile?.email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem asChild>
                                <Link href="/" className="cursor-pointer">
                                    <Home className="mr-2 h-4 w-4" />
                                    Go to Homepage
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/${role.toLowerCase()}-dashboard`} className="cursor-pointer">
                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                    Dashboard
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/${role.toLowerCase()}-dashboard/profile`} className="cursor-pointer">
                                    <User className="mr-2 h-4 w-4" />
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/${role.toLowerCase()}-dashboard/settings`} className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="text-rose-600 focus:text-rose-600 focus:bg-rose-50 cursor-pointer"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
