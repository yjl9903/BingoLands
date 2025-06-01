export function arrayOf<T>(len: number): T[] {
  return new Array(len).fill(undefined);
}

export function arrayOf2D<T>(row: number, col: number): T[][] {
  return new Array(row).fill(undefined).map(() => arrayOf(col));
}
