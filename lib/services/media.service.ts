import { prisma } from "@/lib/prisma";
import {
  mediaCreateSchema,
  mediaUpdateSchema,
  type MediaCreateInput,
  type MediaUpdateInput,
} from "@/lib/validators/media";

// Сервис хранит только метаданные Media (url/type/source/alt/размеры).
// Сама загрузка файла в хранилище (S3/Supabase Storage) не реализована —
// url должен быть получен от отдельного upload-механизма до вызова createMedia.

export async function listMedia() {
  return prisma.media.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getMediaById(id: string) {
  return prisma.media.findUnique({ where: { id } });
}

export async function createMedia(input: MediaCreateInput) {
  const data = mediaCreateSchema.parse(input);
  return prisma.media.create({ data });
}

export async function updateMedia(id: string, input: MediaUpdateInput) {
  const data = mediaUpdateSchema.parse(input);
  return prisma.media.update({ where: { id }, data });
}

export async function deleteMedia(id: string) {
  return prisma.media.delete({ where: { id } });
}
