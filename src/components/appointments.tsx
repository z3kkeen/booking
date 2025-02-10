"use server";
import { getAvailableAppointments } from "@/lib/appointments";
import AppointmentsTableClient from "./client-appointments";
import { TimeSlot } from "./columns";

async function getData(date): Promise<TimeSlot[]> {
  const appointments = await getAvailableAppointments(date);
  return appointments.map((appointment) => ({
    id: appointment.id.toString(),
    time: new Date(appointment.date).toLocaleTimeString(),
    status: appointment.isBooked ? "Booked" : "Avalible",
  }));
}

export default async function CalAppointments({ date }: { date: string }) {
  const data = await getData(date);
  console.log(data);

  return (
    <div>
      <AppointmentsTableClient data={data} />
    </div>
  );
}
