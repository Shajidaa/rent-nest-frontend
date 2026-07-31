import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, FileText, CreditCard, MessageSquare } from "lucide-react";

export default function TenantDashboard() {
  const stats = [
    {
      title: "Current Rental",
      value: "1",
      icon: Home,
      color: "text-sky-600",
      bg: "bg-sky-50",
    },
    {
      title: "Applications",
      value: "3",
      icon: FileText,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Due Payment",
      value: "$1,200",
      icon: CreditCard,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Messages",
      value: "5",
      icon: MessageSquare,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tenant Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's an overview of your rental activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-lg p-2 ${stat.bg}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Active Rental</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Rental details will appear here...</p>
        </CardContent>
      </Card>
    </div>
  );
}
