import type { BingoContent } from '../types';

export class BingoRuntime {
  private readonly content: BingoContent;

  public constructor(content: BingoContent) {
    this.content = content;
  }
}
