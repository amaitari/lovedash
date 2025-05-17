import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export const RegisterFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().min(1, "Phone number is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().optional(),
  date_of_birth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((dob) => {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age >= 18;
    }, "You must be at least 18 years old to register"),
  gender: z.string().min(1, "Gender is required"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

export const registerSchema = z
  .object({
    user_details: z
      .object({
        ...RegisterFormSchema.shape,
      })
  })


export const verifyOTPSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  otp_code: z.string().min(6, "otp_code is required"),
});


export type VerifyOTPVariables = z.infer<typeof verifyOTPSchema>;

export type LoginVariables = z.infer<typeof loginSchema>;

export type RegisterVariables = z.infer<typeof registerSchema>;

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;
