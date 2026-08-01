          "use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  KeyRound,
  ChevronLeft,
  ChevronRight,
  Shield,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
const navItems = [
  { name: "Overview", href: "/admin-dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/admin-dashboard/users", icon: Users },
  { name: "Properties", href: "/admin-dashboard/properties", icon: Building2 },
  { name: "Rentals", href: "/admin-dashboard/rentals", icon: KeyRound },
];
function SidebarContent({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border/50 shrink-0">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
          <Shield className="h-5 w-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="flex flex-col overflow-hidden">
            <span className="font-bold text-base tracking-tight text-foreground">
              Press Admin
            </span>
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
              Dashboard
            </span>
          </div>
        )}
      </div>
      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        <span className={cn(
          "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2",
          collapsed ? "px-0 text-center" : "px-3"
        )}>
          {collapsed ? "•••" : "Navigation"}
        </span>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin-dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-foreground",
                isActive ? "bg-accent text-foreground" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-foreground",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          {!collapsed && <span>Back to Site</span>}
        </Link>
        
    
      </nav>
      {/* Footer */}
      <div className="p-3 border-t border-border/50">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent/60 hover:text-foreground transition-all duration-200",
            collapsed && "justify-center px-2"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          {!collapsed && <span>Back to Site</span>}
        </Link>
      </div>
    </div>
  );          


export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r border-border/40 bg-card/60 backdrop-blur-2xl transition-all duration-300 ease-out hidden lg:block",
          collapsed ? "w-[72px]" : "w-64"
        )}
      >
        <SidebarContent collapsed={collapsed} />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-border bg-card shadow-md flex items-center justify-center hover:bg-accent transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          ) : (
            <ChevronLeft className="h-3 w-3 text-muted-foreground" />
          )}
        </button>
      </aside>
      {/* Desktop spacer */}
      <div
        className={cn(
          "hidden lg:block shrink-0 transition-all duration-300",
          collapsed ? "w-[72px]" : "w-64"
        )}
      />
      {/* Mobile Sheet Trigger */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 w-9 bg-card/80 backdrop-blur-xl shadow-lg">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-card/95 backdrop-blur-2xl">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}