import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import {
  newsCreateSchema,
  newsUpdateSchema,
  guideCreateSchema,
  guideUpdateSchema,
  buildCreateSchema,
  buildUpdateSchema,
  toJsonBody,
  type NewsCreateInput,
  type NewsUpdateInput,
  type GuideCreateInput,
  type GuideUpdateInput,
  type BuildCreateInput,
  type BuildUpdateInput,
} from "@/lib/validators/article";

const contentInclude = {
  game: true,
  category: true,
  cover: true,
  author: true,
  tags: { include: { tag: true } },
} as const;

/**
 * В проекте пока нет системы авторизации (см. AGENTS.md/roadmap), но модель
 * контента требует authorId. До появления реальной аутентификации все
 * материалы, созданные через админку, привязываются к системному автору.
 * Как только появится auth — этот хелпер заменяется на текущего пользователя сессии.
 */
export async function getOrCreateDefaultAuthor() {
  const existing = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (existing) return existing;

  return prisma.user.create({
    data: {
      name: "RHD Atlas",
      email: "system@rhdatlas.local",
      passwordHash: "unset",
      role: "ADMIN",
    },
  });
}

// ---------- News ----------

export async function listNews() {
  return prisma.news.findMany({ include: contentInclude, orderBy: { createdAt: "desc" } });
}

export async function getNewsBySlug(slug: string) {
  return prisma.news.findUnique({ where: { slug }, include: contentInclude });
}

export async function createNews(input: NewsCreateInput) {
  const { tagIds, body, ...data } = newsCreateSchema.parse(input);
  return prisma.news.create({
    data: {
      ...data,
      body: toJsonBody(body),
      tags: { create: tagIds.map((tagId) => ({ tagId })) },
    } satisfies Prisma.NewsUncheckedCreateInput,
    include: contentInclude,
  });
}

export async function updateNews(id: string, input: NewsUpdateInput) {
  const { tagIds, body, ...data } = newsUpdateSchema.parse(input);
  return prisma.$transaction(async (tx) => {
    if (tagIds) {
      await tx.newsTag.deleteMany({ where: { newsId: id } });
    }
    return tx.news.update({
      where: { id },
      data: {
        ...data,
        ...(body ? { body: toJsonBody(body) } : {}),
        ...(tagIds ? { tags: { create: tagIds.map((tagId) => ({ tagId })) } } : {}),
      } satisfies Prisma.NewsUncheckedUpdateInput,
      include: contentInclude,
    });
  });
}

export async function deleteNews(id: string) {
  return prisma.news.delete({ where: { id } });
}

// ---------- Guides ----------

export async function listGuides() {
  return prisma.guide.findMany({ include: contentInclude, orderBy: { createdAt: "desc" } });
}

export async function getGuideBySlug(slug: string) {
  return prisma.guide.findUnique({ where: { slug }, include: contentInclude });
}

export async function createGuide(input: GuideCreateInput) {
  const { tagIds, body, ...data } = guideCreateSchema.parse(input);
  return prisma.guide.create({
    data: {
      ...data,
      body: toJsonBody(body),
      tags: { create: tagIds.map((tagId) => ({ tagId })) },
    } satisfies Prisma.GuideUncheckedCreateInput,
    include: contentInclude,
  });
}

export async function updateGuide(id: string, input: GuideUpdateInput) {
  const { tagIds, body, ...data } = guideUpdateSchema.parse(input);
  return prisma.$transaction(async (tx) => {
    if (tagIds) {
      await tx.guideTag.deleteMany({ where: { guideId: id } });
    }
    return tx.guide.update({
      where: { id },
      data: {
        ...data,
        ...(body ? { body: toJsonBody(body) } : {}),
        ...(tagIds ? { tags: { create: tagIds.map((tagId) => ({ tagId })) } } : {}),
      } satisfies Prisma.GuideUncheckedUpdateInput,
      include: contentInclude,
    });
  });
}

export async function deleteGuide(id: string) {
  return prisma.guide.delete({ where: { id } });
}

// ---------- Builds ----------

export async function listBuilds() {
  return prisma.build.findMany({ include: contentInclude, orderBy: { createdAt: "desc" } });
}

export async function getBuildBySlug(slug: string) {
  return prisma.build.findUnique({ where: { slug }, include: contentInclude });
}

export async function createBuild(input: BuildCreateInput) {
  const { tagIds, body, ...data } = buildCreateSchema.parse(input);
  return prisma.build.create({
    data: {
      ...data,
      body: toJsonBody(body),
      tags: { create: tagIds.map((tagId) => ({ tagId })) },
    } satisfies Prisma.BuildUncheckedCreateInput,
    include: contentInclude,
  });
}

export async function updateBuild(id: string, input: BuildUpdateInput) {
  const { tagIds, body, ...data } = buildUpdateSchema.parse(input);
  return prisma.$transaction(async (tx) => {
    if (tagIds) {
      await tx.buildTag.deleteMany({ where: { buildId: id } });
    }
    return tx.build.update({
      where: { id },
      data: {
        ...data,
        ...(body ? { body: toJsonBody(body) } : {}),
        ...(tagIds ? { tags: { create: tagIds.map((tagId) => ({ tagId })) } } : {}),
      } satisfies Prisma.BuildUncheckedUpdateInput,
      include: contentInclude,
    });
  });
}

export async function deleteBuild(id: string) {
  return prisma.build.delete({ where: { id } });
}
