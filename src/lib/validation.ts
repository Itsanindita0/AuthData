import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),

  email: z.string().email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  orgDetails: z.object({
    name: z.string().min(2, "Organization name required"),
    legalName: z.string().min(2, "Legal name required"),
    contactInfo: z.object({
      email: z.string().email("Invalid organization email"),
      phone: z.string().min(10, "Phone must be at least 10 digits"),
    }),
  }),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});