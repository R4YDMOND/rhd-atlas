export type { ContentStatus, Difficulty } from "../../generated/prisma/client";

import type { NewsWithRelations } from "./news";
import type { GuideWithRelations } from "./guide";
import type { BuildWithRelations } from "./build";

/** Тип контента, которым управляет единый /admin/content. */
export type ArticleKind = "news" | "guides" | "builds";

/** Общая форма записи контента (News | Guide | Build) для списка и редактора. */
export type Article = NewsWithRelations | GuideWithRelations | BuildWithRelations;
