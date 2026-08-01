
import {
  Building2,
  DollarSign,
  Eye,
  MapPin,
  BedDouble,
  Bath,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProperties } from "../_actions/adminAction";
import { StatsCard } from "../_component/statsCard";
import { StatusBadge } from "../_component/statusBage";
import { Pagination } from "../_component/pagination";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;
  const res = await getProperties(page, limit);
  const properties = res?.data || [];
  const meta = res?.meta || { page: 1, limit: 10, total: 0, totalPages: 0 };
 // Calculate stats
  const totalProperties = meta.total;
  const availableCount = properties.filter(
    (p: any) => p.isAvailable
  ).length;
  const rentedCount = properties.filter(
    (p: any) => p.status === "RENTED"
  ).length;
  const totalViews = properties.reduce(
    (sum: number, p: any) => sum + (p.views || 0),
    0
  );
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Properties"
          value={totalProperties}
          subtitle="All listed properties"
          icon={Building2}
          variant="primary"
        />
        <StatsCard
          title="Available"
          value={availableCount}
          subtitle={`of ${properties.length} on this page`}
          icon={Building2}
          variant="success"
        />
        <StatsCard
          title="Rented"
          value={rentedCount}
          subtitle={`of ${properties.length} on this page`}
          icon={DollarSign}
          variant="warning"
        />
        <StatsCard
          title="Total Views"
          value={totalViews}
          subtitle="Combined page views"
          icon={Eye}
          variant="default"
        />
      </div>
      {/* Table */}
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h3 className="text-base font-semibold text-foreground">
            All Properties
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Browse and manage all marketplace property listings.
          </p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 pl-5">
                  Property
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Location
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Details
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Price / Month
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Views
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Created
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-12 text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Building2 className="h-8 w-8 text-muted-foreground/40" />
                      <p className="text-sm">No properties found.</p>
                    </div>
                  </TableCell>
                </TableRow>      ) : (
                properties.map((property: any) => (
                  <TableRow
                    key={property.id}               className="border-border/30 transition-colors hover:bg-accent/30"
                  >
                    <TableCell className="pl-5">
                      <div className="flex items-center gap-3">
                        {/* Property thumbnail */}
                        <div className="h-10 w-14 rounded-lg bg-muted/50 overflow-hidden shrink-0 border border-border/30">
                          {property.images && property.images.length > 0 ? (
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <Building2 className="h-4 w-4 text-muted-foreground/40" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm text-foreground truncate max-w-[200px]">
                            {property.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {property.size} {property.sizeUnit?.toLowerCase()} • {property.preferredTenant?.toLowerCase()}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate max-w-[120px]">
                          {property.area}, {property.city}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BedDouble className="h-3.5 w-3.5" />
                          {property.bedrooms}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="h-3.5 w-3.5" />
                          {property.bathrooms}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-semibold text-foreground">
                        ৳{property.price_per_month?.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={property.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Eye className="h-3.5 w-3.5" />
                        {property.views}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(property.createdAt).toLocaleDateString(
                        "en-US",{
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </TableCell>
                  </TableRow>
                ))
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