import {
  type BingoContentInit,
  type InlineInit,
  normalizeContentInit
} from '../packages/bingolands/src/index';

export interface SimpleTableRow {
  label: string;

  items: Array<{ text: string; value: number }>;
}

export function generateSimpleBingo(
  name: string,
  heading: InlineInit[],
  footer: InlineInit[][],
  table: SimpleTableRow[]
) {
  const col = table[0].items.length;

  const bingo: BingoContentInit = {
    name,
    header: [
      {
        type: 'h1',
        content: heading
      }
    ],
    game: {
      type: 'bingo',
      cells: []
    },
    footer: footer.map((footer) => ({ type: 'p' as const, content: footer })),
    variables: {
      sum: {
        type: 'number',
        formula: 'sum(value:checked)'
      },
      avg: {
        type: 'number',
        fixed: 2,
        formula: 'avg(value:checked)'
      },
      count: {
        type: 'number',
        formula: 'count(:checked)'
      }
    },
    styles: {
      content: 'font-weight:bold;color:white;background:#dc2626;',
      'checkbox': `width:calc(100%/${col});min-width:100px;`,
      'checkbox:hover': 'background:oklch(0.967 0.001 286.375);',
      'checkbox[checked]': 'background:green;color:white;'
    }
  };

  for (const data of table) {
    const row: any[] = [];
    bingo.game.cells.push(row);

    row.push({
      type: 'content',
      class: 'content',
      attrs: { width: 40 },
      content: data.label
    });
    for (const sub of data.items) {
      row.push({
        type: 'checkbox',
        class: 'checkbox',
        content: sub.text,
        data: { value: sub.value }
      });
    }
  }

  const parsed = normalizeContentInit(bingo);
  if (parsed.success) {
    return { raw: bingo, parsed: parsed.content };
  } else {
    console.log(parsed.error);
    throw new Error('创建失败');
  }
}
