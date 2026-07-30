import { notFound } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  CheckCircle2, 
  ArrowLeft, 
  Compass, 
  Car, 
  ShieldCheck, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Layers
} from "lucide-react";

import { getPropertyById } from "../../_action/property";
import PropertyLandDetails from "../../_components/property-details/propertyLandDetails";
import PropertyLandLord from "../../_components/property-details/propertyLandlord";

interface PropertyDetailsProps {
  params: Promise<{ id: string }>;
}



export default async function PropertyDetails({ params }: PropertyDetailsProps) {
  const { id } = await params;
  const property = await getPropertyById(id);


  if (!property) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 space-y-8">
      {/* Back Navigation */}
      <div>
        <Button variant="ghost" asChild className="pl-0 gap-2 text-muted-foreground hover:text-foreground">
          <Link href="/properties">
            <ArrowLeft className="w-4 h-4" /> Back to Properties
          </Link>
        </Button>
      </div>
<div className="grid grid-cols-1 ">
  
      <PropertyLandDetails {...property}/>

        {/* Right Side: Landlord / Host Details Card */}
      <PropertyLandLord {...property} />
</div>


      </div>
   
  );
}