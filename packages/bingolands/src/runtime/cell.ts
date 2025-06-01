import { BingoTableCell } from '../types';

export type CellStateWatcher = (state: CellState) => void;

export class CellState {
  public readonly row: number;

  public readonly col: number;

  public readonly content: BingoTableCell;

  private _callbacks = new Set<CellStateWatcher>();

  private _checked = false;

  public constructor(row: number, col: number, content: BingoTableCell) {
    this.row = row;
    this.col = col;
    this.content = content;
  }

  public get checked() {
    return this._checked;
  }

  public select() {
    if (this.content.type === 'checkbox') {
      this._checked = !this._checked;
      this.emit();
    }
  }

  private emit() {
    for (const cb of this._callbacks) {
      try {
        cb(this);
      } catch (error) {
        console.error(error);
      }
    }
  }

  public watch(callback: CellStateWatcher) {
    this._callbacks.add(callback);
    return () => {
      return this._callbacks.delete(callback);
    };
  }
}
