import { parse as yamlParse } from 'yaml';

import type { BingoContentInit } from './types';

export function normalizeContent(content: BingoContentInit) {
  return content;
}

export function parseJsonContent(text: string) {
  try {
    const json = JSON.parse(text);
    return json;
  } catch (error) {
    return undefined;
  }
}

export function parseYamlContent(text: string) {
  try {
    const json = yamlParse(text);
    return json;
  } catch (error) {
    return undefined;
  }
}
