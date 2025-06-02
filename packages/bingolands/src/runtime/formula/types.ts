import type { CellState } from '../cell';

export type Formula = Function | Variable | Data | Filter | Literal;

export type Function = {
  kind: 'function';
  operation: 'sum' | 'avg' | 'count';
  args: Formula[];
};

export type Variable = {
  kind: 'variable';
  reference: string;
};

export type Data = {
  kind: 'data';
  field: string;
  filter: Filter;
};

export type Filter = {
  kind: 'filter';
  filter: (state: CellState) => boolean;
};

export type Literal =
  | {
      kind: 'literal';
      type: 'number';
      value: number;
    }
  | {
      kind: 'literal';
      type: 'string';
      value: string;
    };
