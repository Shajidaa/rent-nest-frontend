import Link from "next/link";
import {
  Search,
  BedDouble,
  Bath,
  MapPin,
  ArrowRight,
  Building2,
  ShieldCheck,
  Headphones,
  Star,
  CheckCircle2,
  Home,
  Users,
  TrendingUp,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchProperties } from "./_action/property";
import { IProperty } from "@/lib/type";
import Banner from "./_components/Home/Banner";
import MyContainer from "@/components/ui/shared/MyContainer";

export default async function HomePage() {
  const allProperties = await fetchProperties({});
  const featured: IProperty[] = Array.isArray(allProperties)
    ? allProperties.slice(0, 6)
    : [];

  return (
    <div className="flex flex-col">
      {/* ─────────────────── HERO ─────────────────── */}
    <Banner />
<MyContainer className="py-16">
      {/* ─────────────────── STATS ─────────────────── */}
   

      {/* ─────────────────── FEATURED PROPERTIES ─────────────────── */}
      <section className="bg-[#FAFAF8] py-16 dark:bg-muted/10">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Latest Listings
              </p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight">
                Featured Properties
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Hand-picked, recently listed properties across Bangladesh.
              </p>
            </div>
            <Button variant="outline" asChild className="hidden gap-2 md:flex">
              <Link href="/properties">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {featured.length === 0 ? (
            <div className="rounded-2xl border border-dashed py-20 text-center text-muted-foreground">
              No properties listed yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featured.map((property) => (
                <FeaturedCard key={property.id} property={property} />
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-center md:hidden">
            <Button variant="outline" asChild className="gap-2">
              <Link href="/properties">
                View All Properties <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─────────────────── HOW IT WORKS ─────────────────── */}
    

      {/* ─────────────────── PROPERTY TYPES ─────────────────── */}
   

      {/* ─────────────────── WHY CHOOSE US ─────────────────── */}
      <section className="bg-white py-20 dark:bg-background">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Why NestRent
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight leading-snug">
                The Smarter Way to <br />
                <span className="text-primary">Rent Property</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                We connect tenants and landlords directly — no middlemen, no hidden fees.
                Just a clean, transparent experience built for Bangladesh.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  { icon: ShieldCheck, text: "All properties are manually verified before listing" },
                  { icon: Star, text: "Transparent reviews from real tenants" },
                  { icon: Headphones, text: "Dedicated support 7 days a week" },
                  { icon: CheckCircle2, text: "Secure payments with instant confirmation" },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-emerald-50 p-1.5">
                      <item.icon className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex gap-3">
                <Button asChild className="gap-2">
                  <Link href="/properties">
                    Find a Home <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/register">List Your Property</Link>
                </Button>
              </div>
            </div>

            {/* Visual grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Avg. Response Time", value: "< 2 hrs", icon: Headphones, color: "bg-blue-50 text-blue-700" },
                { label: "Verified Listings", value: "100%", icon: ShieldCheck, color: "bg-emerald-50 text-emerald-700" },
                { label: "Cities Covered", value: "20+", icon: MapPin, color: "bg-violet-50 text-violet-700" },
                { label: "5-Star Reviews", value: "3,400+", icon: Star, color: "bg-amber-50 text-amber-700" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-3 rounded-2xl border bg-card p-6 shadow-sm"
                >
                  <div className={`w-fit rounded-xl p-2.5 ${item.color}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-2xl font-bold">{item.value}</span>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── CTA BANNER ─────────────────── */}
      <section className="bg-gradient-to-br from-[#0B4F4A] via-[#0d6158] to-[#083d39] py-20 text-white">
        <div className="mx-auto  px-4 text-center md:px-8">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Find Your Next Home?
          </h2>
          <p className="mt-3 text-white/70">
            Join thousands of tenants and landlords already using NestRent.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl bg-white px-8 text-[#0B4F4A] font-semibold hover:bg-emerald-50"
            >
              <Link href="/properties">Start Browsing</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-white/30 px-8 text-white hover:bg-white/10"
            >
              <Link href="/register">Create Free Account</Link>
            </Button>
          </div>
        </div>
      </section>

    </MyContainer>
    </div>
  );
}
    

// ─── Featured property card (compact) ────────────────────────────────────────

function FeaturedCard({ property }: { property: IProperty }) {
  const cover = property.images?.[0];

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group flex flex-col rounded-2xl overflow-hidden border bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-52 overflow-hidden bg-muted">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-4xl">
            🏠
          </div>
        )}
        {/* Available badge */}
        <div className="absolute left-3 top-3">
          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold shadow ${property.isAvailable ? "bg-emerald-500 text-white" : "bg-slate-500 text-white"}`}>
            {property.isAvailable ? "Available" : "Occupied"}
          </span>
        </div>
        {/* Price */}
        <div className="absolute bottom-3 right-3 rounded-xl bg-white/95 px-3 py-1.5 shadow backdrop-blur-sm">
          <span className="text-sm font-bold text-emerald-700">
            ৳{property.price_per_month?.toLocaleString()}
          </span>
          <span className="text-[10px] text-muted-foreground">/mo</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div>
          <h3 className="font-semibold leading-snug line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" />
            {property.area}, {property.city}
          </p>
        </div>
        <div className="flex items-center gap-4 border-t pt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" />{property.bedrooms} Bed</span>
          <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{property.bathrooms} Bath</span>
          <span className="flex items-center gap-1"><Maximize2 className="h-3.5 w-3.5" />{property.size} {property.sizeUnit}</span>
        </div>
      </div>
    </Link>
  );
}


