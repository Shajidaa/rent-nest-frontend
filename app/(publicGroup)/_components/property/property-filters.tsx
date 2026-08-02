"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal, RotateCcw, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchCategories } from "../../_action/getCategory";

const BEDROOM_OPTIONS = [
  { label: "Any", value: "" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4+", value: "4" },
];

const BATHROOM_OPTIONS = [
  { label: "Any", value: "" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3+", value: "3" },
];

const FACING_OPTIONS = [
  { label: "Any", value: "" },
  { label: "North", value: "NORTH" },
  { label: "South", value: "SOUTH" },
  { label: "East", value: "EAST" },
  { label: "West", value: "WEST" },
];

interface CategoryOption {
  label: string;
  value: string;
}

export function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Categories fetched asynchronously
  const [categories, setCategories] = useState<CategoryOption[]>([]);

  // Filter States
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [area, setArea] = useState(searchParams.get("area") ?? "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") ?? "");
  const [bathrooms, setBathrooms] = useState(searchParams.get("bathrooms") ?? "");
  const [facing, setFacing] = useState(searchParams.get("facing") ?? "");
  const [veranda, setVeranda] = useState(searchParams.get("veranda") ?? "");
  const [isAvailable, setIsAvailable] = useState(searchParams.get("isAvailable") ?? "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") ?? "createdAt");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") ?? "desc");

  // Load categories dynamically on mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetchCategories();
        if (res?.categories) {
          const formatted = res.categories.map((cat: { name: string; slug: string }) => ({
            label: cat.name,
            value: cat.slug,
          }));
          setCategories(formatted);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    }
    loadCategories();
  }, []);

  const activeCount = [
    category,
    city,
    area,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    facing,
    veranda,
    isAvailable,
  ].filter(Boolean).length;

  const applyFilters = (overrides?: Record<string, string>) => {
    const state = {
      category,
      city,
      area,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      facing,
      veranda,
      isAvailable,
      sortBy,
      sortOrder,
      ...overrides,
    };

    const params = new URLSearchParams();

    // Preserve header search bar term if present
    const searchTerm = searchParams.get("searchTerm");
    if (searchTerm) params.set("searchTerm", searchTerm);

    // Apply active non-empty filters to URL
    Object.entries(state).forEach(([key, val]) => {
      if (val && val.trim() !== "") {
        params.set(key, val.trim());
      }
    });

    startTransition(() => {
      router.push(`/properties?${params.toString()}`);
    });
  };

  const handleCategoryChange = (val: string) => {
    const valueToSet = val === "all" ? "" : val;
    setCategory(valueToSet);
    applyFilters({ category: valueToSet });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const handleReset = () => {
    setCategory("");
    setCity("");
    setArea("");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");
    setBathrooms("");
    setFacing("");
    setVeranda("");
    setIsAvailable("");
    setSortBy("createdAt");
    setSortOrder("desc");

    startTransition(() => {
      router.push("/properties");
    });
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
        {activeCount > 0 && (
          <button
            onClick={handleReset}
            type="button"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-3 w-3" /> Reset all
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="divide-y">
        {/* Category Filter Dropdown */}
        <div className="p-5 space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Category
          </Label>
          <Select value={category || "all"} onValueChange={handleCategoryChange}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Filters (City & Area) */}
        <div className="p-5 space-y-3">
          <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Location
          </Label>
          <div className="space-y-2">
            <Input
              placeholder="City (e.g. Dhaka)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="h-9 text-sm"
            />
            <Input
              placeholder="Area (e.g. Gulshan)"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="h-9 text-sm"
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="p-5 space-y-3">
          <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Price Range (৳/month)
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="h-9 text-sm"
            />
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="h-9 text-sm"
            />
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
                onClick={() => {
                  setBedrooms(opt.value);
                  applyFilters({ bedrooms: opt.value });
                }}
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

        {/* Bathrooms */}
        <div className="p-5 space-y-3">
          <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Bathrooms
          </Label>
          <div className="grid grid-cols-4 gap-1.5">
            {BATHROOM_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => {
                  setBathrooms(opt.value);
                  applyFilters({ bathrooms: opt.value });
                }}
                className={cn(
                  "rounded-lg border py-2 text-xs font-medium transition-all",
                  bathrooms === opt.value
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Facing Direction */}
        <div className="p-5 space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Facing Direction
          </Label>
          <Select
            value={facing || "all"}
            onValueChange={(val) => {
              const selected = val === "all" ? "" : val;
              setFacing(selected);
              applyFilters({ facing: selected });
            }}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Any Direction" />
            </SelectTrigger>
            <SelectContent>
              {FACING_OPTIONS.map((opt) => (
                <SelectItem key={opt.value || "all"} value={opt.value || "all"}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <div className="p-5">
          <Button type="submit" className="w-full h-9" disabled={isPending}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Apply Filters"}
          </Button>
        </div>
      </form>
    </div>
  );
}