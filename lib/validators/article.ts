import { z } from "zod";

import type { Prisma } from "@/generated/prisma/client";

const contentStatusEnum = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
const difficultyEnum = z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]);
const buildStyleEnum = z.enum(["PVE", "PVP", "HYBRID"]);

/** Один блок CMS-редактора (paragraph/heading/image/... — см. lib/types/block.ts). */
const blockSchema = z.record(z.string(), z.unknown());
const bodySchema = z.array(blockSchema);

const baseContentFields = {
  title: z.string().min(1),
  slug: z.string().min(1),
  body: bodySchema,
  status: contentStatusEnum.default("DRAFT"),
  publishedAt: z.coerce.date().optional(),
  gameId: z.string().min(1),
  categoryId: z.string().min(1).optional(),
  coverId: z.string().min(1).optional(),
  authorId: z.string().min(1),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  tagIds: z.array(z.string()).default([]),
};

// ---------- News ----------

export const newsCreateSchema = z.object({
  ...baseContentFields,
  excerpt: z.string().min(1),
});

export const newsUpdateSchema = newsCreateSchema.partial();

export type NewsCreateInput = z.infer<typeof newsCreateSchema>;
export type NewsUpdateInput = z.infer<typeof newsUpdateSchema>;

// ---------- Guides ----------

export const guideCreateSchema = z.object({
  ...baseContentFields,
  excerpt: z.string().min(1),
  difficulty: difficultyEnum.default("BEGINNER"),
  version: z.string().optional(),
});

export const guideUpdateSchema = guideCreateSchema.partial();

export type GuideCreateInput = z.infer<typeof guideCreateSchema>;
export type GuideUpdateInput = z.infer<typeof guideUpdateSchema>;

// ---------- Builds ----------

export const buildCreateSchema = z.object({
  ...baseContentFields,
  description: z.string().min(1),
  weapon: z.string().min(1),
  style: buildStyleEnum,
  difficulty: difficultyEnum.default("BEGINNER"),
  role: z.string().min(1),
});

export const buildUpdateSchema = buildCreateSchema.partial();

export type BuildCreateInput = z.infer<typeof buildCreateSchema>;
export type BuildUpdateInput = z.infer<typeof buildUpdateSchema>;

// ---------- Shared helpers ----------

/**
 * Блоки редактора парсятся Zod-ом как unknown[] — Prisma ждёт Json конкретно
 * типа InputJsonValue. Структурно это одно и то же (сериализуемый JSON),
 * поэтому явно приводим тип на границе сервисного слоя.
 */
export function toJsonBody(body: Record<string, unknown>[]): Prisma.InputJsonValue {
  return body as unknown as Prisma.InputJsonValue;
}
