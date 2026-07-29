import type { getBuildBySlug } from "@/lib/services/content.service";

export type BuildWithRelations = NonNullable<Awaited<ReturnType<typeof getBuildBySlug>>>;
