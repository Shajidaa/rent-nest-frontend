import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CreatePropertyInput } from "../_schemas/property.schema";
import SectionTitle from "./SectionTitle";
import Field from "./Field";


export function LocationCard({ form }: { form: UseFormReturn<CreatePropertyInput> }) {
  const { register, formState: { errors } } = form;

  return (
    <Card className="border-neutral-200">
      <CardHeader>
        <SectionTitle n="02" title="Location" icon={MapPin} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="City" error={errors.city?.message}>
            <Input placeholder="Dhaka" {...register("city")} />
          </Field>
          <Field label="Area" error={errors.area?.message}>
            <Input placeholder="Bashundhara R/A" {...register("area")} />
          </Field>
        </div>
        <Field label="Full address" error={errors.fullAddress?.message}>
          <Input placeholder="House 12, Road 4, Block C..." {...register("fullAddress")} />
        </Field>
      </CardContent>
    </Card>
  );
}