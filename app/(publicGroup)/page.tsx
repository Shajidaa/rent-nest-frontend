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
 
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import Banner from "./_components/Home/Banner";

import Category from "./_components/Home/category";
import FeaturedSection from "./_components/Home/FeaturedSection";
import Contact from "./_components/Home/contact";
import OurTeamSection from "./_components/Home/OurTeamSection";

export default async function HomePage() {


  return (
    <div className="flex flex-col">
      {/* ─────────────────── HERO ─────────────────── */}
    <Banner />

      {/* ─────────────────── STATS ─────────────────── */}
   
<Category />
      {/* ─────────────────── FEATURED PROPERTIES ─────────────────── */}
     
<FeaturedSection />
      {/* ─────────────────── HOW IT WORKS ─────────────────── */}
    

      {/* ─────────────────── PROPERTY TYPES ─────────────────── */}
      {/* ─────────────────── Contact─────────────────── */}
    <Contact/>

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
      {/* <section className="bg-gradient-to-br from-[#0B4F4A] via-[#0d6158] to-[#083d39] py-20 text-white">
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
              className="h-12 rounded-xl border-white/30 px-8 text-primary hover:bg-white/10"
            >
              <Link href="/register">Create Free Account</Link>
            </Button>
          </div>
        </div>
      </section> */}
    {/* ─────────────────── Our team member ─────────────────── */}
<OurTeamSection/>
    </div>
  );
}
    


