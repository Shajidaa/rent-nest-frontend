/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Category } from "@/lib/type";
import { CreatePropertyInput, createPropertySchema } from "../_schemas/property.schema";
import { createProperty } from "../_action/property-create";

import { BasicDetailsCard } from "./BasicDetailsCard";
import { LocationCard } from "./LocationCard";
import { PricingSizeCard } from "./PricingSizeCard";
import { RoomsOrientationCard } from "./RoomsOrientationCard";
import { AmenitiesUtilitiesCard } from "./AmenitiesUtilitiesCard";
import { MediaTenantCard } from "./MediaTenantCard";
import { PropertyPreviewCard } from "./PropertyPreviewCard";  


export function CreatePropertyForm({ categories }: { categories: any[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<CreatePropertyInput>({
    resolver: zodResolver(createPropertySchema) as any,
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      city: "",
      area: "",
      fullAddress: "",
      price_per_month: "" as unknown as number,
      securityDeposit: "" as unknown as number,
      size: "" as unknown as number,
      sizeUnit: "SQFT",
      bedrooms: "" as unknown as number,
      bathrooms: "" as unknown as number,
      veranda: null,
      facing: "NORTH",
      parking: false,
      amenities: [],
      utilities: [],
      images: [],
      video: "",
      preferredTenant: "ANY",
      isAvailable: true,
      status: "AVAILABLE",
    },
  });

  const onSubmit = (data: CreatePropertyInput) => {
    startTransition(async () => {
      const payload = {
        ...data,
        status: "AVAILABLE",
        veranda: data.veranda ?? null,
      } as CreatePropertyInput;

      const res = await createProperty(payload);
      if (res.success) {
         router.refresh();
        toast.success("Property published successfully!");
       
      } else {
        toast.error(res.error ?? "Failed to create property.");
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 border-6 border-red-600 items-start">
      {/* Left: Form */}
      <div >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <BasicDetailsCard form={form} categories={categories} />
          <LocationCard form={form} />
          <PricingSizeCard form={form} />
          {/* <RoomsOrientationCard form={form} /> */}
          {/* <AmenitiesUtilitiesCard form={form} /> */}
          {/* <MediaTenantCard form={form} isPending={isPending} /> */}
        </form>
      </div>

      {/* Right: Live Preview */}
      <PropertyPreviewCard form={form} />
    </div>
  );
}