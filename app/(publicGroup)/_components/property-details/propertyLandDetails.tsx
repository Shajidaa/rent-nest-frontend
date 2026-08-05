/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Bed, Bath, Square, MapPin, CheckCircle2, Compass, Car,
  ShieldCheck, Calendar, Layers, ChevronLeft, ChevronRight,
  Zap, Eye,
} from "lucide-react";
import { PropertyReviews } from "./PropertyReviews";

export default function PropertyLandDetails({
  rentalId,
  ...property
}: {
  rentalId?: string | null;
  [key: string]: any;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const statItems = [
    { icon: Bed, label: "Bedrooms", value: property.bedrooms },
    { icon: Bath, label: "Bathrooms", value: property.bathrooms },
    { icon: Layers, label: "Veranda", value: property.veranda },
    { icon: Square, label: "Total Size", value: `${property.size} ${property.sizeUnit}` },
  ];

  const specItems = [
    { icon: Compass, label: "Facing Direction", value: property.facing },
    { icon: Car, label: "Parking", value: property.parking ? "Available" : "Not Available" },
    { icon: ShieldCheck, label: "Preferred Tenant", value: property.preferredTenant },
    {
      icon: Calendar,
      label: "Listed Date",
      value: property.createdAt
        ? new Date(property.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
        : "N/A",
    },
  ];

  return (
    <article className="space-y-10">

      {/* ── Hero Header ── */}
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-primary/10 text-primary border-primary/20 font-semibold px-3 py-0.5">
            {property.category?.name || "Property"}
          </Badge>
          <Badge
            variant={property.isAvailable ? "default" : "secondary"}
            className="px-3 py-0.5 font-semibold"
          >
            {property.status}
          </Badge>
          {property.views != null && (
            <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
              <Eye className="w-3.5 h-3.5" /> {property.views} views
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
          {property.title}
        </h1>

        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 shrink-0 text-primary" />
          {property.fullAddress}, {property.area}, {property.city}
        </p>

        {/* Price strip */}
        <div className="flex flex-wrap items-end gap-4 pt-1">
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-widest block">Monthly Rent</span>
            <span className="text-4xl font-extrabold text-primary leading-none">
              ${property.price_per_month?.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground ml-1">/mo</span>
          </div>
          <div className="pb-1">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
              Security Deposit: ${property.securityDeposit?.toLocaleString()}
            </span>
          </div>
        </div>
      </header>

      {/* ── Image Gallery ── */}
      <section>
        <div className="relative rounded-2xl overflow-hidden bg-muted border shadow-sm h-[420px] md:h-[540px] group">
          {property.images?.length > 0 ? (
            <>
              <div className="overflow-hidden h-full w-full" ref={emblaRef}>
                <div className="flex h-full touch-pan-y">
                  {property.images.map((img: string, i: number) => (
                    <div key={i} className="relative flex-[0_0_100%] min-w-0 h-full">
                      <Image
                        src={img}
                        alt={`${property.title} — photo ${i + 1}`}
                        fill
                        className="object-cover"
                        priority={i === 0}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

              {/* Image counter */}
              <div className="absolute bottom-4 left-4 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                {selectedIndex + 1} / {property.images.length}
              </div>

              {property.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all rounded-full shadow-lg bg-white/90 hover:bg-white"
                    onClick={scrollPrev}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all rounded-full shadow-lg bg-white/90 hover:bg-white"
                    onClick={scrollNext}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </>
              )}
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground gap-2">
              <Square className="w-10 h-10 opacity-30" />
              <span className="text-sm">No images available</span>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {property.images?.length > 1 && (
          <div className="flex gap-2.5 overflow-x-auto pt-3 pb-1 scrollbar-none">
            {property.images.map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`relative flex-[0_0_88px] h-[62px] rounded-xl overflow-hidden border-2 transition-all duration-200 ${selectedIndex === i
                    ? "border-primary scale-105 shadow-md"
                    : "border-transparent opacity-60 hover:opacity-90 hover:scale-[1.02]"
                  }`}
              >
                <Image src={img} alt={`thumbnail ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ── Stats Bar ── */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {statItems.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-2xl border bg-white dark:bg-card p-5 shadow-sm text-center"
            >
              <div className="rounded-xl bg-primary/8 p-2.5">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground font-medium">{label}</span>
              <span className="font-bold text-base">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section className="rounded-2xl border bg-white dark:bg-card p-6 shadow-sm space-y-3">
        <h2 className="text-lg font-bold">About This Property</h2>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {property.description}
        </p>
      </section>

      {/* ── Specifications ── */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold">Property Specifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {specItems.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-xl border bg-white dark:bg-card px-4 py-3.5 shadow-sm"
            >
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-primary shrink-0" />
                {label}
              </span>
              <span className="text-sm font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Amenities ── */}
      {property.amenities?.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold">Amenities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {property.amenities.map((amenity: string, i: number) => (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-xl border bg-white dark:bg-card px-4 py-3 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-sm font-medium">{amenity}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Utilities ── */}
      {property.utilities?.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold">Included Utilities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {property.utilities.map((utility: string, i: number) => (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-xl border bg-white dark:bg-card px-4 py-3 shadow-sm"
              >
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-sm font-medium">{utility}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Reviews ── */}
      <Separator />
      <PropertyReviews
        propertyId={property.id}
        rentalId={rentalId}
        initialReviews={property.reviews}
      />
    </article>
  );
}
