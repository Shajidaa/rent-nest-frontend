// ─── Types ────────────────────────────────────────────────────────────────────

import { IProperty } from "./type";

export type Rental = {
  id: string;
  tenantId: string;
  propertyId: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
  startDate: string;
  endDate: string;
  updateAt: string;
  offeredRent: number;
  message: string;
  rejectionReason: string;
  numberOfGuests: number;
  property: IProperty;
};
export type RentalResponse = {
  total: number;
  data: Rental[];
};
