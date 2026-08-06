"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
  siblingCount?: number;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  baseUrl = "/properties",
  siblingCount = 1 
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", page.toString());
    // Preserve limit if exists
    if (!params.has("limit")) {
      params.set("limit", "10");
    }
    return `${pathname}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const totalPageNumbers = siblingCount * 2 + 3; // siblings + current + first + last
    const firstPage = 1;
    const lastPage = totalPages;

    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, firstPage);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, lastPage);
    const shouldShowLeftDots = leftSiblingIndex > firstPage + 1;
    const shouldShowRightDots = rightSiblingIndex < lastPage - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = Array.from(
        { length: 3 + siblingCount * 2 },
        (_, i) => i + 1
      );
      return [...leftRange, "dots", lastPage];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = Array.from(
        { length: 3 + siblingCount * 2 },
        (_, i) => lastPage - (3 + siblingCount * 2) + i + 1
      );
      return [firstPage, "dots", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: siblingCount * 2 + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPage, "dots", ...middleRange, "dots", lastPage];
    }

    return [];
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center gap-1" aria-label="Pagination">
      {/* Previous */}
      <Link
        href={createPageUrl(Math.max(1, currentPage - 1))}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium transition-colors",
          currentPage === 1
            ? "pointer-events-none opacity-50"
            : "hover:bg-accent hover:text-accent-foreground"
        )}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Link>

      {/* Page Numbers */}
      {pageNumbers.map((pageNumber, index) => {
        if (pageNumber === "dots") {
          return (
            <div
              key={`dots-${index}`}
              className="flex h-9 w-9 items-center justify-center"
            >
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">More pages</span>
            </div>
          );
        }

        const isActive = pageNumber === currentPage ;

        return (
          <Link
            key={pageNumber}
              href={typeof pageNumber === 'number' ? createPageUrl(pageNumber) : '#'}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium transition-colors",
              isActive
                ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {pageNumber}
            <span className="sr-only">
              {isActive ? `Page ${pageNumber}, current page` : `Go to page ${pageNumber}`}
            </span>
          </Link>
        );
      })}

      {/* Next */}
      <Link
        href={createPageUrl(Math.min(totalPages, currentPage + 1))}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium transition-colors",
          currentPage === totalPages
            ? "pointer-events-none opacity-50"
            : "hover:bg-accent hover:text-accent-foreground"
        )}
        aria-disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Link>
    </nav>
  );
}