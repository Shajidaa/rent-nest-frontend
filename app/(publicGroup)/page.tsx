

import Banner from "./_components/Home/Banner";

import Category from "./_components/Home/category";
import FeaturedSection from "./_components/Home/FeaturedSection";
import Contact from "./_components/Home/contact";
import OurTeamSection from "./_components/Home/OurTeamSection";
import WhyChooseUsSection from "./_components/Home/WhyChooseUs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CTA from "./_components/Home/CTA";

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
      <CTA/>
    {/* ─────────────────── Our team member ─────────────────── */}
<OurTeamSection/>
    </div>
  );
}
    


