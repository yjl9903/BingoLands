import styleParse from 'style-to-object';
import { parse as yamlParse } from 'yaml';

import type { BingoContent, BingoTableCell, Block, Inline } from '../types';

import type { BingoContentInit, BlockInit, InlineInit } from './init';

import { isBlockInit } from './utils';
import { BingoContentSchema } from './zod';

type ParseResult =
  | { success: true; content: BingoContent }
  | { success: false; content?: BingoContent; error: string[] };

export function normalizeContentInit(init: BingoContentInit): ParseResult {
  const resolved: BingoContent = {
    name: init.name,
    header: [],
    game: {
      type: init.game.type,
      class: normalizeClass(init.game.class),
      style: normmalizeStyle(init.game.style),
      cells: []
    },
    footer: [],
    styles: Object.fromEntries(
      Object.entries(init.styles ?? {}).map(([k, s]) => [k, normmalizeStyle(s)])
    ),
    variables: init.variables,
    meta: init.meta
  };

  resolved.header.push(...blocks(init.header));
  resolved.footer.push(...blocks(init.footer));

  for (const row of init.game.cells) {
    const result: BingoTableCell[] = [];
    resolved.game.cells.push(result);

    for (const cell of row) {
      result.push({
        type: cell.type,
        rowspan: cell.rowspan,
        colspan: cell.colspan,
        class: normalizeClass(cell.class),
        style: normmalizeStyle(cell.style),
        attrs: { ...cell.attrs },
        data: { ...cell.data },
        content: blocks(cell.content)
      });
    }
  }

  const parsed = BingoContentSchema.safeParse(resolved);
  if (parsed.data) {
    return { success: true, content: parsed.data };
  } else {
    const messages = parsed.error.errors.map((e) => e.message + ', at ' + JSON.stringify(e.path));
    return { success: false, content: resolved, error: [...messages] };
  }

  function block(obj: BlockInit): Block {
    return {
      type: obj.type,
      class: normalizeClass(obj.class),
      style: normmalizeStyle(obj.style),
      attrs: { ...obj.attrs },
      content: inlines(obj.content)
    };
  }

  function blocks(obj?: string | InlineInit | BlockInit | BlockInit[]): Block[] {
    if (obj === undefined || obj === null) {
      return [];
    }
    if (typeof obj === 'string') {
      return [{ type: 'p', attrs: {}, content: [{ type: 'span', attrs: {}, content: obj }] }];
    }
    if (Array.isArray(obj)) {
      return obj.map(block);
    } else {
      if (isBlockInit(obj)) {
        return [block(obj)];
      } else {
        return [{ type: 'p', attrs: {}, content: [inline(obj)] }];
      }
    }
  }

  function inline(inline: InlineInit): Inline {
    return {
      type: inline.type,
      class: normalizeClass(inline.class),
      style: normmalizeStyle(inline.style),
      attrs: { ...inline.attrs },
      reference: inline.reference,
      content: inline.content
    };
  }

  function inlines(obj?: string | InlineInit | InlineInit[]): Inline[] {
    if (obj === undefined || obj === null) {
      return [];
    }
    if (typeof obj === 'string') {
      return [{ type: 'span', attrs: {}, content: obj }];
    }
    if (Array.isArray(obj)) {
      return obj.map(inline);
    } else {
      return [inline(obj)];
    }
  }

  function normalizeClass(className?: string | string[]) {
    if (className === undefined || className === null) return [];
    if (typeof className === 'string') return [className];
    if (Array.isArray(className)) return className;
    return [];
  }

  function normmalizeStyle(style?: string | Record<string, string>) {
    if (style === undefined || style === null) return {};
    if (typeof style === 'string') return styleParse(style) ?? {};
    return style;
  }
}

export function parseJsonContent(text: string): ParseResult {
  try {
    const json = JSON.parse(text);
    return normalizeContentInit(json);
  } catch (error) {
    return { success: false, error: ['JSON 格式非法'] };
  }
}

export function parseYamlContent(text: string): ParseResult {
  try {
    const json = yamlParse(text);
    return normalizeContentInit(json);
  } catch (error) {
    return { success: false, error: ['YAML 格式非法'] };
  }
}
