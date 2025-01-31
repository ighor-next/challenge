import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z
    .string()
    .min(5, "A descrição deve ter pelo menos 5 caracteres"),
  status: z.string(),
});
