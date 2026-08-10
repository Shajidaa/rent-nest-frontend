// ─── Types ────────────────────────────────────────────────────────────────────

import { IProperty } from "./type";

export type Rental = {
  id: string;
  tenantId: string;
  propertyId: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "PAID" | "COMPLETED";
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
