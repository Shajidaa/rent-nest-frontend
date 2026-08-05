import { Suspense } from "react";
import { SlidersHorizontal, Search } from "lucide-react";
import { PropertyFilters } from "../_components/property/property-filters";
import PropertyCard from "../_components/property/property-card";
import { fetchProperties } from "../_action/property";
import { PropertyGridSkeleton } from "../_components/property/propertySkeleton";
import { PropertySearchBar } from "../_components/property/property-search";
import { IProperty } from "@/lib/type";
import Pagination from "../_components/property/pagination";

interface PropertiesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const resolvedParams = await searchParams;
  const page = resolvedParams.page;
  const limit = resolvedParams.limit;
  const data = await fetchProperties({ ...resolvedParams, page, limit });
  const properties = data.data.data
  const meta = data.data.meta;
 

  const propertyList: IProperty[] = Array.isArray(properties) ? properties : [];

  const activeFilters = ["city", "minPrice", "maxPrice", "bedrooms", "searchTerm"]
    .filter((k) => !!resolvedParams[k])
    .map((k) => ({ key: k, value: resolvedParams[k] as string }));

  const hasFilters = activeFilters.length > 0;
  // console.log(properties);

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-background">

      {/* ── Page Header ── */}
      <div className="border-b bg-white dark:bg-card">
        <div className="mx-auto max-w-screen-xl px-4 py-8 md:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Explore Properties</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {propertyList.length > 0
                  ? `${propertyList.length} propert${propertyList.length === 1 ? "y" : "ies"} available`
                  : "Browse verified rentals across Bangladesh"}
              </p>
            </div>
            {/* Search bar */}
            <div className="w-full sm:max-w-xs md:max-w-sm">
              <Suspense>
                <PropertySearchBar />
              </Suspense>
            </div>
          </div>

          {/* Active filter chips */}
          {hasFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <SlidersHorizontal className="h-3 w-3" /> Active:
              </span>
              {activeFilters.map((f) => (
                <span
                  key={f.key}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize"
                >
                  {f.key === "searchTerm" ? "Search" : f.key === "minPrice" ? "Min ৳" : f.key === "maxPrice" ? "Max ৳" : f.key}:&nbsp;
                  <span className="font-semibold">{f.value}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="mx-auto max-w-screen-xl px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">

          {/* ── Sidebar ── */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <Suspense>
              <PropertyFilters />
            </Suspense>
          </aside>

          {/* ── Results ── */}
          <main>
            
            <Suspense fallback={<PropertyGridSkeleton />}>
              {propertyList.length === 0 ? (
                <EmptyState hasFilters={hasFilters} />
              ) : (
                <>
                  <p className="mb-4 text-xs text-muted-foreground">
                    Showing <span className="font-semibold text-foreground">{propertyList.length}</span> result{propertyList.length !== 1 ? "s" : ""}
                    {hasFilters && " for your filters"}
                  </p>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {propertyList.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                  {/* ── Pagination ── */}
                  {meta && meta.totalPages > 1 && (
                    <div className="mt-8 flex broder justify-center">
                      <Pagination
                        currentPage={meta.page}
                        totalPages={meta.totalPages}
                        baseUrl="/properties"
                      />
                    </div>)}
                </>
              )}
            </Suspense>
          </main>
        </div>
      </div>

    </div>
  );
}

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-white py-24 text-center dark:bg-card">
      <div className="rounded-full bg-muted p-5">
        <Search className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="mt-5 text-lg font-semibold">No properties found</h3>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        {hasFilters
          ? "Try adjusting or resetting your filters to see more results."
          : "No properties are available right now. Check back soon."}
      </p>
    </div>
  );
}
