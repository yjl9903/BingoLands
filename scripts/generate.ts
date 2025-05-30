import fs from 'node:fs';

import { BingoContentSchema } from '../bingo';

async function getTopSubjects(year: number, kth: number) {
  const params = new URLSearchParams();
  params.set('type', '2');
  params.set('cat', '1');
  params.set('sort', 'rank');
  params.set('year', '' + year);

  const resp = await fetch('https://api.bgm.tv/v0/subjects?' + params.toString(), {
    method: 'GET',
    headers: {
      'user-agent': 'bgmc/0.0.11 (https://github.com/yjl9903/bgmc)'
    }
  });
  const data: any = await resp.json();
  return data.data.slice(0, kth);
}

const years = [
  2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010
];

const bingo = {
  name: '近 15 年 Bangumi 评分前 10 名',
  header: [{ type: 'p', content: '选取近 15 年每年 Bangumi 评分前 10 名的动画, 你都看了吗?' }],
  game: {
    type: 'bingo',
    rowCount: years.length,
    colCount: 10 + 1,
    cells: [] as any[]
  }
};

for (const year of years) {
  console.log(`Fetching ${year}`);
  const subs = await getTopSubjects(year, 10);
  const row: any[] = [];
  bingo.game.cells.push(row);

  row.push({ type: 'content', content: '' + year });
  for (const sub of subs) {
    const name = sub.name_cn || sub.name || '';
    row.push({
      type: 'checkbox',
      styles: { default: '', checked: 'background:green;' },
      content: name
    });
  }
}

const parsed = BingoContentSchema.safeParse(bingo);

if (parsed.success) {
  fs.promises.writeFile('anime-data.json', JSON.stringify(parsed.data, null, 2), 'utf-8');
} else {
  console.log(parsed.error);
}
