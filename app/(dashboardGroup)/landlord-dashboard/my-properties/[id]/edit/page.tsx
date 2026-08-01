import { notFound } from "next/navigation";
import { PencilLine } from "lucide-react";
import { EditPropertyForm } from "../../../_component/EditPropertyForm";
import { fetchSingleProperty } from "../../../_action/property-create";
import { getCategories } from "../../../../admin-dashboard/_actions/adminAction";

export default async function EditPropertyPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const [propertyRes, categoriesRes] = await Promise.all([
        fetchSingleProperty(id),
        getCategories(),
    ]);

    const property = propertyRes?.data ?? propertyRes;
    const categories = categoriesRes?.data ?? [];

    if (!property?.id) notFound();

    return (
        <div className="min-h-screen bg-[#FAFAF8] text-[#1C1C1A] p-6 md:p-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-1">
                    <div className="h-9 w-9 rounded-lg bg-[#0B4F4A] flex items-center justify-center">
                        <PencilLine className="text-white" size={18} />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">Edit Property</h1>
                </div>
                <p className="text-sm text-neutral-500 mb-8 ml-12">
                    Update the details below and save your changes.
                </p>
                <EditPropertyForm property={property} categories={categories} />
            </div>
        </div>
    );
}
