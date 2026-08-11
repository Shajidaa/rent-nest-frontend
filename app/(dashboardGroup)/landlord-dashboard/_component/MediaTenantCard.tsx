/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ImageIcon, Plus, X, Video, Users, Loader2 } from "lucide-react";
import { Controller, UseFormReturn } from "react-hook-form";
import { CreatePropertyInput } from "../_schemas/property.schema";
import SectionTitle from "./SectionTitle";
import Field from "./Field";
import { PREFERRED_TENANTS } from "./_constants/property.constants";

interface MediaTenantCardProps {
  form: UseFormReturn<CreatePropertyInput>;
  isPending: boolean;
}

export function MediaTenantCard({ form, isPending }: MediaTenantCardProps) {
  const [imageUrl, setImageUrl] = useState("");
  const { register, control, watch, setValue, formState: { errors } } = form;
  const formValues = watch();

  return (
    <Card className="border-neutral-200 overflow-hidden">
      <CardHeader>
        <SectionTitle n="06" title="Media & tenant preference" icon={ImageIcon} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label>Image URLs</Label>
          <div className="flex gap-2">
            <Input
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!imageUrl.trim()) return;
                  setValue("images", [...formValues.images, imageUrl.trim()]);
                  setImageUrl("");
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              className="shrink-0"
              onClick={() => {
                if (!imageUrl.trim()) return;
                setValue("images", [...formValues.images, imageUrl.trim()]);
                setImageUrl("");
              }}
            >
              <Plus size={16} className="mr-1" /> Add
            </Button>
          </div>
          {errors.images && (
            <p className="text-xs text-red-500">{(errors.images as any)?.message ?? "Invalid image URL"}</p>
          )}
          {formValues.images.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {formValues.images.map((img: string, i: number) => (
                <Badge key={i} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1 max-w-[240px]">
                  <span className="truncate text-xs">{img}</span>
                  <button
                    type="button"
                    onClick={() => setValue("images", formValues.images.filter((_: string, idx: number) => idx !== i))}
                    className="ml-1 hover:text-red-500"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Field label="Video URL (optional)" error={errors.video?.message}>
          <div className="relative">
            <Video size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-8" placeholder="https://youtube.com/..." {...register("video")} />
          </div>
        </Field>

        <Field label="Preferred tenant">
          <Controller
            control={control}
            name="preferredTenant"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-muted-foreground" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {PREFERRED_TENANTS.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <div className="flex items-center justify-between border rounded-md px-3 h-10 border-neutral-200">
          <Label htmlFor="avail" className="cursor-pointer text-sm">Mark as available immediately</Label>
          <Controller
            control={control}
            name="isAvailable"
            render={({ field }) => (
              <Switch id="avail" checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>
      </CardContent>

      <CardFooter className="flex gap-3 justify-end border-t pt-4">
        <Button type="submit" disabled={isPending} className="...">
          {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {isPending ? "Publishing..." : "Publish Listing"}
        </Button>
      </CardFooter>
    </Card>
  );
}