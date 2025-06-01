import fs from 'node:fs';

import { BingoContentSchema } from 'bingolands';

import { type SimpleTableRow, generateSimpleBingo } from './generate-simple-bingo';

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
  2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009,
  2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000
].reverse();

const rows: SimpleTableRow[] = [];

for (const year of years) {
  console.log(`Fetching ${year}`);

  const subs = await getTopSubjects(year, 10);
  const items: string[] = [];
  rows.push({ label: '' + year, items });

  for (const sub of subs) {
    const name = sub.name_cn || sub.name || '';
    const score = sub.rating.score;
    items.push(name + ' / ' + score);
  }
}

const parsed = BingoContentSchema.safeParse(
  generateSimpleBingo(
    'Bangumi 高分动画宾果',
    '自 21 世纪来的 Bangumi 高分动画, 你都看了吗?',
    rows
  )
);

if (parsed.success) {
  fs.promises.writeFile('./assets/anime-data.json', JSON.stringify(parsed.data, null, 2), 'utf-8');
} else {
  console.log(parsed.error);
}
