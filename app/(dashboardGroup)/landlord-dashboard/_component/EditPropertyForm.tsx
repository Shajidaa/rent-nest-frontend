/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Category, IProperty } from "@/lib/type";
import { CreatePropertyInput, createPropertySchema } from "../_schemas/property.schema";
import { updateProperty } from "../_action/property-update";

import { BasicDetailsCard } from "./BasicDetailsCard";
import { LocationCard } from "./LocationCard";
import { PricingSizeCard } from "./PricingSizeCard";
import { RoomsOrientationCard } from "./RoomsOrientationCard";
import { AmenitiesUtilitiesCard } from "./AmenitiesUtilitiesCard";
import { MediaTenantCard } from "./MediaTenantCard";
import { PropertyPreviewCard } from "./PropertyPreviewCard";

interface EditPropertyFormProps {
    property: IProperty;
    categories: Category[];
}

export function EditPropertyForm({ property, categories }: EditPropertyFormProps) {

    
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<CreatePropertyInput>({
        resolver: zodResolver(createPropertySchema) as any,
        defaultValues: {
            title: property.title,
            description: property.description,
            categoryId: property.categoryId,
            city: property.city,
            area: property.area,
            fullAddress: property.fullAddress,
            price_per_month: property.price_per_month,
            securityDeposit: property.securityDeposit,
            size: property.size,
            sizeUnit: (property.sizeUnit as "SQFT" | "SQM") ?? "SQFT",
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            veranda: property.veranda ?? null,
            facing: (property.facing as "NORTH" | "SOUTH" | "EAST" | "WEST") ?? "NORTH",
            parking: property.parking,
            amenities: property.amenities ?? [],
            utilities: property.utilities ?? [],
            images: property.images ?? [],
            video: property.video ?? "",
            preferredTenant: (property.preferredTenant as CreatePropertyInput["preferredTenant"]) ?? "ANY",
            isAvailable: property.isAvailable,
            status: "AVAILABLE",
        },
    });

    const onSubmit = (data: CreatePropertyInput) => {
        startTransition(async () => {
            const payload = {
                ...data,
                veranda: data.veranda ?? null,
            } as CreatePropertyInput;

            const res = await updateProperty(payload, property.id);
            if (res.success) {
                toast.success("Property updated successfully!");
                router.push("/landlord-dashboard");
                router.refresh();
            } else {
                toast.error(res.error ?? "Failed to update property.");
            }
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
            <div className="space-y-6">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <BasicDetailsCard form={form} categories={categories} />
                    <LocationCard form={form} />
                    <PricingSizeCard form={form} />
                    <RoomsOrientationCard form={form} />
                    <AmenitiesUtilitiesCard form={form} />
                    <MediaTenantCard form={form} isPending={isPending} />
                </form>
            </div>
            <PropertyPreviewCard form={form} />
        </div>
    );
}
