"use server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MyCalendar from "./calendar";
import CalAppointments from "./appointments";

export default async function DashMain() {
  const date = new Date().toISOString();

  return (
    <div className="h-full m-3 flex items-start gap-2">
      <MyCalendar />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Avalible times</CardTitle>
          <CardDescription>
            Select the day you want to book the local venue, <br /> pick an
            avalible time to book it, bellow.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <CalAppointments date={date} />
        </CardContent>
      </Card>
    </div>
  );
}
