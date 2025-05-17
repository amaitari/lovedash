import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "~/features/public/pages/index";

export const Route = createFileRoute("/(public)/_public/")({
  component: () => <HomePage />,
  errorComponent: ({ error }) => (
    <div
      role="alert"
      className="flex min-h-screen items-center justify-center p-4"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Error Loading Landing Page</h1>
        <pre className="mt-4">{error.message}</pre>
      </div>
    </div>
  ),
});
