import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "~/features/dashboard/pages";

export const Route = createFileRoute("/(dashboard)/dashboard/")({
  loader: () => {
   
  },
  component: () => <DashboardPage />,

  errorComponent: ({ error }: { error: Error }) => (
    <div
      role="alert"
      className="flex min-h-screen items-center justify-center p-4"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Error Loading dashboard</h1>
        <pre className="mt-4">{error.message}</pre>
      </div>
    </div>
  ),
});
