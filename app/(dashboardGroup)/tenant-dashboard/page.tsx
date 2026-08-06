/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, FileText, CreditCard, MessageSquare } from "lucide-react";
import { OverviewChart } from "./_components/OverviewChart";
import { fetchRental } from "./_action/rentalRequest";

export  default async function TenantDashboard() {
   const result = await fetchRental();
    const rentals = result?.data ?? [];
    
    // Function to filter only rented properties
    const getRentedProperties = (rentalsData :any) => {
        return rentalsData.filter((rental: any) => 
            rental.status === 'PAID' && 
            rental.property?.status === 'RENTED'
        );
    };

    const rentedProperties = getRentedProperties(rentals);
    
    const totalPayment=rentedProperties.reduce((sum :number, item:any) => sum + item?.offeredRent, 0)
  // console.log(totalPayment);
    const rentalLength=rentedProperties.length;

  const total=rentals.length
  
  const stats = [
    {
      title: "Current Rental",
      value: rentalLength,
      icon: Home,
      color: "text-sky-600",
      bg: "bg-sky-50",
    },
    {
      title: "Applications",
      value: total,  
      icon: FileText,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: " Payment",
      value: totalPayment,
      icon: CreditCard,
      color: "text-orange-600",
      bg: "bg-orange-50",
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tenant Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here&rsquo;s an overview of your rental activity.
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Your Active Rental</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Rental details will appear here...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
