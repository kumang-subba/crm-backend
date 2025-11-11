import { z } from "zod";

export const registerValidator = z.object({
  username: z.string("Name is required").trim().min(3, "Name must be at least 3 characters"),
  password: z.string("Password is required").min(4, "Password must be at least 4 characters"),
});

export const loginValidator = z.object({
  username: z.string("Name is required").trim().min(3, "Name must be at least 3 characters"),
  password: z.string("Password is required").min(4, "Password must be at least 4 characters"),
});
