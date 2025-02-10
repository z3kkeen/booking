"use server";
import MainHeader from "@/components/dash-header";
import DashMain from "@/components/dash-main";

export default async function Dashboard() {
  return (
    <div className="h-screen w-full bg-sky-100 flex flex-col ">
      <MainHeader />
      <DashMain />
    </div>
  );
}
