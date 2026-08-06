"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchCategories } from "../_action/getCategory"; 

interface CategoryOption {
  label: string;
  value: string;
}

interface AdvancedPropertySearchModalProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AdvancedPropertySearchModal({ 
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: AdvancedPropertySearchModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [isPending, startTransition] = useTransition();

  // Support both controlled and uncontrolled states
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  
  const setOpen = (value: boolean) => {
    if (!isControlled) {
      setInternalOpen(value);
    }
    controlledOnOpenChange?.(value);
  };

  // Dynamic Data States
  const [categories, setCategories] = useState<CategoryOption[]>([]);

  // Form States synced with URL query params if present
  const [location, setLocation] = useState(searchParams.get("location") ?? "");
  const [propertyId, setPropertyId] = useState(searchParams.get("propertyId") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [area, setArea] = useState(searchParams.get("area") ?? "");

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (location.trim()) params.set("location", location.trim());
    if (propertyId.trim()) params.set("propertyId", propertyId.trim());
    if (category) params.set("category", category);
    if (city.trim()) params.set("city", city.trim());
    if (area.trim()) params.set("area", area.trim());

    setOpen(false);
    startTransition(() => {
      router.push(`/properties?${params.toString()}`);
    });
  };

  const handleReset = () => {
    setLocation("");
    setPropertyId("");
    setCategory("");
    setCity("");
    setArea("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[580px] rounded-3xl p-0 overflow-hidden bg-background border shadow-2xl">
        {/* Modal Header */}
        <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b space-y-0">
          <DialogTitle className="text-lg font-semibold tracking-tight text-foreground">
            Property search
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSearch} className="p-6 space-y-5">
          {/* Search by location */}
          <div className="relative">
            <Input
              placeholder="Search by location (e.g., Gulshan, Dhanmondi)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-11 rounded-xl bg-muted/30 border-input text-sm placeholder:text-muted-foreground focus-visible:ring-primary"
            />
          </div>

          {/* Search by Property ID */}
          <div className="relative">
            <Input
              placeholder="Property ID.."
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              className="h-11 rounded-xl bg-muted/30 border-input text-sm placeholder:text-muted-foreground pr-10 focus-visible:ring-primary"
            />
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>

          {/* Divider with OR */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <span className="relative px-3 bg-background text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              OR
            </span>
          </div>

          {/* Dynamic Category Selector Pills */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Category
            </Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setCategory(category === opt.value ? "" : opt.value)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-medium border transition-all",
                    category === opt.value
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-background text-foreground hover:bg-muted"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location Filters (City & Area) Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                City
              </Label>
              <Input
                placeholder="e.g. Dhaka"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-11 rounded-xl bg-muted/30 border-input text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Area / Thana
              </Label>
              <Input
                placeholder="e.g. Mirpur"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="h-11 rounded-xl bg-muted/30 border-input text-sm"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t mt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground text-sm font-medium"
            >
              Cancel
            </Button>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="rounded-xl h-10 px-4 text-xs font-medium"
              >
                Reset
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="rounded-xl h-10 px-6 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-md"
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                Search
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}