import Link from "next/link";
import { fetchRental } from "../_action/rentalRequest";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  BedDouble,
  Bath,
  CalendarDays,
  Users,
  ArrowRight,
  Home,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Rental, RentalResponse } from "@/lib/rental-type";






// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusConfig = {
  PENDING: {
    label: "Pending",
    icon: Clock,
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  APPROVED: {
    label: "Approved",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-rose-50 text-rose-700 border-rose-200",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: AlertCircle,
    className: "bg-slate-50 text-slate-600 border-slate-200",
  },
};

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function RentalPage() {
  const result: RentalResponse = await fetchRental();
  const rentals: Rental[] = result?.data ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Rentals</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {rentals.length} rental{rentals.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/properties">
            <Home className="h-4 w-4" />
            Browse Properties
          </Link>
        </Button>
      </div>

      {/* Empty state */}
      {rentals.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="rounded-full bg-muted p-4">
              <Home className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="font-semibold text-lg">No rentals yet</p>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              You haven&apos;t applied for any rentals. Start browsing available properties.
            </p>
            <Button asChild className="mt-2">
              <Link href="/properties">Browse Properties</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Rental cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rentals.map((rental) => {
          const property = rental.property;
          const status = statusConfig[rental.status] ?? statusConfig.PENDING;
          const StatusIcon = status.icon;
          const coverImage = property?.images?.[0];

          return (
            <Card
              key={rental.id}
              className="overflow-hidden p-0 gap-0 transition-shadow hover:shadow-lg"
            >
              {/* Property Image */}
              <div className="relative h-44 w-full bg-muted">
                {coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={coverImage}
                    alt={property?.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Home className="h-10 w-10 text-muted-foreground/40" />
                  </div>
                )}

                {/* Status badge on image */}
                <div className="absolute left-3 top-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${status.className}`}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {status.label}
                  </span>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                {/* Title & location */}
                <div>
                  <h3 className="font-semibold text-base leading-tight line-clamp-1">
                    {property?.title ?? "Property"}
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3 shrink-0" />
                    {property?.area}, {property?.city}
                  </p>
                </div>

                {/* Property quick stats */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground border-y py-2.5">
                  <span className="flex items-center gap-1">
                    <BedDouble className="h-3.5 w-3.5" />
                    {property?.bedrooms} bed
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-3.5 w-3.5" />
                    {property?.bathrooms} bath
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {rental.numberOfGuests} guest{rental.numberOfGuests !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Rental info */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      Duration
                    </span>
                    <span className="font-medium">
                      {formatDate(rental.startDate)} → {formatDate(rental.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Offered Rent</span>
                    <span className="font-semibold text-primary text-sm">
                      {formatCurrency(rental.offeredRent)}
                      <span className="text-muted-foreground font-normal">/mo</span>
                    </span>
                  </div>
                  {rental.rejectionReason && (
                    <div className="rounded-lg bg-rose-50 border border-rose-100 px-2.5 py-2 text-rose-700 text-xs">
                      <span className="font-medium">Reason: </span>
                      {rental.rejectionReason}
                    </div>
                  )}
                </div>

                {/* View property button */}
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full mt-1"
                >
                  <Link href={`/properties/${rental.propertyId}`}>
                    View Property
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
