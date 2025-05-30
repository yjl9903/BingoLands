import { z } from 'zod';

const StyleSchema = z
  .union([z.string(), z.record(z.string(), z.string()), z.undefined()])
  .optional();

const InlineSchema = z.object({
  type: z.enum(['span', 'a']),
  attrs: z
    .object({
      href: z.string().optional(),
      style: StyleSchema
    })
    .passthrough()
    .default({}),
  content: z.string().default('')
});

const BlockSchema = z.object({
  type: z.enum(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']),
  attrs: z
    .object({
      style: StyleSchema
    })
    .passthrough()
    .default({}),
  content: z.union([
    z.null().transform(() => []),
    z.undefined().transform(() => []),
    z.string().transform((t) => [{ type: 'span', attrs: {}, content: t }]),
    z.array(
      z.union([
        z.string().transform((t) => ({ type: 'span', attrs: {}, content: t })),
        InlineSchema
      ])
    ),
    InlineSchema.transform((t) => [t])
  ])
});

const ManyBlocksSchema = z.union([
  z.null().transform(() => []),
  z.undefined().transform(() => []),
  z.string().transform((t) => [{ type: 'p', attrs: {}, content: [t] }]),
  z.array(
    z.union([z.string().transform((t) => [{ type: 'span', attrs: {}, content: [t] }]), BlockSchema])
  ),
  BlockSchema.transform((t) => [t])
]);

const GameCellSchema = z.object({
  type: z.enum(['content', 'checkbox']),
  rowSpan: z.number().gte(0).optional(),
  colSpan: z.number().gte(0).optional(),
  styles: z
    .object({
      default: StyleSchema,
      checked: StyleSchema
    })
    .passthrough()
    .default({}),
  content: ManyBlocksSchema
});

const GameTableSchema = z.object({
  type: z.enum(['bingo']),
  rowCount: z.number().gt(0).lte(100),
  colCount: z.number().gt(0).lte(100),
  cells: z.array(z.array(GameCellSchema).min(1).max(100)).min(1).max(100)
});

export const BingoContentSchema = z.object({
  name: z.string(),
  header: ManyBlocksSchema,
  game: GameTableSchema,
  footer: ManyBlocksSchema,
  meta: z.record(z.string(), z.string()).optional()
});
