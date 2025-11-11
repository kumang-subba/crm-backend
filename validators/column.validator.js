import { z } from "zod";

export const columnValidator = z.object({
  name: z.string("Name is required").trim().min(3, "Group name must be at least 3 characters"),
  description: z.string("Description is required").trim().min(1, "Description cannot be empty"),
});
