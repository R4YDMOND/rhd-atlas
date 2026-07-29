import type { getGuideBySlug } from "@/lib/services/content.service";

export type GuideWithRelations = NonNullable<Awaited<ReturnType<typeof getGuideBySlug>>>;
