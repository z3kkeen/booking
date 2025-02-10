"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function MyCalendar() {
  const [value, setValue] = useState<Date | undefined>(new Date());

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <>
      <Calendar onChange={handleChange} value={value} />
    </>
  );
}
