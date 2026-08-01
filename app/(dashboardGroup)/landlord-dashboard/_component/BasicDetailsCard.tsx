import { Card, CardContent, CardHeader} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Home } from "lucide-react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Category } from "@/lib/type";
import SectionTitle from "./SectionTitle";
import { CreatePropertyInput } from "../_schemas/property.schema";
import Field from "./Field";


interface BasicDetailsCardProps {
  form: UseFormReturn<CreatePropertyInput>;
  categories: Category[];
}

export function BasicDetailsCard({ form, categories }: BasicDetailsCardProps) {
  const { register, control, formState: { errors } } = form;

  return (
    <Card className="border-neutral-200">
      <CardHeader>
        <SectionTitle n="01" title="Basic details" icon={Home} />
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Listing title" error={errors.title?.message}>
          <Input placeholder="e.g. Sunny 3-bed apartment in Bashundhara" {...register("title")} />
        </Field>
        <Field label="Description" error={errors.description?.message}>
          <Textarea rows={4} placeholder="Describe the property, surroundings, nearby facilities..." {...register("description")} />
        </Field>
        <Field label="Category" error={errors.categoryId?.message}>
          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a property category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.length === 0 && (
                    <SelectItem value="_none" disabled>No categories found</SelectItem>
                  )}
                  {categories?.data?.categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </CardContent>
    </Card>
  );
}