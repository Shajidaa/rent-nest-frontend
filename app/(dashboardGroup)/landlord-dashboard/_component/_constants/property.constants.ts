export const FACING_OPTIONS = ["NORTH", "SOUTH", "EAST", "WEST"] as const;
export const SIZE_UNITS = ["SQFT", "SQM"] as const;

export const PREFERRED_TENANTS = [
  { value: "FAMILY", label: "Family" },
  { value: "BACHELOR", label: "Bachelor" },
  { value: "ANY", label: "Any" },
];

export const AMENITIES = [
  "Lift",
  "Generator",
  "Security Guard",
  "CCTV",
  "Community Hall",
  "Gym",
  "Swimming Pool",
  "Rooftop Access",
];

export const UTILITIES = [
  "Water",
  "Electricity",
  "Gas",
  "Internet",
  "Maintenance",
];
