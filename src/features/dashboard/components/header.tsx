import { Link, useRouterState } from "@tanstack/react-router";
import { Sheet, SheetContent } from "~/components/ui/sheet";
import { cn } from "~/lib/utils";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Logo } from "~/components/logo";
import { NavigationItem } from "~/features/dashboard/data/navigation";

type DashboardHeader = {
  items: NavigationItem[];
  title: string;
};

type DashboardHeaderProps = {
  items: NavigationItem[];
  title: string;
};

export function DashboardHeader({ items }: DashboardHeaderProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);

  function isRouteActive(item: NavigationItem, pathname: string) {
    return (
      item.url === pathname ||
      (item.matchUrls?.length &&
        item.matchUrls.some((matchUrl: string) =>
          pathname.startsWith(matchUrl)
        ))
    );
  }

  return (
    <header className="sticky top-0 z-10 w-full bg-[#0A1A2F] px-4 py-4 sm:px-8 lg:px-[200px]">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <Logo />
        </Link>

        {/* Hamburger (visible only on mobile) */}
        <button
          className="sm:hidden rounded-full border border-[#334155] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <HiMenuAlt3 className="h-5 w-7 text-white" />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-6">
          {items.map((item) => {
            const isActive = isRouteActive(item, pathname);
            return (
              <Link
                key={item.url}
                to={item.url}
                className={cn(
                  "inline-flex items-center text-sm",
                  isActive ? "text-[#E9E9E9]" : "text-[#667281]"
                )}
              >
                {isActive && (
                  <div className="mr-2 size-2 rounded-full bg-[#E9E9E9]" />
                )}
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Sheet Menu Trigger */}
      {menuOpen && (
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetContent
            side="left"
            className="w-full sm:hidden border-0  bg-[#0A1A2F] text-white"
          >
            <div className="flex flex-col h-full">
              <div className="pb-[24px]">
                <Link to="/dashboard" className="flex items-center gap-2">
                  <Logo />
                </Link>
              </div>
              <div className="flex flex-col items-center gap-10">
                {items.map((item) => {
                  const isActive = isRouteActive(item, pathname);
                  return (
                    <Link
                      key={item.url}
                      to={item.url}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "inline-flex items-center text-base space-y-2",
                        isActive ? "text-[#E9E9E9]" : "text-[#667281]"
                      )}
                    >
                      {isActive && (
                        <div className="mr-2 size-2 rounded-full bg-[#E9E9E9]" />
                      )}
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </header>
  );
}
