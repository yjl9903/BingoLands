export interface BingoContentInit {
  name: string;

  header?: string | InlineInit | BlockInit | BlockInit[];

  game: BingoTableInit;

  footer?: string | InlineInit | BlockInit | BlockInit[];

  /**
   * Class name (:hover, [selected])? -> CSS property -> CSS value
   */
  styles?: Record<string, string | Record<string, string>>;

  /**
   * Define variables to aggerate information
   */
  variables?: Record<string, VariableDefinition>;

  /**
   * Other information
   */
  meta?: Record<string, string>;
}

export type InlineAttrs = {
  href?: string;
};

export type InlineInit = {
  type: 'span' | 'a';

  class?: string | string[];

  style?: string | Record<string, string>;

  attrs?: InlineAttrs;

  /**
   * Reference to a variable, override content if it exists
   */
  reference?: string;

  /**
   * Text content
   */
  content: string;
};

export type BlockAttrs = {};

export type BlockInit = {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  class?: string | string[];
  style?: string | Record<string, string>;
  attrs?: BlockAttrs;
  content: string | InlineInit | InlineInit[];
};

export type BingoTableInit = {
  type: 'bingo';
  class?: string | string[];
  style?: string | Record<string, string>;
  cells: BingoTableCellInit[][];
};

export type BingoTableCellAttrs = {
  width?: number | string;
  height?: number | string;
  vertical?: 'center' | 'start' | 'end';
  horizontal?: 'center' | 'start' | 'end';
};

export type BingoTableCellInit = {
  type: 'content' | 'checkbox';

  rowspan?: number;

  colspan?: number;

  class?: string | string[];

  attrs?: BingoTableCellAttrs;

  style?: string | Record<string, string>;

  data?: Record<string, CellValue>;

  content: string | InlineInit | BlockInit | BlockInit[];
};

export type VariableDefinition = {
  type: 'number';
  fixed?: number;

  /**
   * Support:
   * - sum(field:filter)
   * - avg(field:filter)
   * - count(:filter)
   * - wip: match(variable, 0=>0, [1,2]=>1, [3,4]=>5)
   */
  formula: string;
};

export type CellValue = number | string;
