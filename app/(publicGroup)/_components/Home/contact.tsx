import React from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function RentNestBanner() {
  return (
    <section className="relative w-full text-slate-50 py-16 px-6 overflow-hidden">
      {/* Background Image from Unsplash with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYa8G8_gcr578ggRMZCvRGTrw9ox_fPFr5y0UZdHgs3Q&s')`,
        }}
      />
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-slate-900/80 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Section: Icon & Text */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
          
          {/* Circular Icon with top connector line */}
          <div className="relative flex flex-col items-center">
            <div className="w-0.5 h-12 bg-slate-100 absolute -top-20 hidden md:block" />
            <div className="w-16 h-16 rounded-full border-2 border-slate-100 flex items-center justify-center bg-transparent shadow-md">
              <Home className="w-8 h-8 text-slate-100" />
            </div>
          </div>

          {/* Heading and Subtitle */}
          <div>
            <h2 className="text-xl md:text-3xl font-extrabold tracking-tight">
              LIKE TO <span className="text-green-500">RENT</span> YOUR PROPERTY?
            </h2>
            <p className="text-sm md:text-base text-slate-300 mt-2 font-light">
              Come and listen to a story about a man named Jed a poor mountaineer barely kept his family
            </p>
          </div>
        </div>

        {/* Right Section: Action Button */}
        <Link href={'/register'} className="shrink-0">
          <Button 
            variant="default" 
            size="lg"
            // className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 py-6 shadow-lg uppercase tracking-wide"
          >
            Become A Landlord
          </Button>
        </Link>

      </div>
    </section>
  );
}