"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export function PropertySearchBar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [value, setValue] = useState(searchParams.get("searchTerm") ?? "");

    const handleChange = (input: string) => {
        setValue(input);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            // Preserve ALL existing filter params — just update searchTerm
            const params = new URLSearchParams(searchParams.toString());
            if (input.trim()) {
                params.set("searchTerm", input.trim());
            } else {
                params.delete("searchTerm");
            }
            router.replace(`${pathname}?${params.toString()}`);
        }, 400);
    };

    const handleClear = () => {
        setValue("");
        const params = new URLSearchParams(searchParams.toString());
        params.delete("searchTerm");
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="relative w-full">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Search by title, city, or area..."
                className="h-11 rounded-xl pl-11 pr-10 text-sm border-border/60 shadow-sm focus:border-primary"
            />
            {value && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Clear search"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}
