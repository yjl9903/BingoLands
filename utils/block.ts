import type { BingoContent } from "bingolands";

export function blocksToString(content: BingoContent) {
  const lines: string[] = [];
  for (const block of content.header) {
    lines.push(block.content.map(b => b.content).join(''))
  }
  return lines.join('');
}