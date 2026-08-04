import Link from "next/link";
import { fetchRental } from "../_action/rentalRequest";
import PaymentButton from "../_components/PaymentButton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
  DollarSign,
  Building2,
  TrendingUp,
  FileX,
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

// ─── Rental Card ──────────────────────────────────────────────────────────────

function RentalCard({ rental }: { rental: Rental }) {
  const property = rental.property;
  // const status = statusConfig[rental?.status] ;
  // const StatusIcon = status.icon;
  const coverImage = property?.images?.[0];
// console.log("Rental Card Property:", property);
  return (
    <Card className="overflow-hidden p-0 gap-0 flex flex-col group transition-all hover:shadow-xl hover:-translate-y-0.5 duration-200">
      {/* Image */}
      <div className="relative h-48 w-full bg-muted shrink-0">
        {coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt={property?.title ?? "Property"}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground/40">
            <Building2 className="h-12 w-12" />
            <span className="text-xs">No image available</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Status badge */}
        <div className="absolute left-3 top-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${rental?.status}`}>
         
           
            {rental?.status}
          </span>
        </div>

        {/* Price chip */}
        <div className="absolute bottom-3 right-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-800 shadow-sm">
            {formatCurrency(rental.offeredRent)}
            <span className="font-normal text-slate-500">/mo</span>
          </span>
        </div>
      </div>

      {/* Body */}
      <CardContent className="flex-1 p-4 space-y-3">
        {/* Title & location */}
        <div>
          <h3 className="font-semibold text-base leading-snug line-clamp-1 group-hover:text-primary transition-colors">
            {property?.title ?? "Property"}
          </h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <MapPin className="h-3 w-3 shrink-0 text-rose-400" />
            {property?.area}, {property?.city}
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted/50 px-3 py-2.5">
          <div className="flex flex-col items-center gap-0.5 text-center">
            <BedDouble className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium">{property?.bedrooms}</span>
            <span className="text-[10px] text-muted-foreground">Beds</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 text-center border-x border-border">
            <Bath className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium">{property?.bathrooms}</span>
            <span className="text-[10px] text-muted-foreground">Baths</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 text-center">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium">{rental.numberOfGuests}</span>
            <span className="text-[10px] text-muted-foreground">Guests</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-xs">
          <CalendarDays className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <span className="text-muted-foreground">Duration:</span>
          <span className="font-medium ml-auto text-right">
            {formatDate(rental.startDate)} — {formatDate(rental.endDate)}
          </span>
        </div>

        {/* Rejection reason */}
        {rental.rejectionReason && (
          <div className="flex gap-2 rounded-lg bg-rose-50 border border-rose-100 px-3 py-2.5">
            <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold text-rose-700">Rejection reason: </span>
              <span className="text-rose-600">{rental.rejectionReason}</span>
            </div>
          </div>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col gap-2 p-4 pt-0">
        {rental.status === "APPROVED" && (
          <PaymentButton rentalRequestId={rental.id} />
        )}
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={`/properties/${rental.propertyId}`}>
            View Property
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Link>
        </Button>
      </CardFooter>
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
            icon={CheckCircle2}
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

      {/* Grid */}
      {rentals.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {rentals.map((rental) => (
            <RentalCard key={rental.id} rental={rental} />
          ))}
        </div>
      )}
    </div>
  );
}
