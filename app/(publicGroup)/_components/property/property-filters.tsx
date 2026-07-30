"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, RotateCcw } from "lucide-react";

export function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("price_per_month") || "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "createdAt");

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm) params.set("searchTerm", searchTerm);
    else params.delete("searchTerm");

    if (city) params.set("city", city);
    else params.delete("city");

    if (minPrice) params.set("price_per_month", minPrice);
    else params.delete("price_per_month");

    if (bedrooms) params.set("bedrooms", bedrooms);
    else params.delete("bedrooms");

    if (sortBy) params.set("sortBy", sortBy);

    startTransition(() => {
      router.push(`/properties?${params.toString()}`);
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setCity("");
    setMinPrice("");
    setBedrooms("");
    setSortBy("createdAt");
    startTransition(() => {
      router.push("/properties");
    });
  };

  return (
    <div className="bg-card border rounded-xl p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Search className="w-4 h-4" /> Filters
        </h2>
        <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 px-2 text-muted-foreground">
          <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
        </Button>
      </div>

      <Separator />

      <form onSubmit={handleFilterSubmit} className="space-y-4">
        {/* Global Keyword Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Keyword Search</Label>
          <Input
            id="search"
            placeholder="Title, description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* City Filter */}
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="e.g. Dhaka, New York"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* Price Filter */}
        <div className="space-y-2">
          <Label htmlFor="price">Max Monthly Price ($)</Label>
          <Input
            id="price"
            type="number"
            placeholder="e.g. 1500"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        {/* Bedrooms */}
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            type="number"
            placeholder="e.g. 2"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          />
        </div>

        {/* Sort Options */}
        <div className="space-y-2">
          <Label htmlFor="sort">Sort By</Label>
          value={sortBy}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger id="sort">
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Newest Listed</SelectItem>
              <SelectItem value="price_per_month">Price (Low to High)</SelectItem>
              <SelectItem value="size">Size</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full mt-2" disabled={isPending}>
          {isPending ? "Filtering..." : "Apply Filters"}
        </Button>
      </form>
    </div>
  );
}