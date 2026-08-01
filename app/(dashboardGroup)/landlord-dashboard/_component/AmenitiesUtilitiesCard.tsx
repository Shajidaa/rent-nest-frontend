import { Card,  CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Compass } from "lucide-react";
import { Controller, UseFormReturn } from "react-hook-form";
import { CreatePropertyInput } from "../_schemas/property.schema";
import SectionTitle from "./SectionTitle";
import { AMENITIES, UTILITIES } from "./_constants/property.constants";


export function AmenitiesUtilitiesCard({ form }: { form: UseFormReturn<CreatePropertyInput> }) {
  const { control } = form;

  return (
    <Card className="border-neutral-200">
      <CardHeader>
        <SectionTitle n="05" title="Amenities & utilities" icon={Compass} />
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <Label className="mb-3 block">Amenities</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {AMENITIES.map((a) => (
              <Controller
                key={a}
                control={control}
                name="amenities"
                render={({ field }) => (
                  <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                    <Checkbox
                      checked={field.value.includes(a)}
                      onCheckedChange={(checked) =>
                        field.onChange(
                          checked ? [...field.value, a] : field.value.filter((x: string) => x !== a)
                        )
                      }
                    />
                    {a}
                  </label>
                )}
              />
            ))}
          </div>
        </div>
        <Separator />
        <div>
          <Label className="mb-3 block">Utilities included</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {UTILITIES.map((u) => (
              <Controller
                key={u}
                control={control}
                name="utilities"
                render={({ field }) => (
                  <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                    <Checkbox
                      checked={field.value.includes(u)}
                      onCheckedChange={(checked) =>
                        field.onChange(
                          checked ? [...field.value, u] : field.value.filter((x: string) => x !== u)
                        )
                      }
                    />
                    {u}
                  </label>
                )}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}