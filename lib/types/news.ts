import type { getNewsBySlug } from "@/lib/services/content.service";

export type NewsWithRelations = NonNullable<Awaited<ReturnType<typeof getNewsBySlug>>>;
