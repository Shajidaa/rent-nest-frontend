import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import Link from "next/link";
import { IProperty } from "@/lib/type";

interface PropertyCardProps {
  property: IProperty;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <div className="relative h-48 w-full bg-muted">
        
          <div className="absolute top-3 left-3">
            <Badge variant={property.isAvailable ? "default" : "secondary"}>
              {property.isAvailable ? "Available" : "Booked"}
            </Badge>
          </div>
        </div>

        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
          </div>
          <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="line-clamp-1">{property.city}, {property.area}</span>
          </p>
        </CardHeader>

        <CardContent className="p-4 pt-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-3 pt-3 border-t">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4" />
              <span>{property.size} sqft</span>
            </div>
          </div>
        </CardContent>
      </div>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <span className="text-xl font-bold text-primary">${property.price_per_month}</span>
          <span className="text-xs text-muted-foreground"> / month</span>
        </div>
        <Link 
          href={`/properties/${property.id}`} 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-4 py-2"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}