/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fetchPropertyRequests } from "../../_action/rental-request";
import RequestActionButtons from "./_components/RequestActionButtons";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const statusVariant: Record<string, string> = {
  PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
  APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-slate-100 text-slate-600 border-slate-200",
  REJECTED: "bg-rose-50 text-rose-700 border-rose-200",
};

export default async function PropertyRequestsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: propertyId } = await params;
  const response = await fetchPropertyRequests(propertyId);
  const requests = response?.data?.requests ?? [];
  // console.log(requests);

  return (
    <div className="p-6 space-y-4">
      <div>
          <Link href={'/landlord-dashboard/requests'}> <div className="flex pb-5 text-primary">
            <ArrowLeft/> Back
          </div></Link>
        <h2 className="text-2xl font-bold tracking-tight">Property Requests</h2>
        <p className="text-sm text-muted-foreground">
          Users who have requested this rental property.
        </p>
      </div>

      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Tenant Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Offered Rent</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length > 0 ? (
              requests.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.tenant?.name ?? "N/A"}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {item.tenant?.email ?? "N/A"}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusVariant[item.status] ?? statusVariant.PENDING
                        }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(item.startDate).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>

                  <TableCell className="font-semibold">
                    ${item.offeredRent?.toLocaleString() ?? "—"}
                    <span className="text-xs font-normal text-muted-foreground">/mo</span>
                  </TableCell>

                  <TableCell>
                    <RequestActionButtons
                      requestId={item.id}
                      propertyId={propertyId}
                      currentStatus={item.status}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-24 text-muted-foreground"
                >
                  No requests found for this property.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
