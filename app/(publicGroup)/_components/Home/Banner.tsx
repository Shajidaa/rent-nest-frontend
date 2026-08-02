import { Button } from "@/components/ui/button";
import { Search, MapPin, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Banner() {
  const popularTags = [
    { label: "Dhaka", query: "Dhaka" },
    { label: "Chittagong", query: "Chittagong" },
    { label: "Sylhet", query: "Sylhet" },
   
   
  ];

  return (
    <section className="relative overflow-hidden
     bg-gradient-to-br from-[#0B4F4A] via-[#0d6158] to-[#083d39] text-white">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-emerald-300/30 blur-[100px]" />
        <div className="absolute -bottom-20 right-0 h-[30rem] w-[30rem] rounded-full bg-teal-400/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto   max-w-7xl py-6">
        <div className="mx-auto max-w-4xl text-center">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-100 backdrop-blur-md border border-white/20 shadow-sm mb-6">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300 animate-pulse" />
            <span>Bangladesh&apos;s Trusted Rental Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl leading-[1.15] text-white">
            Find Your <span className="text-emerald-300 underline decoration-emerald-400/40 underline-offset-8">Perfect</span> Home,
            <span className="block mt-1">Without the Hassle.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg text-emerald-50/90 md:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
            Browse thousands of verified apartments, family houses, and office spaces across major cities. 
            Simple, safe, and transparent.
          </p>

          {/* Interactive Search Bar Box */}
          <div className="mt-10 mx-auto max-w-2xl rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 p-2.5 shadow-2xl shadow-black/20">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              
                <div className="flex h-12 w-full cursor-pointer items-center rounded-xl bg-black/20 border border-white/10 px-4 text-sm text-white group-hover:bg-black/30 group-hover:border-white/30 transition-all duration-200">
                  <Search className="h-4 w-4 mr-3 text-emerald-300 shrink-0" />
                  <span className="truncate text-white/90">Search city, area, or property name...</span>
                </div>
           

              <Button
                asChild
                size="lg"
                className="h-12 px-6 rounded-xl bg-emerald-400 text-[#0B4F4A] font-bold hover:bg-emerald-300 transition-all duration-200 shrink-0 shadow-lg shadow-emerald-950/20"
              >
                <Link href="/properties" className="flex items-center gap-2">
                  <span>Explore Now</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

            </div>
          </div>

          {/* Quick Filter Tags */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-medium text-emerald-100 mr-1 flex items-center gap-1">
              <MapPin className="h-3 w-3 text-emerald-300" /> Popular:
            </span>
            {popularTags.map((tag) => (
              <Link
                key={tag.label}
                href={`/properties?city=${tag.query}`}
                className="rounded-full bg-white/15 hover:bg-white/25 border border-white/20 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-all duration-200 hover:scale-105"
              >
                {tag.label}
              </Link>
            ))}
          </div>

          {/* Mini Stats / Trust Indicators */}
          <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-3 gap-4 max-w-xl mx-auto text-center">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-emerald-300">5,000+</p>
              <p className="text-xs text-emerald-100 mt-1">Verified Properties</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-emerald-300">64</p>
              <p className="text-xs text-emerald-100 mt-1">Districts Covered</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-emerald-300">100%</p>
              <p className="text-xs text-emerald-100 mt-1">Direct Owners</p>
            </div>
          </div>

        </div>
      </div>

      {/* Modern Smooth Wave Divider */}
      <div className="relative h-12 md:h-20 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 64"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z"
            fill="white"
            className="dark:fill-[#0a0a0a]"
          />
        </svg>
      </div>
    </section>
  );
}