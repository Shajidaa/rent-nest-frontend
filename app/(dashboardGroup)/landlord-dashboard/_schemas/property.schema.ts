import { z } from "zod";

export const createPropertySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  categoryId: z.string().min(1, "Category is required"),
  city: z.string().min(2, "City is required"),
  area: z.string().min(2, "Area is required"),
  fullAddress: z.string().min(5, "Full address is required"),
  price_per_month: z.coerce.number().positive("Rent must be positive"),
  securityDeposit: z.coerce
    .number()
    .positive("Security deposit must be positive"),
  size: z.coerce.number().positive("Size must be positive"),
  sizeUnit: z.enum(["SQFT", "SQM"]),
  bedrooms: z.coerce.number().nonnegative("Bedrooms cannot be negative"),
  bathrooms: z.coerce.number().nonnegative("Bathrooms cannot be negative"),
  veranda: z.coerce
    .number()
    .nonnegative("Veranda cannot be negative")
    .nullable(),
  facing: z.enum(["NORTH", "SOUTH", "EAST", "WEST"]),
  parking: z.boolean().default(false),
  amenities: z.array(z.string()).default([]),
  utilities: z.array(z.string()).default([]),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  video: z.string().url().optional().or(z.literal("")),
  preferredTenant: z.enum([
    "FAMILY",
    "BACHELOR",
    "STUDENT",
    "JOB_HOLDER",
    "OFFICE_COMMERCIAL",
    " APARTMENT",
    "ANY",
  ]),
  isAvailable: z.boolean().default(true),
  status: z.enum(["AVAILABLE"]).default("AVAILABLE"),
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
