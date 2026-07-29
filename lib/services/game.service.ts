import { prisma } from "@/lib/prisma";
import {
  gameCreateSchema,
  gameUpdateSchema,
  type GameCreateInput,
  type GameUpdateInput,
} from "@/lib/validators/game";

export class SlugConflictError extends Error {
  constructor(slug: string) {
    super(`Игра со слагом "${slug}" уже существует`);
    this.name = "SlugConflictError";
  }
}

export async function listGames() {
  return prisma.game.findMany({ orderBy: { title: "asc" } });
}

export async function getGameById(id: string) {
  return prisma.game.findUnique({ where: { id } });
}

export async function getGameBySlug(slug: string) {
  return prisma.game.findUnique({ where: { slug } });
}

export async function createGame(input: GameCreateInput) {
  const data = gameCreateSchema.parse(input);
  try {
    return await prisma.game.create({ data });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      throw new SlugConflictError(data.slug);
    }
    throw error;
  }
}

export async function updateGame(id: string, input: GameUpdateInput) {
  const data = gameUpdateSchema.parse(input);
  try {
    return await prisma.game.update({ where: { id }, data });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      throw new SlugConflictError(data.slug ?? id);
    }
    throw error;
  }
}

export async function deleteGame(id: string) {
  return prisma.game.delete({ where: { id } });
}

function isUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "P2002"
  );
}
