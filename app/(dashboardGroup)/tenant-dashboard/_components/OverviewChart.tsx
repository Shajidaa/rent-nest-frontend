"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { fetchRental } from "../_action/rentalRequest";

const data = [
  { name: "Jan", rental: 1, payment: 1200, pending: 2, approved: 1 },
  { name: "Feb", rental: 1, payment: 1200, pending: 1, approved: 2 },
  { name: "Mar", rental: 1, payment: 1200, pending: 0, approved: 1 },
  { name: "Apr", rental: 1, payment: 1200, pending: 3, approved: 0 },
  { name: "May", rental: 1, payment: 1200, pending: 1, approved: 2 },
  { name: "Jun", rental: 1, payment: 1200, pending: 0, approved: 1 },
];

export async function OverviewChart() {
 
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          yAxisId="left"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        />
        <Legend />
        <Bar yAxisId="left" dataKey="rental" name="Rental" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
        <Bar yAxisId="right" dataKey="payment" name="Payment" fill="#f97316" radius={[4, 4, 0, 0]} />
        <Bar yAxisId="left" dataKey="pending" name="Pending" fill="#eab308" radius={[4, 4, 0, 0]} />
        <Bar yAxisId="left" dataKey="approved" name="Approved" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
