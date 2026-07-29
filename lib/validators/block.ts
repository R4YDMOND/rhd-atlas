import { z } from 'zod';

export const blockBaseSchema = z.object({
  id: z.string().uuid(),
  order: z.number().int().min(0),
});

export const textBlockSchema = blockBaseSchema.extend({
  type: z.literal('text'),
  data: z.object({
    content: z.string().min(1),
    alignment: z.enum(['left', 'center', 'right']).default('left'),
  }),
});

export const headingBlockSchema = blockBaseSchema.extend({
  type: z.literal('heading'),
  data: z.object({
    content: z.string().min(1),
    level: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  }),
});

export const imageBlockSchema = blockBaseSchema.extend({
  type: z.literal('image'),
  data: z.object({
    src: z.string().url(),
    alt: z.string().min(1),
    caption: z.string().optional(),
    width: z.enum(['small', 'medium', 'large', 'full']).default('full'),
  }),
});

export const videoBlockSchema = blockBaseSchema.extend({
  type: z.literal('video'),
  data: z.object({
    provider: z.enum(['vk', 'youtube']),
    videoId: z.string().min(1),
    caption: z.string().optional(),
  }),
});

export const quoteBlockSchema = blockBaseSchema.extend({
  type: z.literal('quote'),
  data: z.object({
    content: z.string().min(1),
    author: z.string().optional(),
    source: z.string().optional(),
  }),
});

export const listBlockSchema = blockBaseSchema.extend({
  type: z.literal('list'),
  data: z.object({
    items: z.array(z.string().min(1)).min(1),
    ordered: z.boolean().default(false),
  }),
});

export const tableBlockSchema = blockBaseSchema.extend({
  type: z.literal('table'),
  data: z.object({
    headers: z.array(z.string().min(1)).min(1),
    rows: z.array(z.array(z.string())).min(0),
    caption: z.string().optional(),
  }),
});

export const calculatorBlockSchema = blockBaseSchema.extend({
  type: z.literal('calculator'),
  data: z.object({
    game: z.enum(['wwm', 'once-human']),
    configId: z.string().min(1),
    title: z.string().optional(),
  }),
});

export const mapBlockSchema = blockBaseSchema.extend({
  type: z.literal('map'),
  data: z.object({
    game: z.enum(['wwm', 'once-human']),
    title: z.string().optional(),
    showFilters: z.boolean().default(true),
  }),
});

export const dividerBlockSchema = blockBaseSchema.extend({
  type: z.literal('divider'),
  data: z.object({}).strict(),
});

export const blockSchema = z.discriminatedUnion('type', [
  textBlockSchema,
  headingBlockSchema,
  imageBlockSchema,
  videoBlockSchema,
  quoteBlockSchema,
  listBlockSchema,
  tableBlockSchema,
  calculatorBlockSchema,
  mapBlockSchema,
  dividerBlockSchema,
]);

export const blockContentSchema = z.object({
  blocks: z.array(blockSchema),
});