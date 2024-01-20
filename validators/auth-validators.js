import { z } from "zod";

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "name must be at least 3 characters" })
    .max(255, { message: "name must be under 255 characters" }),

  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "invalid email address" })
    .min(3, { message: "email must be at least 3 characters" })
    .max(255, { message: "email must be under 255 characters" }),

  phone: z
    .string({ required_error: "phone number is required" })
    .trim()
    .min(10, { message: "number must be at least 10 characters" })
    .max(20, { message: "number must be at most 20 characters" }),

  password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(6, { message: "password must be at least 6 characters" })
    .max(1024, { message: "password must be under 1024 characters" }),
});

const loginSchema = z.object({
  password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(6, { message: "password must be at least 6 characters" })
    .max(1024, { message: "password must be under 1024 characters" }),

  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "invalid email address" })
    .min(3, { message: "email must be at least 3 characters" })
    .max(255, { message: "email must be under 255 characters" }),
});

const contactSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "name must be at least 3 characters" })
    .max(255, { message: "name must be under 255 characters" }),

  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "invalid email address" })
    .min(3, { message: "email must be at least 3 characters" })
    .max(255, { message: "email must be under 255 characters" }),

  phone: z
    .string({ required_error: "phone number is required" })
    .trim()
    .min(10, { message: "number must be at least 10 characters" })
    .max(20, { message: "number must be at most 20 characters" }),

  message: z
    .string({
      required_error: "message is required",
    })
    .min(3, { message: "message should be at least 3 characters" })
    .max(255, { message: "message should be less then 255 characters" }),

});


export { signupSchema, loginSchema, contactSchema };
