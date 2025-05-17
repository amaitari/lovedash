import { ErrorResponse, SuccessResponse } from "./response";

export enum AuthState {
  IDLE = "idle",
  AUTHENTICATING = "authenticating",
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
  LOGOUT = "logout",
}

export interface LoginInput {
  email: string;
}

export interface VerifyOTPInput {
  email: string;
  otpCode: string;
}

export type AuthResponse = SuccessResponse | ErrorResponse;

export type RegisterResponse = SuccessResponse<Response> | ErrorResponse;

export type LoginResponse = SuccessResponse<Response> | ErrorResponse;

export type WalletAccount = {
  address: string
  publicKey: Uint8Array
  chains: string[]
  features: string[]
  label: string
  icon: string
}
