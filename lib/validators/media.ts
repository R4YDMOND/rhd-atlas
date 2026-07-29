import { z } from "zod";

export const mediaTypeSchema = z.enum(["IMAGE", "VIDEO"]);
export const mediaSourceSchema = z.enum(["UPLOAD", "VK_EMBED"]);

export const mediaCreateSchema = z.object({
  url: z.string().min(1),
  type: mediaTypeSchema,
  source: mediaSourceSchema.default("UPLOAD"),
  alt: z.string().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

export const mediaUpdateSchema = mediaCreateSchema.partial();

export type MediaCreateInput = z.infer<typeof mediaCreateSchema>;
export type MediaUpdateInput = z.infer<typeof mediaUpdateSchema>;
