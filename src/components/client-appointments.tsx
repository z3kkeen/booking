"use client";
import React, { useState } from "react";
import { DataTable } from "./data-table";
import { columns, TimeSlot } from "./columns";
import { bookAppointmentAction } from "@/lib/appointments";
import { useRouter } from "next/navigation";
import LoadingBooking from "./loading-booking";
import { Button } from "./ui/button";

type AppointmentsTableClientProps = {
  data: TimeSlot[];
};

export default function AppointmentsTableClient({
  data,
}: AppointmentsTableClientProps) {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRowClick = (row: any) => {
    if (row.original.status === "Booked") return;
    setSelectedAppointmentId(row.original.id);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    await bookAppointmentAction(formData).then(() => {
      setLoading(false);
    });

    router.refresh();
  };

  return (
    <div>
      <div className="max-h-[40vh] overflow-y-auto">
        <DataTable columns={columns} data={data} onRowClick={handleRowClick} />
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-5">
        <input
          type="hidden"
          name="appointmentId"
          value={selectedAppointmentId || ""}
        />
        <Button type="submit" disabled={!selectedAppointmentId}>
          Book
        </Button>
        {loading && <LoadingBooking />}
      </form>
    </div>
  );
}
