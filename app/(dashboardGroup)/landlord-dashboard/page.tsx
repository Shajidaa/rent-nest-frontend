import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Clock, DollarSign, Star } from "lucide-react";
import { fetchRentalRequest } from "./_action/rental-request";

export default async function LandlordDashboard() {
  const response = await fetchRentalRequest()
  
 
    const {total} = response || []
    
  
    
  const stats = [
    {
      title: "My Properties",
      value: total,
      icon: Building2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Occupied",
      value: "9",
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Monthly Income",
      value: "$24.5k",
      icon: DollarSign,
      color: "text-orange-600",
      bg: "bg-orange-50",
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Landlord Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage your properties and track your rental business.
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
          <CardTitle>Property Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Your properties list will appear here...</p>
        </CardContent>
      </Card>
    </div>
  );
}
