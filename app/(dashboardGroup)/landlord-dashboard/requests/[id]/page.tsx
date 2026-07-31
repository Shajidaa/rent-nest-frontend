/* eslint-disable @typescript-eslint/no-explicit-any */


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { fetchPropertyRequests } from "../../_action/rental-request";
import { Button } from "@/components/ui/button";

interface PropertyRequestsProps {
  params: {
    propertyId: string
  }
}

export default async function PropertyRequestsPage({ params }: PropertyRequestsProps) {
  const { id} = await params;
  const propertyId= id 
  const response = await fetchPropertyRequests(propertyId);
// console.log(response);

  
  
  const requests = response.data.requests || [];
console.log(requests)
  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Property Requests</h2>
        <p className="text-sm text-muted-foreground">
          Users who have requested this rental property.
        </p>
      </div>

      <div className="border rounded-md bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tenant Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Request Status</TableHead>
              <TableHead>Requested At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length > 0 ? (
              requests.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.tenant?.name || 'N/A'}
                  </TableCell>
                  
                  <TableCell>
                    {item.tenant?.email || 'N/A'}
                  </TableCell>

                  <TableCell>
                    <Badge variant={item.status === "PENDING" ? "outline" : "default"}>
                      {item.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(item.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                   <div className=" flex flex-row gap-3">
                    <Button>Accept</Button>
                    <Button>Cancel</Button>
                   </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                  No requests found for this property.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}