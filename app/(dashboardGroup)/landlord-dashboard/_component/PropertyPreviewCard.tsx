import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, BedDouble, Bath, Image as ImageIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CreatePropertyInput } from "../_schemas/property.schema";
import formatBDT from "./FormatBDT";


export function PropertyPreviewCard({ form }: { form: UseFormReturn<CreatePropertyInput> }) {
  const formValues = form.watch();

  return (
    <div className="lg:sticky lg:top-6">
      <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mb-3 px-1">Live preview</p>
      <Card className="overflow-hidden border-neutral-200 p-0">
        <div className="h-44 bg-neutral-100 flex items-center justify-center overflow-hidden">
          {formValues.images[0] ? (
            <img
              src={formValues.images[0]}
              alt="property"
              className="h-full w-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : (
            <ImageIcon className="text-neutral-300" size={36} />
          )}
        </div>
        <CardContent className="pt-4 pb-5 space-y-3">
          <div className="flex items-center justify-between">
            <Badge className="bg-teal-700 hover:bg-teal-800 text-white text-xs">
              Property
            </Badge>
            {formValues.parking && (
              <span className="text-xs text-neutral-500 border px-1.5 py-0.5 rounded">Parking</span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-sm leading-snug">
              {formValues.title || "Your listing title"}
            </h3>
            <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
              <MapPin size={11} />
              {[formValues.area, formValues.city].filter(Boolean).join(", ") || "Area, City"}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span className="flex items-center gap-1"><BedDouble size={13} /> {formValues.bedrooms || 0} bed</span>
            <span className="flex items-center gap-1"><Bath size={13} /> {formValues.bathrooms || 0} bath</span>
            <span>{formValues.size || 0} {formValues.sizeUnit}</span>
          </div>
          <Separator />
          <div className="flex items-baseline justify-between">
            <span className="text-base font-bold text-teal-700">
              {formatBDT(formValues.price_per_month)}
              <span className="text-xs font-normal text-neutral-400"> /mo</span>
            </span>
            <span className="text-xs text-neutral-400">
              Deposit {formatBDT(formValues.securityDeposit)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}