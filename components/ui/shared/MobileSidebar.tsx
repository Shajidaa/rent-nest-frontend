"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { IUser } from "@/lib/type";
import DashboardSidebar from "./DashboardSidebar";

interface MobileSidebarProps {
    user: IUser;
}

export default function MobileSidebar({ user }: MobileSidebarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
                <DashboardSidebar {...user} onClose={() => setIsOpen(false)} />
            </SheetContent>
        </Sheet>
    );
}