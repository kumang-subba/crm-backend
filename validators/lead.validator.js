import { z } from "zod";

export const createLeadValidator = z.object({
  name: z.string("Name is required").trim().min(3, "Lead name must be at least 3 characters"),
  order: z.number("Order required"),
});

export const updateLeadValidator = z.object({
  name: z.string("Name is required").trim().min(3, "Lead name must be at least 3 characters"),
});

export const moveLeadValidator = z.object({
  targetColumnId: z.string("Target column id required"),
  targetOrder: z.number("Order required"),
});
