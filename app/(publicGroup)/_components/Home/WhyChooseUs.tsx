"use client"
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldCheck, Headphones, Award, Home, CheckCircle2 } from "lucide-react";
import MyContainer from "@/components/ui/shared/MyContainer";

export default function WhyChooseUsSection() {
  const [activeItem, setActiveItem] = useState("item-1");

  return (
    <section className="w-full bg-background py-20 ">
      <MyContainer className=" grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Images Grid matching real Estate theme */}
        <div className="relative grid grid-cols-2 gap-4 items-center">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl shadow-lg border border-border">
              <img
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=600"
                alt="Modern House Interior"
                className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="bg-primary/10 p-6 rounded-xl border border-primary/20 flex flex-col justify-center">
              <span className="text-3xl md:text-4xl font-extrabold text-primary">15+</span>
              <span className="text-xs md:text-sm font-medium text-foreground uppercase tracking-wider mt-1">Years of Excellence</span>
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <div className="bg-card lg:p-6 p-2 rounded-xl shadow-lg border border-border flex flex-col justify-center">
              <span className="text-3xl md:text-4xl font-extrabold text-foreground">1,200+</span>
              <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider mt-1">Properties Sold</span>
            </div>
            <div className="overflow-hidden rounded-xl shadow-lg border border-border">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600"
                alt="Luxury Exterior"
                className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Accordion Features */}
        <div className="flex flex-col">
          
          <div className="mb-8">
            <span className="text-xs md:text-sm font-bold text-primary tracking-widest uppercase">
               Why Choose RentNest
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mt-2">
              We Provide the Best Property Experience
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-3 font-light">
              Discover why thousands of homeowners and investors trust RentNest to buy, sell, and manage their valuable real estate assets.
            </p>
          </div>

          {/* Shadcn Accordion */}
          <Accordion 
            type="single" 
            collapsible 
            defaultValue="item-1"
            className="space-y-4"
          >
            
            {/* Accordion Item 1 */}
            <AccordionItem 
              value="item-1" 
              className="border border-border rounded-xl bg-card px-6 shadow-sm data-[state=open]:border-primary transition-colors"
            >
              <AccordionTrigger className="text-base md:text-lg font-bold text-foreground hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span>Trusted & Secure Transactions</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4 font-light leading-relaxed">
                We ensure complete transparency and legal security in every contract, safeguarding your investments from start to finish with expert legal advisors.
              </AccordionContent>
            </AccordionItem>

            {/* Accordion Item 2 */}
            <AccordionItem 
              value="item-2" 
              className="border border-border rounded-xl bg-card px-6 shadow-sm data-[state=open]:border-primary transition-colors"
            >
              <AccordionTrigger className="text-base md:text-lg font-bold text-foreground hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <span>Experienced Local Agents</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4 font-light leading-relaxed">
                Our team consists of certified real estate professionals who possess deep market insights, helping you secure the absolute best property valuations.
              </AccordionContent>
            </AccordionItem>

            {/* Accordion Item 3 */}
            <AccordionItem 
              value="item-3" 
              className="border border-border rounded-xl bg-card px-6 shadow-sm data-[state=open]:border-primary transition-colors"
            >
              <AccordionTrigger className="text-base md:text-lg font-bold text-foreground hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <span>24/7 Dedicated Support</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4 font-light leading-relaxed">
                Have questions about a listing, mortgage options, or scheduling a visit? Our customer success agents are available around the clock to assist you.
              </AccordionContent>
            </AccordionItem>

            {/* Accordion Item 4 */}
            <AccordionItem 
              value="item-4" 
              className="border border-border rounded-xl bg-card px-6 shadow-sm data-[state=open]:border-primary transition-colors"
            >
              <AccordionTrigger className="text-base md:text-lg font-bold text-foreground hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Home className="w-5 h-5" />
                  </div>
                  <span>Wide Range of Properties</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4 font-light leading-relaxed">
                From cozy suburban family homes to ultra-luxury downtown high-rises and commercial spaces, we have an extensive portfolio tailored to your unique lifestyle.
              </AccordionContent>
            </AccordionItem>

          </Accordion>

        </div>

      </MyContainer>
    </section>
  );
}