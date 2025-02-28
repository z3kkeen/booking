"use server";
import MainHeader from "@/components/dash-header";
import DashMain from "@/components/dash-main";
import { ReactNode } from "react";

export default async function Dashboard(props: {
  children: ReactNode;
  searchParams: Promise<{ date: string }>;
}) {
  const params = await props.searchParams;
  const paramDate = params.date;
  console.log("param date: ", new Date(paramDate));

  let selectedDate = new Date();
  if (params.date) {
    selectedDate = new Date(params.date);
  }

  console.log("selected date: ", selectedDate);

  return Promise.resolve(
    <div className="h-full m-3 flex flex-col gap-4">
      <MainHeader />
      <DashMain date={selectedDate} />
    </div>
  );
}
