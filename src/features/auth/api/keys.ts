export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
} as const;

export type AuthResponseType = Exclude<
  { success: true; error: null } | { success: false; error: string },
  { error: null }
>;
