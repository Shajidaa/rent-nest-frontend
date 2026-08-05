import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getPropertyById } from "../../_action/property";
import PropertyLandDetails from "../../_components/property-details/propertyLandDetails";
import { PropertyLandLord } from "../../_components/property-details/propertyLandlord";
import MyContainer from "@/components/ui/shared/MyContainer";
import { getRentedRentalForProperty } from "../../_action/getRentalId";

interface PropertyDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetails({ params }: PropertyDetailsProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) notFound();

  const rentalId = await getRentedRentalForProperty(id);

  return (
    <div className="min-h-screen bg-[#FAFAF9] dark:bg-background">
      {/* ── Top Nav Bar ── */}
      <div className="sticky top-0 z-30 border-b bg-white/80 dark:bg-background/80 backdrop-blur-md">
        <MyContainer className="flex items-center h-14">
          <Button
            variant="ghost"
            asChild
            className="pl-0 gap-2 text-muted-foreground hover:text-foreground text-sm"
          >
            <Link href="/properties">
              <ArrowLeft className="w-4 h-4" /> Back to Properties
            </Link>
          </Button>
        </MyContainer>
      </div>

      {/* ── Main Content ── */}
      <MyContainer className="py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
          {/* Left: full detail */}
          <PropertyLandDetails {...property} rentalId={rentalId} />

          {/* Right: sticky landlord / request card */}
          <div className="lg:sticky lg:top-20">
            <PropertyLandLord {...property} />
          </div>
        </div>
      </MyContainer>
    </div>
  );
}
