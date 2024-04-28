import { z } from "zod";

const authSchema = {
  LoginSchema: z.object({
    userName: z
      .string({
        required_error: "Username is required",
        invalid_type_error: "username must be a string",
      })
      .min(2, {
        message: "Username must be at least 2 characters.",
      }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "password must be a string",
      })
      .min(4, {
        message: "Password must be at least 4 characters.",
      }),
  }),

  SignUpSchema: z.object({
    fullName: z
      .string({
        required_error: "Fullname is required",
        invalid_type_error: "fullname must be a string",
      })
      .min(2, {
        message: "Fullname must be at least 4 characters.",
      }),
    userName: z
      .string({
        required_error: "Username is required",
        invalid_type_error: "username must be a string",
      })
      .min(2, {
        message: "Username must be at least 2 characters.",
      }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "password must be a string",
      })
      .min(4, {
        message: "Password must be at least 4 characters.",
      }),
    confirmPassword: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "password must be a string",
      })
      .min(4, {
        message: "Password must be at least 4 characters.",
      }),
    gender: z.enum(["male", "female", ""]),
  }),
};

export default authSchema;
