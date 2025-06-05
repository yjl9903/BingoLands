import { stringify as yamlStringify } from 'yaml';

import type { BingoContent } from '../types';

export function stringifyContentToYaml(content: BingoContent): string {
  return yamlStringify(content);
}
