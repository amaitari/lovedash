import * as React from "react";
import ReactDOM from "react-dom/client";
import {
  ErrorComponent,
  RouterProvider,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { getQueryClient } from "./providers/query.provider";
import { routeTree } from "./routeTree.gen";

import "@mysten/dapp-kit/dist/index.css";
import "./index.css";
import { useAuth } from "./providers/auth.provider";

export const queryClient = getQueryClient();

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className="relative flex min-h-screen flex-1" role="main">
      <Outlet />
    </div>
  ),
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: undefined!,
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <>
      <RouterProvider
        router={router}
        defaultPreload="intent"
        context={{
          auth: useAuth(),
        }}
      />
    </>
  );
}

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
