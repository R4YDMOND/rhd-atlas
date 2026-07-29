import { z } from "zod";

export const gameStatusSchema = z.enum(["ACTIVE", "BETA", "COMING_SOON"]);

export const gameCreateSchema = z.object({
  title: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Слаг может содержать только строчные латинские буквы, цифры и дефисы"),
  version: z.string().optional(),
  status: gameStatusSchema.default("COMING_SOON"),
  image: z.string().optional(),
  hasCalculator: z.boolean().default(false),
  hasMap: z.boolean().default(false),
  hasPlayerStats: z.boolean().default(false),
});

export const gameUpdateSchema = gameCreateSchema.partial();

export type GameCreateInput = z.infer<typeof gameCreateSchema>;
export type GameUpdateInput = z.infer<typeof gameUpdateSchema>;
