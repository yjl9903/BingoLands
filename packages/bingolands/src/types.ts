export interface BingoContent {
  name: string;

  header: Block[];

  game: BingoTable;

  footer: Block[];

  /**
   * Class name (:hover, [selected])? -> CSS property -> CSS value
   */
  styles?: Record<string, Record<string, string>>;

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

export type Inline = {
  type: 'span' | 'a';

  class?: string[];

  style?: Record<string, string>;

  attrs: InlineAttrs;

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

export type Block = {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  class?: string[];
  style?: Record<string, string>;
  attrs: BlockAttrs;
  content: Inline[];
};

export type BingoTable = {
  type: 'bingo';
  class?: string[];
  style?: Record<string, string>;
  cells: BingoTableCell[][];
};

export type BingoTableCellAttrs = {
};

export type BingoTableCell = {
  type: 'content' | 'checkbox';

  rowspan?: number;

  colspan?: number;

  class?: string[];

  attrs?: BingoTableCellAttrs;

  style?: Record<string, string>;

  data?: Record<string, CellValue>;

  content: Block[];
};

export type VariableDefinition = {
  type: 'number';

  fixed?: number;

  /**
   * @default 0
   */
  default?: number;

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
