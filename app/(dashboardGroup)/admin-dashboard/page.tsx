
import {
  Users,
  Building2,
  KeyRound,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { getProperties, getRentals, getUsers } from "./_actions/adminAction";
import { StatsCard } from "./_component/statsCard";
export default async function AdminOverviewPage() {
  const [usersRes, propertiesRes, rentalsRes] = await Promise.all([
    getUsers(1, 1),
    getProperties(1, 1),
    getRentals(1, 1),
  ]);
  const totalUsers = usersRes?.meta?.total ?? 0;
  const totalProperties = propertiesRes?.meta?.total ?? 0;
  const totalRentals = rentalsRes?.meta?.total ?? 0;
  const quickLinks = [
    {
      title: "User Management",
      description: "View and manage all registered users, update roles and permissions.",
      href: "/admin-dashboard/users",
      icon: Users,
      count: totalUsers,
      gradient: "from-violet-500/10 to-violet-500/5",
      iconColor: "text-violet-500",
    },
    {
      title: "Property Listings",
      description: "Browse all marketplace properties, review status and availability.",
      href: "/admin-dashboard/properties",
      icon: Building2,
      count: totalProperties,
      gradient: "from-sky-500/10 to-sky-500/5",
      iconColor: "text-sky-500",
    },
    {
      title: "Rental Requests",
      description: "Monitor rental applications, approvals, and payment tracking.",
      href: "/admin-dashboard/rentals",
      icon: KeyRound,
      count: totalRentals,
      gradient: "from-emerald-500/10 to-emerald-500/5",
      iconColor: "text-emerald-500",
    },
  ];
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 via-card/50 to-card/30 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/[0.07] to-transparent rounded-bl-full" />
        <div className="relative">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back, Admin 👋
          </h2>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base max-w-lg">
            Here&rsquo;s what&rsquo;s happening with your platform today.
          </p>
        </div>
      </div>
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Users"
          value={totalUsers}
          subtitle="Registered accounts"
          icon={Users}
          variant="primary"
        />
        <StatsCard
          title="Properties"
          value={totalProperties}
          subtitle="Listed on marketplace"
          icon={Building2}
          variant="success"
        />
        <StatsCard
          title="Rental Requests"
          value={totalRentals}
          subtitle="Total applications"
          icon={KeyRound}
          variant="warning"
        />
        <StatsCard
          title="Platform Growth"
          value={`${totalUsers + totalProperties + totalRentals}`}
          subtitle="Total records"
          icon={TrendingUp}
          variant="default"
        />
      </div>
      {/* Quick Links */}
      <div>
        <h3 className="text-base font-semibold mb-4 text-foreground">Quick Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-5 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center`}>
                    <link.icon className={`h-5 w-5 ${link.iconColor}`} />
                  </div>
                  <span className="text-2xl font-bold text-foreground">
                    {link.count}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground mb-1">{link.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {link.description}
                </p>
                <div className="flex items-center gap-1 mt-3 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                  View all <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
