import { useQuery } from "@tanstack/react-query";

import { apiClient } from "~/lib/client";

import { authService } from "../service/auth.service";
import { authKeys } from "./keys";
import { handleError, handleResponse } from "~/utils/response";
import { AuthUser } from "~/types";

export const useAuthUser = () => {
  return useQuery({
    queryKey: authKeys.me(),
    retry: false,
    queryFn: async () => {
      try {
        const response = await apiClient("/users/me");

        const result = await handleResponse<AuthUser>(response);

        if (!result.success) {
          throw new Error(result.error);
        }
        return result.data;
      } catch (error) {
        handleError(error);
      }
    },
    enabled: authService.isAuthenticated(),
  });
};
