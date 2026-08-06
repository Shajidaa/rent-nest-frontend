"use client";

import { Menu, Bell, Search, Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DashboardSidebar from "./DashboardSidebar";
import { IUser } from "@/lib/type";
import { ModeToggle } from "./ModeToggle";

export default function DashboardTopbar({ ...user }: IUser) {
    return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur px-4 lg:px-6">
            {/* ── Left: Mobile menu + Search ── */}
            <div className="flex items-center gap-3">
                {/* Mobile Sidebar Toggle */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon-sm" className="lg:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72 p-0">
                        <DashboardSidebar {...user} />
                    </SheetContent>
                </Sheet>

                {/* Search Bar */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Search properties, users..."
                        className="h-9 w-64 rounded-lg border bg-muted/30 pl-9 pr-3 text-sm outline-none ring-offset-background transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
                    />
                </div>
            </div>

            {/* ── Right: Actions ── */}
            <div className="flex items-center gap-2">
                {/* Mobile Search Icon */}
                <Button variant="ghost" size="icon-sm" className="md:hidden">
                    <Search className="h-4 w-4" />
                </Button>

                {/* Theme Switcher */}
              <ModeToggle/>

                {/* Notifications */}
                <Button variant="ghost" size="icon-sm" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
                    <span className="sr-only">Notifications</span>
                </Button>
            </div>
        </header>
    );
}
