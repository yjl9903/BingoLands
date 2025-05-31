import parse from 'style-to-object';

export function parseStyle(s: string | Record<string, string> | undefined) {
  if (!s) return {};
  if (typeof s === 'string') return parse(s) || {};
  return s;
}
