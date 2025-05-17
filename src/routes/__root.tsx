import { getQueryClient, QueryProviders } from "~/providers/query.provider";
import { Toaster } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import { NotFound } from "~/components/not-found";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { networkConfig } from "~/lib/network-config";
import { AuthContextType } from "~/providers/auth.provider";

interface RouterContext {
  auth: AuthContextType;
  queryClient: ReturnType<typeof getQueryClient>;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  errorComponent: ({ error }: { error: Error }) => (
    <div role="alert" className="p-4">
      <h1>Error</h1>
      <pre>{error.message}</pre>
    </div>
  ),
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <main
      className="flex min-h-screen flex-col w-full"
      role="main"
      aria-label="Main application layout"
    >
      <QueryProviders>
        <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
          <WalletProvider autoConnect>
            <TooltipProvider delayDuration={200}>
              <Outlet />
              <Toaster position="bottom-right" />
            </TooltipProvider>
          </WalletProvider>
        </SuiClientProvider>
      </QueryProviders>
    </main>
  );
}
