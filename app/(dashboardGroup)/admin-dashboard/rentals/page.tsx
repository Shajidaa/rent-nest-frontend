
import {
  KeyRound,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  DollarSign,
  UsersRound,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getRentals } from "../_actions/adminAction";
import { StatsCard } from "../_component/statsCard";
import { StatusBadge } from "../_component/statusBage";
import { Pagination } from "../_component/pagination";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function RentalsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;
  const res = await getRentals(page, limit);
  const rentals = res?.data || [];
  const meta = res?.meta || { page: 1, limit: 10, total: 0, totalPages: 0 };
  // Calculate stats
  const totalRentals = meta.total;
  const pendingCount = rentals.filter(
    (r: any) => r.status === "PENDING"
  ).length;
  const approvedCount = rentals.filter(
    (r: any) => r.status === "APPROVED"
  ).length;
  const rejectedCount = rentals.filter(
    (r: any) => r.status === "REJECTED"
  ).length;
   return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
        
          title="Total Requests"
          value={totalRentals}
          subtitle="All rental applications"
          icon={KeyRound}
          variant="primary"
        />
        <StatsCard
          title="Pending"
          value={pendingCount}
          subtitle="Awaiting review"
          icon={Clock}
          variant="warning"
        />
        <StatsCard
          title="Approved"
          value={approvedCount}
          subtitle="Accepted requests"
          icon={CheckCircle2}
          variant="success"
        />
        <StatsCard
          title="Rejected"
          value={rejectedCount}
          subtitle="Declined requests"
          icon={XCircle}
          variant="danger"
        />
      </div>
      {/* Table */}
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h3 className="text-base font-semibold text-foreground">
            All Rental Requests
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Track and manage all rental applications across the platform.
          </p>
        </div> <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 pl-5">
                  Tenant
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Property
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Duration
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Offered Rent
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Guests
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Updated
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rentals.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-12 text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <KeyRound className="h-8 w-8 text-muted-foreground/40" />
                      <p className="text-sm">No rental requests found.</p>
                    </div>
                  </TableCell>
                </TableRow>) : (
                rentals.map((rental: any) => {
                  const startDate = rental.startDate
                    ? new Date(rental.startDate)
                    : null;
                  const endDate = rental.endDate
                    ? new Date(rental.endDate)
                    : null;
                  const duration =
                    startDate && endDate
                      ? Math.ceil(
                          (endDate.getTime() - startDate.getTime()) /
                            (1000 * 60 * 60 * 24)
                        )
                      : null; 
                   return (
                    <TableRow
                      key={rental.id}
                      className="border-border/30 transition-colors hover:bg-accent/30"
                    >
                      <TableCell className="pl-5">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs font-semibold bg-sky-500/10 text-sky-500">
                              {rental.tenant?.name
                                ? rental.tenant.name
                                    .split(" ")
                                    .map((n: string) => n[0])
                                    .join("")
                                    .toUpperCase()
                                : "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm text-foreground">
                              {rental.tenant?.name || "Unknown"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {rental.tenant?.email || ""}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-foreground font-medium truncate max-w-[180px]">
                          {rental.property?.title || "N/A"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {rental.property?.city
                            ? `${rental.property.area}, ${rental.property.city}`
                            : ""}
                        </p>
                      </TableCell>
                        
                         
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm font-semibold text-foreground">
                            ৳{rental.offeredRent?.toLocaleString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <UsersRound className="h-3.5 w-3.5" />
                          {rental.numberOfGuests ?? "—"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={rental.status} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {rental.updateAt
                          ? new Date(rental.updateAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )
                          : "—"}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
        {/* Pagination */}
        <div className="p-5 border-t border-border/50">
          <Pagination
            currentPage={meta.page}
            totalPages={meta.totalPages}
            total={meta.total}
            limit={meta.limit}
          />
        </div>
      </div>
    </div>
  );
}