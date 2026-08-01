import { z } from "zod";

export const createPropertySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  categoryId: z.string().min(1, "Category is required"),
  city: z.string().min(1, "City is required"),
  area: z.string().min(1, "Area is required"),
  fullAddress: z.string().min(5, "Full address is required"),
  price_per_month: z.coerce.number().positive("Rent must be a positive number"),
  securityDeposit: z.coerce.number().nonnegative("Deposit cannot be negative"),
  size: z.coerce.number().positive("Size must be positive"),
  sizeUnit: z.enum(["SQFT", "SQM", "KATHA"]),
  bedrooms: z.coerce.number().int().nonnegative(),
  bathrooms: z.coerce.number().int().nonnegative(),
  veranda: z.coerce.number().int().nullable().optional(),
  facing: z.enum(["NORTH", "SOUTH", "EAST", "WEST"]),
  parking: z.boolean(),
  amenities: z.array(z.string()),
  utilities: z.array(z.string()),
  images: z.array(z.string().url("Must be a valid URL")),
  video: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  preferredTenant: z.enum(["FAMILY", "BACHELOR", "FEMALE_ONLY", "ANY"]),
  isAvailable: z.boolean(),
  status: z.enum(["ACTIVE", "DRAFT"]),
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
