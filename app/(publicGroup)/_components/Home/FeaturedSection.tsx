import React from 'react'
import FeaturedCard from './FeaturedCard'
import MyContainer from '@/components/ui/shared/MyContainer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { IProperty } from '@/lib/type'
import { fetchProperties } from '../../_action/property'

export default async function FeaturedSection() {
      const allProperties = await fetchProperties({});
  const featured: IProperty[] = Array.isArray(allProperties?.data?.data)
    ? allProperties?.data?.data.slice(0, 10)
    : [];
   
    
  return (
     <section className="bg-[#FAFAF8] py-16 dark:bg-muted/10">
        <div className="mx-auto  px-4 md:px-8">
          <MyContainer className="py-16">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Latest Listings
              </p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight">
                Featured Properties
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Hand-picked, recently listed properties across Bangladesh.
              </p>
            </div>
            <Button variant="outline" asChild className="hidden gap-2 md:flex">
              <Link href="/properties">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
  
          {featured.length === 0 ? (
            <div className="rounded-2xl border border-dashed py-20 text-center text-muted-foreground">
              No properties listed yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4 xl:grid-cols-5">
              {featured.map((property) => (
                <FeaturedCard key={property.id} property={property} />
              ))}
            </div>
          )}
 </MyContainer>
          <div className="mt-8 flex justify-center md:hidden">
            <Button variant="outline" asChild className="gap-2">
              <Link href="/properties">
                View All Properties <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
  )
}
