import { createFileRoute, Outlet } from "@tanstack/react-router";

import { ConnectWalletButton } from "~/features/auth/components/connect-wallet";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Logo } from "~/components/logo";

function PublicLayout() {
  const currentAccount = useCurrentAccount();
  return (
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
      <footer className="container mx-auto py-6 flex justify-between items-center z-10 relative">
        <p>Footer</p>
      </footer>
    </main>
  );
}

export const Route = createFileRoute("/(public)/_public")({
  component: PublicLayout,
  errorComponent: ({ error }) => (
    <div role="alert" className="p-4">
      <h1>Error</h1>
      <pre>{error.message}</pre>
    </div>
  ),
});
