import type { BlockInit, InlineInit } from './init';

const BlockTypes = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']);

export function isBlockInit(input: BlockInit | InlineInit): input is BlockInit {
  return BlockTypes.has(input.type);
}

export function isInlineInit(input: BlockInit | InlineInit): input is InlineInit {
  return !isBlockInit(input);
}
