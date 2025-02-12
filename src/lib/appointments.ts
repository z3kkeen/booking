"use server";
import { prisma } from "./prisma";
import { auth } from "./auth";
import { headers } from "next/headers";

export async function createAppointmentSlotsForDay(date: Date) {
  const openingHour = 8;
  const closingHour = 22;
  const slotDurationMinutes = 30;

  const startOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    openingHour,
    0,
    0,
    0
  );
  const endOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    closingHour,
    0,
    0,
    0
  );

  const slots = [];
  for (
    let current = new Date(startOfDay);
    current < endOfDay;
    current.setMinutes(current.getMinutes() + slotDurationMinutes)
  ) {
    slots.push({
      date: new Date(current),
      isBooked: false,
    });
  }

  console.log("Creating slots: ", slots.length);

  await prisma.appointment.createMany({
    data: slots,
    skipDuplicates: true,
  });

  const createdSlots = await prisma.appointment.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
      isBooked: false,
    },
    orderBy: { date: "asc" },
  });

  console.log("Slots after creation:", createdSlots.length);
  return createdSlots;
}

export async function getAvailableAppointments(dateValue: string) {
  const dateString = dateValue;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user || !session.user.id) {
    throw new Error("User not authorized");
  }

  const selectedDate = new Date(dateString);
  const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

  try {
    let appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: { date: "asc" },
    });

    if (!appointments.length) {
      console.log(
        "No unbooked appointments found. Attempting to create new slots for:",
        selectedDate.toDateString()
      );
      appointments = await createAppointmentSlotsForDay(selectedDate);
      console.log("After creation, appointments count:", appointments.length);
    }

    return appointments;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch appointments");
  }
}

export async function bookAppointment(appointmentId: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user || !session.user.id) {
    throw new Error("User not authorized");
  }

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment || appointment.isBooked) {
      throw new Error("Time-slot is no longer available.");
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        isBooked: true,
        bookedBy: { connect: { id: session.user.id } },
      },
    });
    return updatedAppointment;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to book appointment");
  }
}

export async function bookAppointmentAction(formData: FormData): Promise<void> {
  const appointmentId = formData.get("appointmentId") as string;
  if (!appointmentId) return;

  try {
    await bookAppointment(Number(appointmentId));
  } catch (error) {
    console.error("Booking failed:", error);
  }
}
