"use server";
import MainHeader from "@/components/dash-header";
import DashMain from "@/components/dash-main";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { date?: string };
}) {
  let selectedDate = new Date().toISOString();

  if (searchParams.date != "undefined") {
    console.log(searchParams.date);

    selectedDate = searchParams.date!;
  }

  console.log("selected: ", selectedDate);

  return (
    <div className="h-screen w-full bg-sky-100 flex flex-col ">
      <MainHeader />
      <DashMain date={selectedDate} />
    </div>
  );
}
