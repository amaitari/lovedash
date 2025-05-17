import * as React from "react";
import { Link } from "@tanstack/react-router";

import { Logo } from "~/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";

import { AppNavMain } from "./nav-main";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className={cn("flex w-full items-center py-2", open && "px-2")}>
          <Link to="/dashboard">
            <Logo />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <AppNavMain />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
