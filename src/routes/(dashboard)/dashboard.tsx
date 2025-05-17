import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Logo } from "~/components/logo";
import { ConnectWalletButton } from "~/features/auth/components/connect-wallet";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { RouteGuard } from "~/features/auth/components/route-guard";

function DashboardLayout() {
  const currentAccount = useCurrentAccount();

  return (
    <>
      <RouteGuard>
        <main
          className="flex h-full w-full flex-col px-8 min-h-screen bg-black text-white overflow-hidden"
          role="main"
          aria-label="Main content area"
        >
          <header className="container mx-auto py-6 flex justify-between items-center z-10 relative">
            <Logo />
            {currentAccount ? (
              <div className="flex gap-4">show logged in links</div>
            ) : (
              <div className="flex gap-4">show public links</div>
            )}
            <ConnectWalletButton />
          </header>
          <Outlet />
        </main>
      </RouteGuard>
    </>
  );
}

export const Route = createFileRoute("/(dashboard)/dashboard")({
  // beforeLoad: ({ context, location }) => {
  //   if (!context.auth.user) {
  //     throw redirect({
  //       to: '/',
  //       search: {
  //         redirect: location.href,
  //       },
  //     })
  //   }
  // },
  component: DashboardLayout,
  errorComponent: ({ error }: { error: Error }) => (
    <div
      role="alert"
      className="flex min-h-screen items-center justify-center p-4"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Dashboard Error</h1>
        <pre className="mt-4">{error.message}</pre>
      </div>
    </div>
  ),
});
