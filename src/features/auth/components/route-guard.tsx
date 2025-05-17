import { Navigate, useLocation } from "@tanstack/react-router";

import { useAuth } from "~/providers/auth.provider";
import { AuthState } from "~/types/auth";

interface RouteGuardProps {
  children: React.ReactNode;
}

export const RouteGuard = ({ children }: RouteGuardProps) => {
  const { authState } = useAuth();
  const location = useLocation();

  if (authState === AuthState.UNAUTHENTICATED) {
    return (
      <Navigate
        to="/"
        search={{
          redirect: location.pathname,
        }}
        aria-label="Redirecting to home page"
      />
    );
  }

  return (
    <div className="relative flex flex-1" role="main">
      {children}
    </div>
  );
};
