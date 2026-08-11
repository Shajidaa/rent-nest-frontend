import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { KeyRound } from "lucide-react";
import { Controller, UseFormReturn } from "react-hook-form";
import { CreatePropertyInput } from "../_schemas/property.schema";
import SectionTitle from "./SectionTitle";
import Field from "./Field";
import { SIZE_UNITS } from "./_constants/property.constants";

export function PricingSizeCard({ form }: { form: UseFormReturn<CreatePropertyInput> }) {
  const { register, control, formState: { errors } } = form;

  return (
    <Card className="border-neutral-200">
      <CardHeader>
        <SectionTitle n="03" title="Pricing & size" icon={KeyRound} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Rent per month (৳)" error={errors.price_per_month?.message}>
            <Input type="number" placeholder="25000" {...register("price_per_month")} />
          </Field>
          <Field label="Security deposit (৳)" error={errors.securityDeposit?.message}>
            <Input type="number" placeholder="50000" {...register("securityDeposit")} />
          </Field>
        </div>
        <div className="grid  grid-cols-2 gap-4">
          <Field label="Size" error={errors.size?.message}>
            <Input type="number" placeholder="1450" {...register("size")} />
          </Field>
          <Field label="Unit">
            <Controller
              control={control}
              name="sizeUnit"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SIZE_UNITS.map((u) => (
                      <SelectItem key={u} value={u}>{u}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </div>
      </CardContent>
    </Card>
  );
}