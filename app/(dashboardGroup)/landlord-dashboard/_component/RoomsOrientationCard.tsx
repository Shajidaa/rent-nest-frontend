import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { BedDouble } from "lucide-react";
import { Controller, UseFormReturn } from "react-hook-form";
import { CreatePropertyInput } from "../_schemas/property.schema";
import SectionTitle from "./SectionTitle";
import Field from "./Field";
import { FACING_OPTIONS } from "./_constants/property.constants";

export function RoomsOrientationCard({ form }: { form: UseFormReturn<CreatePropertyInput> }) {
  const { register, control, formState: { errors } } = form;

  return (
    <Card className="border-neutral-200">
      <CardHeader>
        <SectionTitle n="04" title="Rooms & orientation" icon={BedDouble} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Field label="Bedrooms" error={errors.bedrooms?.message}>
            <Input type="number" placeholder="3" {...register("bedrooms")} />
          </Field>
          <Field label="Bathrooms" error={errors.bathrooms?.message}>
            <Input type="number" placeholder="2" {...register("bathrooms")} />
          </Field>
          <Field label="Veranda">
            <Input type="number" placeholder="1" {...register("veranda")} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4 items-end">
          <Field label="Facing">
            <Controller
              control={control}
              name="facing"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {FACING_OPTIONS.map((f) => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
          <div className="flex items-center justify-between border rounded-md px-3 h-10 border-neutral-200">
            <Label htmlFor="parking" className="cursor-pointer text-sm">Parking available</Label>
            <Controller
              control={control}
              name="parking"
              render={({ field }) => (
                <Switch id="parking" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}