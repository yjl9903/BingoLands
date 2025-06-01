import type { BingoContent } from '../types';

import { type CellStateWatcher, CellState } from './cell';
import { type VariableStateWatcher, VariableState } from './variable';

export class BingoRuntime {
  private readonly content: BingoContent;

  private readonly state: CellState[];

  private readonly grid: CellState[][];

  private readonly variables: Map<string, VariableState<any>>;

  public constructor(content: BingoContent) {
    this.content = content;

    const all: CellState[] = [];
    const out: CellState[][] = [];
    for (let r = 0; r < content.game.cells.length; r++) {
      const srcRow = content.game.cells[r];

      // 确保当前输出行存在
      if (!out[r]) out[r] = [];

      let cCursor = 0; // 指向当前行中下一个可写列
      for (const cell of srcRow) {
        // 跳过已被上方单元格占用的位置
        while (out[r][cCursor] !== undefined) cCursor++;

        const rs = cell.rowspan ?? 1;
        const cs = cell.colspan ?? 1;
        const state = new CellState(r, cCursor, cell);
        all.push(state);

        // 把当前单元格写入其覆盖的所有坐标
        for (let dr = 0; dr < rs; dr++) {
          for (let dc = 0; dc < cs; dc++) {
            const rr = r + dr;
            const cc = cCursor + dc;
            if (!out[rr]) out[rr] = [];
            out[rr][cc] = state; // 同一个对象或可深拷贝，按需求决定
          }
        }

        cCursor += cs; // 光标后移
      }
    }
    this.state = all;
    this.grid = out;

    this.variables = new Map(
      Object.entries(content.variables ?? {}).map(([k, v]) => [k, new VariableState(k, v)])
    );
  }

  public select(row: number, col: number) {
    const state = this.grid[row]?.[col];
    if (!state) return;
    state.select();
    for (const variable of this.variables.values()) {
      variable.update(this.state);
    }
  }

  public getState(row: number, col: number): CellState | undefined {
    return this.grid[row]?.[col];
  }

  public watchState(row: number, col: number, callback: CellStateWatcher) {
    return this.getState(row, col)?.watch(callback);
  }

  public getVariable<T extends number | string>(name: string): VariableState<T> | undefined {
    return this.variables.get(name);
  }

  public watchVariable<T extends number | string>(
    variable: string,
    callback: VariableStateWatcher<T>
  ) {
    return this.getVariable(variable)?.watch(callback);
  }
}
