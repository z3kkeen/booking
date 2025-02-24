"use server";
import { getAvailableAppointments } from "@/lib/appointments";
import AppointmentsTableClient from "./client-appointments";
import { TimeSlot } from "./columns";

async function getData(date: Date): Promise<TimeSlot[]> {
  const currentDate = new Date(date);
  const appointments = await getAvailableAppointments(currentDate);
  return appointments.map((appointment) => ({
    id: appointment.id.toString(),
    time: new Date(appointment.date).toLocaleTimeString(),
    status: appointment.isBooked ? "Booked" : "Available",
    email: appointment.bookedById || "N/A",
  }));
}

export default async function CalAppointments({ date }) {
  const data = await getData(date);
  return (
    <div>
      <AppointmentsTableClient data={data} />
    </div>
  );
}
