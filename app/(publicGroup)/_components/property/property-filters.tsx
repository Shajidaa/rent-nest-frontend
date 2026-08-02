"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal, RotateCcw, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const BEDROOM_OPTIONS = [
  { label: "Any", value: "" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4+", value: "4" },
];

export function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") ?? "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") ?? "createdAt");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") ?? "desc");

  const activeCount = [city, minPrice, maxPrice, bedrooms].filter(Boolean).length;

  const applyFilters = (overrides?: Record<string, string>) => {
    const state = { city, minPrice, maxPrice, bedrooms, sortBy, sortOrder, ...overrides };
    const params = new URLSearchParams();

    // preserve searchTerm from search bar
    const searchTerm = searchParams.get("searchTerm");
    if (searchTerm) params.set("searchTerm", searchTerm);

    if (state.city) {
      params.set("city", state.city);
      // also drive searchTerm with city value so area/address partial matches work
      if (!searchTerm) params.set("searchTerm", state.city);
    }
    if (state.minPrice) params.set("minPrice", state.minPrice);
    if (state.maxPrice) params.set("maxPrice", state.maxPrice);
    if (state.bedrooms) params.set("bedrooms", state.bedrooms);
    if (state.sortBy) params.set("sortBy", state.sortBy);
    if (state.sortOrder) params.set("sortOrder", state.sortOrder);

    startTransition(() => router.push(`/properties?${params.toString()}`));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const handleReset = () => {
    setCity("");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");
    setSortBy("createdAt");
    setSortOrder("desc");
    startTransition(() => router.push("/properties"));
  };

  const handleBedroomClick = (val: string) => {
    setBedrooms(val);
    applyFilters({ bedrooms: val });
  };

  const handleSortChange = (val: string) => {
    setSortBy(val);
    applyFilters({ sortBy: val });
  };

  const handleSortOrderChange = (val: string) => {
    setSortOrder(val);
    applyFilters({ sortOrder: val });
  };

  return (
    <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-muted/30 px-5 py-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <span className="font-semibold text-sm">Filters</span>
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {activeCount}
            </span>
          )}
        </div>
        {(activeCount > 0 || searchParams.get("sortBy")) && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-3 w-3" /> Reset all
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="divide-y">
        {/* City */}
        <div className="p-5 space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            City
          </Label>
          <Input
            placeholder="e.g. Dhaka, Chittagong"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="h-9 text-sm"
          />
        </div>

        {/* Price Range */}
        <div className="p-5 space-y-3">
          <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Price Range (৳/month)
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                Min
              </span>
              <Input
                type="number"
                min={0}
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="h-9 pl-9 text-sm"
              />
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                Max
              </span>
              <Input
                type="number"
                min={0}
                placeholder="Any"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="h-9 pl-9 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div className="p-5 space-y-3">
          <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Bedrooms
          </Label>
          <div className="grid grid-cols-5 gap-1.5">
            {BEDROOM_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => handleBedroomClick(opt.value)}
                className={cn(
                  "rounded-lg border py-2 text-xs font-medium transition-all",
                  bedrooms === opt.value
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="p-5 space-y-3">
          <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Sort By
          </Label>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Date Listed</SelectItem>
              <SelectItem value="price_per_month">Price</SelectItem>
              <SelectItem value="size">Size</SelectItem>
              <SelectItem value="bedrooms">Bedrooms</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={handleSortOrderChange}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Descending</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Apply button */}
        <div className="p-5">
          <Button type="submit" className="w-full h-9" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Applying...
              </>
            ) : (
              "Apply Filters"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
