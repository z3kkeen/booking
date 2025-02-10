"use client";
import React, { useState } from "react";
import { DataTable } from "./data-table";
import { columns, TimeSlot } from "./columns";
import { bookAppointmentAction } from "@/lib/appointments";

type AppointmentsTableClientProps = {
  data: TimeSlot[];
};

export default function AppointmentsTableClient({
  data,
}: AppointmentsTableClientProps) {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);

  const handleRowClick = (row: any) => {
    console.log("Row original id: ", row.original.id);
    setSelectedAppointmentId(row.original.id);
  };

  return (
    <div className="max-h-[47vh] overflow-y-auto">
      <DataTable columns={columns} data={data} onRowClick={handleRowClick} />
      <form action={bookAppointmentAction} className="mt-4">
        <input
          type="hidden"
          name="appointmentId"
          value={selectedAppointmentId || ""}
        />
        <button
          type="submit"
          disabled={!selectedAppointmentId}
          className="btn btn-primary"
        >
          Book
        </button>
      </form>
    </div>
  );
}
