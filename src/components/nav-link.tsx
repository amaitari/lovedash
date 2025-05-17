import { cn } from "~/lib/utils";
import { Link, useMatchRoute } from "@tanstack/react-router";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const NavLink = ({ to, children, className }: NavLinkProps) => {
  const matchRoute = useMatchRoute();
  const isActive = matchRoute({ to });

  const baseStyles = "relative text-sm font-medium transition-all duration-200";
  const activeStyles =
    "text-neutral-950 after:absolute after:left-0 after:w-full after:bg-gradient-to-r " +
    "after:from-neutral-950 after:to-neutral-950 after:content-[''] md:after:bottom-[-1.5rem] md:after:h-[2px]";
  const inactiveStyles =
    "text-neutral-600 hover:text-neutral-900 hover:after:absolute hover:after:w-full " +
    "hover:after:bg-neutral-200 hover:after:content-[''] md:hover:after:bottom-[-1.5rem] " +
    "md:hover:after:left-0 md:hover:after:h-[2px]";

  return (
    <Link
      to={to}
      className={cn(
        baseStyles,
        isActive ? activeStyles : inactiveStyles,
        className
      )}
      role="link"
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
};
