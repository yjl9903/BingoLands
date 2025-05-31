export interface Bingo {
  hash: string;

  name: string;

  content: BingoContent;
}

export interface BingoContent {
  name: string;

  header: Block[];

  game: BingoGameTable;

  footer: Block[];

  meta?: Record<string, string>;
}

export type Inline =
  | string
  | {
      type: 'span' | 'a';
      attrs: {
        href?: string;
        style?: string | Record<string, string>;
      };
      content: string;
    };

export type Block = {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  attrs: {
    style?: string | Record<string, string>;
  };
  content: Inline[];
};

export type BingoGameTable = {
  type: 'bingo';

  rowCount: number;

  colCount: number;

  cells: BingoGameCell[][];
};

export type BingoGameCell = {
  type: 'content' | 'checkbox';

  rowSpan?: number;

  colSpan?: number;

  attrs?: {
    width?: number | string;

    height?: number | string;

    vertical?: 'center' | 'start' | 'end';

    horizontal?: 'center' | 'start' | 'end';
  };

  styles?: {
    default?: string | Record<string, string>;
    checked?: string | Record<string, string>;
  };

  content: Block[];
};
