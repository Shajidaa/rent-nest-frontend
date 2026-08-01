
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


export default async function RequestedProperties() {
  const response = await fetchRentalRequest()
  
  // Extracting the array of properties safely based on your JSON structure
  const properties = response?.data || []
// console.log(response);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Requested Properties</h2>
          <p className="text-sm text-muted-foreground">
            Total {response?.data?.total || 0} properties retrieved successfully.
          </p>
        </div>
      </div>

      <div className="border rounded-md bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type / Beds</TableHead>
              <TableHead>Price / Month</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.length > 0 ? (
              properties.map((property: any) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">
                    <div className="font-semibold"><Link
                      href={`/landlord-dashboard/requests/${property.id}`} 
                      className="font-semibold hover:text-blue-600 hover:underline transition-colors"
                    >
                      {property.title}
                    </Link></div>
                    <div className="text-xs text-muted-foreground truncate max-w-[250px]">
                      {property.fullAddress}
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
                    className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/landlord-dashboard/requests/${property.id}/property-edit`}   
                    className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
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