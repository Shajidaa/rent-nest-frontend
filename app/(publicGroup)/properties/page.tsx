import { Suspense } from "react";

import { PropertyFilters } from "../_components/property/property-filters";
import { PropertyCard } from "../_components/property/property-card";
import { fetchProperties } from "../_action/property";
import { PropertyGridSkeleton } from "../_components/property/propertySkeleton";
import { PropertySearchBar } from "../_components/property/property-search";
import { IProperty } from "@/lib/type";

interface PropertiesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const resolvedParams = await searchParams;
  const properties = await fetchProperties(resolvedParams);
const propertyList = Array.isArray(properties) ? properties : [];



  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Explore Properties</h1>
          <p className="text-muted-foreground">
            Find your dream home, apartment, or rental space with advanced filtering.
          </p>
        </div>
      </div>
<PropertySearchBar/>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filter Component */}
        <aside className="lg:col-span-1 space-y-4">
          <PropertyFilters />
        </aside>

        {/* Main Content Grid */}
        <main className="lg:col-span-3">
          <Suspense fallback={<PropertyGridSkeleton />}>
            {properties.length === 0 ? (
              <div className="text-center py-16 border rounded-lg bg-muted/20">
                <h3 className="text-lg font-semibold">No properties found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search filters or resetting them.
                </p>
              </div>
            ) : (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {propertyList.map((property: IProperty) => (
      <PropertyCard key={property.id} property={property} />
    ))}
  </div>
)}
            
          </Suspense>
        </main>
      </div>
    </div>
  );
}

