import type { BingoContent } from '../types';

export class BingoRuntime {
  private readonly content: BingoContent;

  private readonly selected: boolean[][];

  public constructor(content: BingoContent) {
    this.content = content;
    this.selected = [];
  }

  public select(row: number, col: number) {

  }

  public getState(row: number, col: number) {}

  public getVariable() {}
}
