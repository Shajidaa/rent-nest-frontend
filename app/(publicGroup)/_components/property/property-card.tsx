
'use client'; 
import React, { useState, useCallback, useEffect } from "react";

import { Bath, BedDouble, MapPin, Maximize2, ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { IProperty } from "@/lib/type";

interface PropertyCardProps {
  property: IProperty;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  // Initialize Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Carousel control functions
  const scrollPrev = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation when clicking arrows
    e.stopPropagation();
    emblaApi && emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation when clicking arrows
    e.stopPropagation();
    emblaApi && emblaApi.scrollNext();
  }, [emblaApi]);

  // Update button states and indicators based on carousel position
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
     if (!emblaApi) return;
   const onSelect: () => void = () => {
       if (!emblaApi) return;
       setPrevBtnEnabled(emblaApi.canScrollPrev());
       setNextBtnEnabled(emblaApi.canScrollNext());
       setSelectedIndex(emblaApi.selectedScrollSnap());
     };
     emblaApi.on('select', onSelect);
     emblaApi.on('reInit', onSelect);
     return () => {
       emblaApi.off('select', onSelect);
       emblaApi.off('reInit', onSelect);
     };
   }, [emblaApi, onSelect]);
 

  // Fallback or images list
  const images = property.images && property.images.length > 0 
    ? property.images 
    : [];

  return (
    <div
    
      className="group flex flex-col w-full rounded-2xl overflow-hidden border border-border/60 bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image Container / Carousel */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-muted group/carousel">
        {images.length > 0 ? (
          <div className="overflow-hidden h-full w-full" ref={emblaRef}>
            <div className="flex h-full">
              {images.map((src, index) => (
                <div className="relative flex-[0_0_100%] h-full w-full" key={index}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${property.title || "Property"} - Image ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-4xl">
            🏠
          </div>
        )}

        {/* Carousel Navigation Arrows (Visible on hover if multiple images exist) */}
        {images.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center text-primary shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white dark:hover:bg-zinc-900"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center text-primary shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white dark:hover:bg-zinc-900"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 pointer-events-none">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${selectedIndex === index ? "w-4 bg-white" : "w-1.5 bg-white/60"}`}
                />
              ))}
            </div>
          </>
        )}

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
      </div>

      {/* Content Container */}
      <div className="flex flex-col grow justify-between gap-4 p-4 sm:p-5">
        <div className="space-y-1.5">
          <h3 className="font-semibold text-base sm:text-lg leading-snug line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <p className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/80" />
            <span className="truncate">{property.area}, {property.city}</span>
          </p>
          <span className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400">
            ৳{property.price_per_month?.toLocaleString()}
          </span>
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
            
              <Link
          href={`/properties/${property.id}`}
          className="inline-flex items-center justify-center 
          rounded-lg text-sm font-semibold transition-colors 
          bg-primary text-primary-foreground hover:bg-primary/90
           p-1 shadow-sm"
        >
   <ArrowUpRight />
        </Link>
          </div>
         
        </div>
      </div>
    </div>
  );
}