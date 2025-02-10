"use client";

import { ColumnDef } from "@tanstack/react-table";

export type TimeSlot = {
  id: string;
  time: string;
  status: string;
};

export const columns: ColumnDef<TimeSlot>[] = [
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
