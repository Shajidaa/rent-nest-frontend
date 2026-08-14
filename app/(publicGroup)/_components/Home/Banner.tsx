"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Sparkles,  KeyRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


export default function Banner() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");


  const popularTags = [
    { label: "Gulshan", query: "Gulshan" },
    { label: "Banani", query: "Banani" },
    { label: "Dhanmondi", query: "Dhanmondi" },
    { label: "Uttara", query: "Uttara" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) {
      params.set("searchTerm", searchTerm.trim());
    }

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative  flex flex-col
     justify-between bg-background overflow-hidden">
      {/* Background Hero Image with Deep Modern Gradient Layer */}
      <div className="absolute inset-0 z-0">
        <Image
        fill
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2200"
          alt="Luxury modern architecture property"
          className="w-full h-full object-cover object-center scale-105 duration-700 select-none"
        />
        {/* Sleek dual-tone atmospheric dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/70 backdrop-blur-[2px]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative  z-10 mx-auto max-w-7xl w-full pt-24 pb-12 px-4 sm:px-6 lg:px-8 my-auto">
        <div className="mx-auto max-w-4xl text-center ">

          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-background/30 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-foreground border border-border/40 shadow-lg">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-white">Premier Verified Real Estate Marketplace</span>
          </div>

          {/* Typography Masterhead */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Elevate Your Living, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
              Without Compromise.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-shadow-accent/40 max-w-2xl mx-auto font-normal leading-relaxed">
            Discover architectural masterpieces, luxurious apartments, and high-yield commercial spaces across top prime locations.
          </p>

          {/* Interactive Modern Search Card Box */}
          <div className="mt-8 max-w-3xl mx-auto bg-card/90 backdrop-blur-2xl border border-border/80 p-4 sm:p-5 rounded-3xl shadow-2xl">
            
          

            {/* Form Input Container */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground shrink-0" />
                <Input
                  type="text"
                  placeholder="Search by area, property name, or landmark..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-13 w-full pl-11 pr-4 bg-background/60 border-input text-foreground placeholder:text-muted-foreground rounded-2xl focus-visible:ring-primary shadow-xs text-sm"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto h-13 px-8 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/25 cursor-pointer text-sm shrink-0"
              >
                Search Properties
              </Button>
            </form>

            {/* Quick Popular Tags */}
            <div className="mt-4 pt-3 border-t border-border/60 flex flex-wrap items-center justify-start gap-2 text-left">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mr-1">
                <MapPin className="h-3.5 w-3.5 text-primary" /> Popular Areas:
              </span>
              {popularTags.map((tag) => (
                <Link
                  key={tag.label}
                  href={`/properties?searchTerm=${tag.query}`}
                  className="rounded-lg bg-muted/60 hover:bg-primary/10 hover:text-primary border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-all duration-200"
                >
                  {tag.label}
                </Link>
              ))}
            </div>

          </div>

          {/* Feature Highlights Footer */}
          <div className="pt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto text-center text-primary">
            <div className="bg-background/20 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <p className="text-xl font-bold text-primary">100%</p>
              <p className="text-[11px] text-secondary-foreground">Verified Listings</p>
            </div>
            <div className="bg-background/20 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <p className="text-xl font-bold text-primary">Zero</p>
              <p className="text-[11px] text-secondary-foreground">Hidden Brokerage</p>
            </div>
            <div className="bg-background/20 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <p className="text-xl font-bold text-primary">24/7</p>
              <p className="text-[11px] text-secondary-foreground">Concierge Support</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}