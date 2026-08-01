"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
const pageTitles: Record<string, string> = {
  "/admin-dashboard": "Dashboard Overview",
  "/admin-dashboard/users": "User Management",
  "/admin-dashboard/properties": "Property Management",
  "/admin-dashboard/rentals": "Rental Requests",
};
export function AdminTopbar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const title = pageTitles[pathname] || "Admin Dashboard";
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border/40 bg-background/80 backdrop-blur-xl flex items-center justify-between px-6 lg:px-8">
      <div className="flex flex-col gap-0.5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link href="/admin-dashboard" className="hover:text-foreground transition-colors">
            Admin
          </Link>
          {segments.slice(1).map((segment, i) => (
            <span key={segment} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3" />
              <span className={i === segments.length - 2 ? "text-foreground font-medium" : ""}>
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </span>
            </span>
          ))}
        </nav>
        {/* Title */}
        <h1 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h1>
      </div>
      {/* Right side — date */}
      <div className="hidden sm:flex items-center gap-3">
        <div className="text-xs text-muted-foreground font-medium">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
    </header>
  );
}