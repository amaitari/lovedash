import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { apiClient } from "~/lib/client";
import {
  LoginInput,
  LoginResponse,
  RegisterResponse,
} from "~/types/auth";

import { handleError, handleResponse } from "~/utils/response";
import { RegisterVariables } from "../schemas/auth.schema";
import { authService } from "../service/auth.service";
import { Response } from "~/types";


export const useRegisterMutation = () => {
  return useMutation<RegisterResponse, unknown, RegisterVariables>({
    mutationFn: async (variables: RegisterVariables) => {
      try {
        const response = await apiClient("/auth/register", {
          method: "POST",
          body: JSON.stringify(variables),
        });

        return await handleResponse(response);
      } catch (error) {
        return handleError(error);
      }
    },
  });
};

export const useLoginMutation = () => {
  return useMutation<LoginResponse, unknown, LoginInput>({
    mutationFn: async (variables: LoginInput) => {
      try {
        const response = await apiClient("/auth/login", {
          method: "POST",
          body: JSON.stringify(variables),
        });

        return await handleResponse(response);
      } catch (error) {
        return handleError(error, "Login");
      }
    },
  });
};


export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      // await apiClient("/logout", { method: "POST" });
      await authService.logout();
    },
    onSuccess: () => {
      queryClient.clear();
      navigate({ to: "/", search: { redirect: "/dashboard" } });
      toast.success("Successfully logged out!");
    },
  });
};

export const useDeleteUserAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      // await apiClient("/logout", { method: "POST" });
      try{

       const response =  await apiClient("/users", {
          method: "DELETE",   
      })

      return await handleResponse<Response>(response);
      } catch (error) {
        return handleError(error, "Deleting account unsuccessful");
      }

    },
    onSuccess: () => {
      queryClient.clear();
      navigate({ to: "/", search: { redirect: "/dashboard" } });
      toast.success("Account Succesfully Deleted!");
    },
  });
};
