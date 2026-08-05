/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Bed,
  Bath,
  Square,
  MapPin,
  CheckCircle2,
  Compass,
  Car,
  ShieldCheck,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { PropertyReviews } from "./PropertyReviews";


export default function PropertyLandDetails({ rentalId, ...property }: { rentalId?: string | null;[key: string]: any }) {


  // Embla Carousel Hooks
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);


  useEffect(() => {
    if (!emblaApi) return;
    const onSelect: () => void = () => {
      if (!emblaApi) return;
      //  setPrevBtnEnabled(emblaApi.canScrollPrev());
      //  setNextBtnEnabled(emblaApi.canScrollNext());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);


  return (
    <div className="space-y-8">
      {/* Header Info Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-primary border-primary font-medium">
              {property.category?.name || "Property"}
            </Badge>
            <Badge variant={property.isAvailable ? "default" : "secondary"}>
              {property.status}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{property.title}</h1>
          <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <MapPin className="w-4 h-4 shrink-0 text-primary" />
            <span>{property.fullAddress}, {property.area}, {property.city}</span>
          </p>
        </div>

        <div className="text-left md:text-right bg-card border p-4 rounded-xl shadow-sm w-full md:w-auto">
          <span className="text-sm text-muted-foreground block">Monthly Rent</span>
          <span className="text-3xl font-extrabold text-primary">${property.price_per_month?.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground block mt-0.5">Deposit: ${property.securityDeposit?.toLocaleString()}</span>
        </div>
      </div>

      {/* Media Gallery with Embla Carousel */}
      <div className="space-y-4">
        <div className="relative bg-muted rounded-2xl overflow-hidden border h-[400px] md:h-[500px] group">
          {property.images && property.images.length > 0 ? (
            <>
              {/* Main Carousel Viewport */}
              <div className="overflow-hidden h-full w-full" ref={emblaRef}>
                <div className="flex h-full touch-pan-y">
                  {property.images.map((image: string, index: number) => (
                    <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
                      <Image
                        src={image}
                        alt={`${property.title} - Image ${index + 1}`}
                        className="object-cover"
fill
                      priority={index === 0}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              {property.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-md"
                    onClick={scrollPrev}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-md"
                    onClick={scrollNext}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">No Image Available</div>
          )}
        </div>

        {/* Thumbnail Navigation Bar */}
        {property.images && property.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {property.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`relative flex-[0_0_100px] h-[70px] rounded-xl overflow-hidden border-2 transition-all ${selectedIndex === index ? "border-primary scale-105 shadow-sm" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
              >
                <Image
                  src={image}
                  alt={`${property.title} thumbnail ${index + 1}`}
                  className="object-cover"
fill
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Side: Specifications & Description */}
        <div className="lg:col-span-2 space-y-8">

          {/* Quick Property Attributes Card */}
          <Card>
            <CardContent className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div className="space-y-1">
                <Bed className="w-5 h-5 mx-auto text-primary" />
                <span className="text-xs text-muted-foreground block">Bedrooms</span>
                <span className="font-semibold text-base">{property.bedrooms}</span>
              </div>
              <div className="space-y-1">
                <Bath className="w-5 h-5 mx-auto text-primary" />
                <span className="text-xs text-muted-foreground block">Bathrooms</span>
                <span className="font-semibold text-base">{property.bathrooms}</span>
              </div>
              <div className="space-y-1">
                <Layers className="w-5 h-5 mx-auto text-primary" />
                <span className="text-xs text-muted-foreground block">Veranda</span>
                <span className="font-semibold text-base">{property.veranda}</span>
              </div>
              <div className="space-y-1">
                <Square className="w-5 h-5 mx-auto text-primary" />
                <span className="text-xs text-muted-foreground block">Total Size</span>
                <span className="font-semibold text-base">{property.size} {property.sizeUnit}</span>
              </div>
            </CardContent>
          </Card>

          {/* Overview / Description */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">About This Property</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          <Separator />

          {/* Detailed Features Grid */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Property Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <span className="text-muted-foreground flex items-center gap-2"><Compass className="w-4 h-4" /> Facing Direction</span>
                <span className="font-medium">{property.facing}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <span className="text-muted-foreground flex items-center gap-2"><Car className="w-4 h-4" /> Parking Facility</span>
                <span className="font-medium">{property.parking ? "Available" : "Not Available"}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <span className="text-muted-foreground flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Preferred Tenant</span>
                <span className="font-medium">{property.preferredTenant}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <span className="text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4" /> Listed Date</span>
                <span className="font-medium">{property.createdAt ? (property.createdAt) : "N/A"}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Amenities Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities?.map((amenity: string, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2.5 rounded-lg border bg-card">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Utilities Section */}
          {property.utilities && property.utilities.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Included Utilities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.utilities.map((utility: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 p-2.5 rounded-lg border bg-card">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-sm font-medium">{utility}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Separator />
          <PropertyReviews propertyId={property.id} rentalId={rentalId} initialReviews={property.reviews} />
        </div>

      </div>
    </div>
  );
}