
import Image from "next/image";


import { Badge } from "@/components/ui/badge";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  CheckCircle2, 

  Compass, 
  Car, 
  ShieldCheck, 
 
  Calendar,
  Layers
} from "lucide-react";




export default function PropertyLandDetails({...property}) {
  return (
    <div>
    {/* Header Info Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-primary border-primary font-medium">
              {property.category?.name || "Property"}
            </Badge>
            <Badge variant={property.isAvailable ? "default" : "secondary"}>
              {property.status}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{property.title}</h1>
          <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <MapPin className="w-4 h-4 shrink-0 text-primary" />
            <span>{property.fullAddress}, {property.area}, {property.city}</span>
          </p>
        </div>

        <div className="text-left md:text-right bg-card border p-4 rounded-xl shadow-sm w-full md:w-auto">
          <span className="text-sm text-muted-foreground block">Monthly Rent</span>
          <span className="text-3xl font-extrabold text-primary">${property.price_per_month.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground block mt-0.5">Deposit: ${property.securityDeposit?.toLocaleString()}</span>
        </div>
      </div>

      {/* Media Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-100 md:h-120">
        {/* Main large image */}
        <div className="md:col-span-2 relative bg-muted rounded-2xl overflow-hidden border">
          {property.images && property.images.length > 0 ? (
            <Image
              src={`/${property.images[0]}`} // Update to absolute path if hosting on Cloudinary/S3
              alt={property.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">No Image Available</div>
          )}
        </div>

        {/* Secondary grid layout for remaining images */}
        <div className="hidden md:flex flex-col gap-4 h-full">
          <div className="relative flex-1 bg-muted rounded-2xl overflow-hidden border">
            {property.images && property.images[1] ? (
              <Image
                src={`/${property.images[1]}`}
                alt={`${property.title} view 2`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">Secondary View</div>
            )}
          </div>
          <div className="relative flex-1 bg-card rounded-2xl overflow-hidden border flex items-center justify-center bg-card">
            {property.images && property.images.length > 2 ? (
              <Image
                src={`/${property.images[2]}`}
                alt={`${property.title} view 3`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="text-center p-4">
                <span className="font-semibold block text-lg">{property.views}</span>
                <span className="text-xs text-muted-foreground">Property Views</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Specifications & Description */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Property Attributes Card */}
          <Card>
            <CardContent className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div className="space-y-1">
                <Bed className="w-5 h-5 mx-auto text-primary" />
                <span className="text-xs text-muted-foreground block">Bedrooms</span>
                <span className="font-semibold text-base">{property.bedrooms}</span>
              </div>
              <div className="space-y-1">
                <Bath className="w-5 h-5 mx-auto text-primary" />
                <span className="text-xs text-muted-foreground block">Bathrooms</span>
                <span className="font-semibold text-base">{property.bathrooms}</span>
              </div>
              <div className="space-y-1">
                <Layers className="w-5 h-5 mx-auto text-primary" />
                <span className="text-xs text-muted-foreground block">Veranda</span>
                <span className="font-semibold text-base">{property.veranda}</span>
              </div>
              <div className="space-y-1">
                <Square className="w-5 h-5 mx-auto text-primary" />
                <span className="text-xs text-muted-foreground block">Total Size</span>
                <span className="font-semibold text-base">{property.size} {property.sizeUnit}</span>
              </div>
            </CardContent>
          </Card>

          {/* Overview / Description */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">About This Property</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          <Separator />

          {/* Detailed Features Grid */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Property Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <span className="text-muted-foreground flex items-center gap-2"><Compass className="w-4 h-4" /> Facing Direction</span>
                <span className="font-medium">{property.facing}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <span className="text-muted-foreground flex items-center gap-2"><Car className="w-4 h-4" /> Parking Facility</span>
                <span className="font-medium">{property.parking ? "Available" : "Not Available"}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <span className="text-muted-foreground flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Preferred Tenant</span>
                <span className="font-medium">{property.preferredTenant}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <span className="text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4" /> Listed Date</span>
                <span className="font-medium">{new Date(property.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Amenities Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities?.map((amenity :string[], index:number) => (
                <div key={index} className="flex items-center gap-2 p-2.5 rounded-lg border bg-card">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Utilities Section */}
          {property.utilities && property.utilities.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Included Utilities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.utilities.map((utility:string[], index:number) => (
                  <div key={index} className="flex items-center gap-2 p-2.5 rounded-lg border bg-card">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-sm font-medium">{utility}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
         </div>
        </div>
  )
}

