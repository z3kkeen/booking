"use client";

import type * as React from "react";
import {
  AudioWaveform,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./item-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Local stage",
      logo: GalleryVerticalEnd,
      plan: "Local venue",
    },
    {
      name: "Escape room",
      logo: AudioWaveform,
      plan: "Entertainment",
    },
    {
      name: "Red bike",
      logo: Command,
      plan: "Bicycle",
    },
  ],
  navMain: [
    {
      title: "Booked by you",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Local stage (example)",
          url: "#",
        },
      ],
    },
    {
      title: "Shared with you",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Red bike (exmaple)",
          url: "#",
        },
        {
          title: "Escape room (exmaple)",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Public profile",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Red bike - 11:30-12:30",
      url: "#",
      icon: Frame,
    },
    {
      name: "Local stage - 16:00-20:00",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Escape room - 14:00-15:00",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
