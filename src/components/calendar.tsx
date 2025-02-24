"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

export default function MyCalendar({ date }) {
  const [value, setValue] = useState<ValuePiece | [ValuePiece, ValuePiece]>(
    date
  );
  const router = useRouter();

  const handleChange = (newValue: Date | Date[]) => {
    console.log("value: ", value?.toLocaleString());
    const selectedDate = Array.isArray(newValue) ? newValue[0] : newValue;
    setValue(selectedDate);
    console.log("new date: ", selectedDate.toLocaleString());

    router.push(`/dashboard?date=${encodeURIComponent(String(value))}`);
  };

  return (
    <>
      <Calendar
        value={value}
        onChange={setValue}
        onClickDay={handleChange}
        selectRange={false}
        className="rounded-md border bg-white"
      />
    </>
  );
}
