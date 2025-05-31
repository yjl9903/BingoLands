interface GenerateTableRow {
  label: string;

  items: string[];
}

function generateBingo(name: string, heading: string, table: GenerateTableRow[]) {
  const bingo = {
    name,
    header: [{ type: 'h1', content: heading }],
    game: {
      type: 'bingo',
      rowCount: table.length,
      colCount: table[0].items.length + 1,
      cells: [] as any[]
    }
  };

  for (const data of table) {
    const row: any[] = [];
    bingo.game.cells.push(row);

    row.push({
      type: 'content',
      attrs: { width: 40 },
      styles: { default: 'font-weight:bold;color:white;background:#dc2626;' },
      content: data.label
    });
    for (const sub of data.items) {
      const name = sub;
      row.push({
        type: 'checkbox',
        styles: { default: '', hover: '', checked: 'background:green;color:white;' },
        content: name
      });
    }
  }

  return bingo;
}
