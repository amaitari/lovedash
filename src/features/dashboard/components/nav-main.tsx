import { Link, useRouterState } from "@tanstack/react-router";

import { Collapsible, CollapsibleTrigger } from "~/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";

import { weightLossNavigationItems } from "../data/navigation";

const MENU_BUTTON_STYLES = {
  base: "h-10 w-full transition-colors hover:bg-neutral-100 text-neutral-600",
  active:
    "data-[active=true]:bg-neutral-100 data-[active=true]:text-neutral-950",
  activeHover: "data-[active=true]:hover:bg-neutral-200",
};

const LINK_STYLES = {
  base: "flex h-10 w-full items-center justify-center gap-2 rounded-md font-medium",
  expanded: "px-2",
};

export function AppNavMain() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { open, toggleSidebar, isMobile } = useSidebar();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isRouteActive(item: any, pathname: string) {
    return (
      item.url === pathname ||
      (item.matchUrls?.length &&
        item.matchUrls.some((matchUrl: string) =>
          pathname.startsWith(matchUrl),
        ))
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Manage your tasks</SidebarGroupLabel>
      <SidebarMenu>
        {weightLossNavigationItems.map((item) => {
          const isActive = isRouteActive(item, pathname);

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={cn(
                      MENU_BUTTON_STYLES.base,
                      MENU_BUTTON_STYLES.active,
                      MENU_BUTTON_STYLES.activeHover,
                    )}
                    data-active={isActive}
                    onClick={() => (isMobile ? toggleSidebar() : null)}
                  >
                    <Link
                      to={item.url}
                      className={cn(
                        LINK_STYLES.base,
                        open && LINK_STYLES.expanded,
                      )}
                    >
                      {open && (
                        <span className="sidebar-expanded:flex sidebar-collapsed:hidden flex-1 truncate">
                          {item.title}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
