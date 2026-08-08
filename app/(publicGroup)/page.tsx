

import Banner from "./_components/Home/Banner";

import Category from "./_components/Home/category";
import FeaturedSection from "./_components/Home/FeaturedSection";
import Contact from "./_components/Home/contact";
import OurTeamSection from "./_components/Home/OurTeamSection";
import WhyChooseUsSection from "./_components/Home/WhyChooseUs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <WhyChooseUsSection/>
   

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
              className="h-12 rounded-xl border-white/30 px-8 text-primary hover:bg-white/10"
            >
              <Link href="/register">Create Free Account</Link>
            </Button>
          </div>
        </div>
      </section>
    {/* ─────────────────── Our team member ─────────────────── */}
<OurTeamSection/>
    </div>
  );
}
    


