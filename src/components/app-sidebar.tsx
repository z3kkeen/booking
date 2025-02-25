"use client";
import type * as React from "react";
import { CardDescription, CardTitle } from "@/components/ui/card";
import NavProjects from "./nav-projects";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export default function AppSidebar({ appointments }) {
  console.log(appointments);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-5">
        <CardTitle>Sidebar</CardTitle>
        <CardDescription>
          Upcoming appointments you have booked:
        </CardDescription>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="px-2">
            {appointments.map((item) => {
              const date = new Date(item.date).toLocaleString();
              return <SidebarMenuItem key={item.id}>{date}</SidebarMenuItem>;
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
