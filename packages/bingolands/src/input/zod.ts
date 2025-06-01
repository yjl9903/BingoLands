import { z } from 'zod';

const StyleSchema = z.record(z.string(), z.string()).optional();

const InlineSchema = z.object({
  type: z.enum(['span', 'a']),
  class: z.string().array().optional(),
  style: StyleSchema,
  attrs: z
    .object({
      href: z.string().optional()
    })
    .passthrough()
    .default({}),
  reference: z.string().optional(),
  content: z.string().default('')
});

const BlockSchema = z.object({
  type: z.enum(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']),
  class: z.string().array().optional(),
  style: StyleSchema,
  attrs: z.object({}).passthrough().default({}),
  content: z.array(InlineSchema)
});

const BingoCellSchema = z.object({
  type: z.enum(['content', 'checkbox']),
  rowspan: z.number().gte(0).optional(),
  colspan: z.number().gte(0).optional(),
  class: z.string().array().optional(),
  attrs: z
    .object({
      width: z.coerce.string().optional(),
      height: z.coerce.string().optional(),
      vertical: z.enum(['start', 'center', 'end']).optional(),
      horizontal: z.enum(['start', 'center', 'end']).optional()
    })
    .passthrough()
    .optional(),
  style: StyleSchema,
  data: z.record(z.string(), z.union([z.number(), z.string()])).optional(),
  content: z.array(BlockSchema)
});

const BingoTableSchema = z.object({
  type: z.enum(['bingo']),
  style: StyleSchema,
  cells: z.array(z.array(BingoCellSchema).min(1).max(100)).min(1).max(100)
});

export const BingoContentSchema = z.object({
  name: z.string(),
  header: z.array(BlockSchema),
  game: BingoTableSchema,
  footer: z.array(BlockSchema),
  styles: z.record(z.string(), z.record(z.string(), z.string())),
  variables: z.record(
    z.string(),
    z.object({
      type: z.enum(['number']),
      fixed: z.number().gt(0).optional(),
      formula: z.string()
    })
  ),
  meta: z.record(z.string(), z.string()).optional()
});
