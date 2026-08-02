import { IProperty } from "@/lib/type";
import { Bath, BedDouble, MapPin, Maximize2 } from "lucide-react";
import Link from "next/link";

export default function FeaturedCard({ property }: { property: IProperty }) {
  const cover = property.images?.[0];

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group flex flex-col w-full rounded-2xl overflow-hidden border border-border/60 bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-muted">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={property.title || "Property image"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-4xl">
            🏠
          </div>
        )}

        {/* Gradient Overlay for better badge readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />

        {/* Available / Occupied Badge */}
        <div className="absolute left-3 top-3 z-10">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-md backdrop-blur-md transition-colors ${
              property.isAvailable
                ? "bg-emerald-500/90 text-white"
                : "bg-slate-700/90 text-white"
            }`}
          >
            {property.isAvailable ? "Available" : "Occupied"}
          </span>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-3 right-3 z-10 rounded-xl bg-white/95 dark:bg-zinc-900/95 px-3.5 py-1.5 shadow-lg backdrop-blur-md border border-white/20">
          <span className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400">
            ৳{property.price_per_month?.toLocaleString()}
          </span>
          <span className="text-[10px] text-muted-foreground font-medium ml-0.5">/mo</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow justify-between gap-4 p-4 sm:p-5">
        <div className="space-y-1.5">
          <h3 className="font-semibold text-base sm:text-lg leading-snug line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <p className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/80" />
            <span className="truncate">{property.area}, {property.city}</span>
          </p>
        </div>

        {/* Features / Amenities Footer */}
        <div className="grid grid-cols-3 items-center gap-2 border-t border-border/60 pt-3 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 shrink-0 text-primary/70" />
            <span>{property.bedrooms} <span className="hidden xs:inline">Bed</span></span>
          </div>
          <div className="flex items-center gap-1.5 border-x border-border/60 px-2">
            <Bath className="h-4 w-4 shrink-0 text-primary/70" />
            <span>{property.bathrooms} <span className="hidden xs:inline">Bath</span></span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <Maximize2 className="h-3.5 w-3.5 shrink-0 text-primary/70" />
            <span className="truncate">{property.size} {property.sizeUnit}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}