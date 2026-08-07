/* eslint-disable @typescript-eslint/no-explicit-any */

import { fetchRentalRequest } from '../_action/rental-request'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { Building, Delete, Edit, Edit2 } from 'lucide-react'
import DeleteButton from '../_component/DeleteButton'




export default async function RequestedProperties() {
  const response = await fetchRentalRequest()

  // Extracting the array of properties safely based on your JSON structure
  const properties = response?.data || []
  // console.log(response);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Properties</h2>
          <p className="text-sm text-muted-foreground">
            Total {properties ?.length || 0} properties retrieved successfully.
          </p>
        </div>
      </div>

      <div className="border rounded-md  shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type / Beds</TableHead>
              <TableHead>Price / Month</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Request</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.length > 0 ? (
              properties.map((property: any) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">
                   <div className="flex items-center gap-3">
                        {/* Property thumbnail */}
                        <div className="h-10 w-14 rounded-lg bg-muted/50 overflow-hidden shrink-0 border border-border/30">
                          {property.images && property.images.length > 0 ? (
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <Building className="h-4 w-4 text-muted-foreground/40" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm text-foreground truncate max-w-[200px]">
                            {property.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {property.size} {property.sizeUnit?.toLowerCase()} • {property.preferredTenant?.toLowerCase()}
                          </p>
                        </div>
                      </div>
                  </TableCell>

                  <TableCell>
                    {property.area}, {property.city}
                  </TableCell>

                  <TableCell>
                    <div className="capitalize">{property.category?.name || 'N/A'}</div>
                    <div className="text-xs text-muted-foreground">
                      {property.bedrooms} Bed • {property.bathrooms} Bath
                    </div>
                  </TableCell>

                  <TableCell className="font-semibold">
                    ৳{property.price_per_month.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={property.status === "AVAILABLE" ? "default" : "secondary"}

                    >
                      {property.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right font-medium">
                    {property.views}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/landlord-dashboard/requests/${property.id}`}
                      className=" hover:underline"
                    >
                      View 
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className='flex flex-row justify-center gap-2 items-center '>
<Link href={`/landlord-dashboard/edit/?id=${property.id}`}
                      className="text-primary hover:underline"
                    >
                      <Edit/>
                    </Link>
                   
                    <DeleteButton landId={property.id}/>
                    </div>
                    
                 
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                  No properties found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}