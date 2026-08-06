import Link from "next/link";
import { fetchRental } from "../_action/rentalRequest";
import PaymentButton from "../_components/PaymentButton";
import ReviewButton from "../_components/ReviewButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MapPin,
  BedDouble,
  Bath,
  CalendarDays,
  Users,
  ArrowRight,
  Home,
  DollarSign,
  Building2,
  TrendingUp,
  FileX,
  XCircle,
} from "lucide-react";
import { Rental, RentalResponse } from "@/lib/rental-type";

// ─── Status Config ─────────────────────────────────────────────────────────────

const statusConfig = {
  PENDING: {
    label: "Pending",
    badge: "bg-amber-50 text-amber-700 border border-amber-200",
    dot: "bg-amber-400",
  },
  APPROVED: {
    label: "Approved",
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    dot: "bg-emerald-500",
  },
  REJECTED: {
    label: "Rejected",
    badge: "bg-rose-50 text-rose-700 border border-rose-200",
    dot: "bg-rose-500",
  },
  RENTED: {
    label: "Rented",
    badge: "bg-violet-50 text-violet-700 border border-violet-200",
    dot: "bg-violet-500",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  bg,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  bg: string;
}) {
  return (
    <Card className="flex-1 min-w-0">
      <CardContent className="flex items-center gap-4 p-5">
        <div className={`rounded-xl p-3 ${bg} shrink-0`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground font-medium truncate">{label}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function RentalPage() {
  const result: RentalResponse = await fetchRental();
  const rentals: Rental[] = result?.data ?? [];

  const approved = rentals.filter((r) => r.status === "APPROVED").length;
  const pending = rentals.filter((r) => r.status === "PENDING").length;
  const totalRent = rentals
    .filter((r) => r.status === "APPROVED")
    .reduce((sum, r) => sum + r.offeredRent, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Rentals</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage and track all your rental applications
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/properties">
            <Home className="h-4 w-4 mr-1.5" />
            Browse Properties
          </Link>
        </Button>
      </div>

      {/* Stats */}
      {rentals.length > 0 && (
        <div className="flex flex-wrap gap-3">
          <StatCard
            label="Total Rentals"
            value={rentals.length}
            icon={Building2}
            color="text-sky-600"
            bg="bg-sky-50"
          />
          <StatCard
            label="Active Rentals"
            value={approved}
            icon={Building2} // Can switch back to CheckCircle2 if imported
            color="text-emerald-600"
            bg="bg-emerald-50"
          />
          <StatCard
            label="Pending"
            value={pending}
            icon={TrendingUp}
            color="text-amber-600"
            bg="bg-amber-50"
          />
          <StatCard
            label="Monthly Rent"
            value={formatCurrency(totalRent)}
            icon={DollarSign}
            color="text-violet-600"
            bg="bg-violet-50"
          />
        </div>
      )}

      <Separator />

      {/* Empty state */}
      {rentals.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="rounded-full bg-muted p-5">
              <FileX className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="text-center space-y-1">
              <p className="font-semibold text-lg">No rentals yet</p>
              <p className="text-sm text-muted-foreground max-w-xs">
                You haven&apos;t applied for any rentals. Browse available properties to get started.
              </p>
            </div>
            <Button asChild className="mt-1">
              <Link href="/properties">
                <Home className="h-4 w-4 mr-1.5" />
                Browse Properties
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Table view */}
      {rentals.length > 0 && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[300px]">Property</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Offered Rent</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rentals.map((rental) => {
                  const property = rental.property;
                  const coverImage = property?.images?.[0];

                  return (
                    <TableRow key={rental.id} className="group hover:bg-muted/40 transition-colors">
                      {/* Property Info */}
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-16 rounded-md bg-muted shrink-0 overflow-hidden">
                            {coverImage ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={coverImage}
                                alt={property?.title ?? "Property"}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-muted-foreground/40">
                                <Building2 className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <Link
                              href={`/properties/${rental.propertyId}`}
                              className="font-semibold text-sm leading-snug line-clamp-1 hover:text-primary transition-colors"
                            >
                              {property?.title ?? "Property"}
                            </Link>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 truncate">
                              <MapPin className="h-3 w-3 shrink-0 text-rose-400" />
                              {property?.area}, {property?.city}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <div className="space-y-1">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${rental?.status}`}
                          >
                            {rental?.status}
                          </span>
                          {rental.rejectionReason && (
                            <div className="flex items-center gap-1 text-[11px] text-rose-600 max-w-[200px] truncate">
                              <XCircle className="h-3 w-3 shrink-0" />
                              <span title={rental.rejectionReason}>{rental.rejectionReason}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>

                      {/* Offered Rent */}
                      <TableCell>
                        <span className="font-bold text-slate-800">
                          {formatCurrency(rental.offeredRent)}
                        </span>
                        <span className="text-xs font-normal text-muted-foreground">/mo</span>
                      </TableCell>

                      {/* Details (Beds/Baths/Guests) */}
                      <TableCell>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1" title="Bedrooms">
                            <BedDouble className="h-3.5 w-3.5" />
                            {property?.bedrooms}
                          </span>
                          <span className="flex items-center gap-1" title="Bathrooms">
                            <Bath className="h-3.5 w-3.5" />
                            {property?.bathrooms}
                          </span>
                          <span className="flex items-center gap-1" title="Guests">
                            <Users className="h-3.5 w-3.5" />
                            {rental.numberOfGuests}
                          </span>
                        </div>
                      </TableCell>

                      {/* Duration */}
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
                          <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                          <span>
                            {formatDate(rental.startDate)} — {formatDate(rental.endDate)}
                          </span>
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {rental.status === "APPROVED" && (
                            <PaymentButton rentalRequestId={rental.id} />
                          )}
                         
                          <Button asChild  variant="outline" size="sm">
                            <Link href={`/properties/${rental.propertyId}`}>
                              View
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  );
}