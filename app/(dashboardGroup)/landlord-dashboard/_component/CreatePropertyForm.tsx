/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  BedDouble,
  Bath,
  Compass,
  Image as ImageIcon,
  Video,
  Users,
  Plus,
  X,
  Home,
  KeyRound,
  Loader2,
} from "lucide-react";

import { createProperty } from "../_action/property-create";
import { CreatePropertyInput, createPropertySchema } from "../_schemas/property.schema";
import { Category } from "@/lib/type";

// ─── Constants ────────────────────────────────────────────────────────────────

const FACING_OPTIONS = ["NORTH", "SOUTH", "EAST", "WEST"] as const;
const SIZE_UNITS = ["SQFT", "SQM"] as const;
const PREFERRED_TENANTS = [
  { value: "FAMILY", label: "Family" },
  { value: "BACHELOR", label: "Bachelor" },
  { value: "FEMALE_ONLY", label: "Female Only" },
  { value: "ANY", label: "Any" },
];
const AMENITIES = [
  "Lift", "Generator", "Security Guard", "CCTV",
  "Community Hall", "Gym", "Swimming Pool", "Rooftop Access",
];
const UTILITIES = ["Water", "Electricity", "Gas", "Internet", "Maintenance"];

function formatBDT(n: number | string) {
  const num = Number(n);
  if (!num) return "৳ —";
  return "৳ " + num.toLocaleString("en-IN");
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CreatePropertyForm({ categories }: { categories: Category[] }) {
  const [imageUrl, setImageUrl] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreatePropertyInput>({
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
      status: "DRAFT",
    },
  });

  const formValues = watch();
//   const selectedCategory = categories.find((c) => c.id === formValues.categoryId);

  const handleFormSubmit = (status: "ACTIVE" ) => {
    handleSubmit((data) => {
      startTransition(async () => {
        const payload = {
          ...data,
          status,
          veranda: data.veranda ?? null,
        } as CreatePropertyInput;
        const res = await createProperty(payload);
        if (res.success) {
          toast.success(
            status === "ACTIVE"
              ? "Property published successfully!"
              : "Property saved as draft."
          );
          router.push("/landlord-dashboard/my-properties");
        } else {
          toast.error(res.error ?? "Failed to create property.");
        }
      });
    })();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

      {/* ── Left: Form ── */}
      <div className="space-y-6">

        {/* 01 Basic Details */}
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
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
          </CardContent>
        </Card>

        {/* 02 Location */}
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

        {/* 03 Pricing & Size */}
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
            <div className="grid grid-cols-2 gap-4">
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

        {/* 04 Rooms & Orientation */}
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

        {/* 05 Amenities & Utilities */}
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

        {/* 06 Media & Tenant Preference */}
        <Card className="border-neutral-200">
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
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => handleFormSubmit("DRAFT")}
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save as Draft
            </Button>
            <Button
              type="button"
              disabled={isPending}
              className="bg-[#0B4F4A] hover:bg-[#0B4F4A]/90 text-white"
              onClick={() => handleFormSubmit("ACTIVE")}
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {isPending ? "Publishing..." : "Publish Listing"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* ── Right: Live Preview ── */}
      <div className="lg:sticky lg:top-6">
        <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mb-3 px-1">Live preview</p>
        <Card className="overflow-hidden border-neutral-200 p-0 gap-0">
          <div className="h-44 bg-neutral-100 flex items-center justify-center overflow-hidden">
            {formValues.images[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={formValues.images[0]}
                alt=""
                className="h-full w-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ) : (
              <ImageIcon className="text-neutral-300" size={36} />
            )}
          </div>
          <CardContent className="pt-4 pb-5 space-y-3">
            <div className="flex items-center justify-between">
              <Badge className="bg-[#0B4F4A] hover:bg-[#0B4F4A] text-white text-xs">
                {/* {selectedCategory?.name ?? "Category"} */} Home
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
              <span className="text-base font-bold text-[#0B4F4A]">
                {formatBDT(formValues.price_per_month)}
                <span className="text-xs font-normal text-neutral-400"> /mo</span>
              </span>
              <span className="text-xs text-neutral-400">
                Deposit {formatBDT(formValues.securityDeposit)}
              </span>
            </div>
            {formValues.amenities.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {formValues.amenities.slice(0, 4).map((a: string) => (
                  <span key={a} className="text-[10px] bg-neutral-100 rounded px-1.5 py-0.5 text-neutral-600">{a}</span>
                ))}
                {formValues.amenities.length > 4 && (
                  <span className="text-[10px] bg-neutral-100 rounded px-1.5 py-0.5 text-neutral-400">+{formValues.amenities.length - 4} more</span>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function SectionTitle({ n, title, icon: Icon }: { n: string; title: string; icon: any }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-mono text-neutral-400">{n}</span>
      <div className="h-4 w-px bg-neutral-200" />
      <Icon size={15} className="text-[#0B4F4A]" />
      <CardTitle className="text-base">{title}</CardTitle>
    </div>
  );
}
