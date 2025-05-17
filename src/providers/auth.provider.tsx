import { useCurrentAccount, useCurrentWallet, useDisconnectWallet } from "@mysten/dapp-kit";
import { createContext, useContext, useEffect, useState } from "react";

import { AuthState } from "~/types/auth";


export interface AuthContextType {
  account: ReturnType<typeof useCurrentAccount> | undefined;
  wallet: ReturnType<typeof useCurrentWallet> | null;
  authState: AuthState;
  setAuthState: (state: AuthState) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  account: null,
  wallet: {
    connectionStatus: "connecting",
    currentWallet: null,
    isDisconnected: false,
    isConnecting: true,
    isConnected: false,
    supportedIntents: [],
  },
  authState: AuthState.IDLE,
  setAuthState: () => console.warn("AuthContext not initialized"),
  logout: () => console.warn("AuthContext not initialized"),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.IDLE);
  const logoutMutation = useDisconnectWallet();
  const account = useCurrentAccount();
  const currentWallet = useCurrentWallet();

  const { connectionStatus } = currentWallet

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setAuthState(AuthState.UNAUTHENTICATED);
    }
  };



  useEffect(() => {
    if (connectionStatus === "connecting") return;

    const newAuthState = account && connectionStatus !== "disconnected" ? AuthState.AUTHENTICATED : AuthState.UNAUTHENTICATED;

    setAuthState(newAuthState);

    if (connectionStatus === "disconnected") {
      handleLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, connectionStatus]);

  const contextValue = {
    account: account ?? undefined,
    wallet: currentWallet ?? null,
    authState: connectionStatus === "connecting" ? AuthState.AUTHENTICATING : authState,
    setAuthState,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
