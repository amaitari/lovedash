import {
  useCurrentAccount,
  ConnectModal,
  useDisconnectWallet,
} from "@mysten/dapp-kit";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";

export function ConnectWalletButton() {
  const currentAccount = useCurrentAccount();
  const [open, setOpen] = useState(false);
  const { mutate: disconnectWallet } = useDisconnectWallet();



  return (
    <>
      {!currentAccount ? (
        <ConnectModal
          trigger={<Button variant="secondary">{"Connect Wallet"}</Button>}
          open={open}
          onOpenChange={(isOpen) => setOpen(isOpen)}
        />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="destructive">{"Connected"}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{currentAccount?.label}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => disconnectWallet()}>
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
