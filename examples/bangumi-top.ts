import fs from 'node:fs';
import { stringify } from 'yaml';

import { BgmClient } from 'bgmc';

import { type SimpleTableRow, generateSimpleBingo } from './generate-bingo';

const visited = new Set<number>();

const bgmc = new BgmClient(fetch);

async function getTopSubjects(year: number, kth: number) {
  const subs = await bgmc.subjects({ type: 2, cat: 1 as any, year, sort: 'rank' });
  const result: (typeof subs)['data'] = [];
  for (const bgm of subs?.data ?? []) {
    if (result.length === kth) break;

    // 跳过美国动画
    if (bgm.tags.some((tag) => tag.name === '美国')) continue;

    // 只包含 TV
    if (bgm.tags.some((tag) => ['剧场版', '总集篇'].includes(tag.name))) continue;

    // 同系列作品只保留一个
    const related = await getPreSubjects(bgm);
    if (related.some((r) => visited.has(r.id))) {
      related.forEach((r) => visited.add(r.id));
      continue;
    }

    related.forEach((r) => visited.add(r.id));

    visited.add(bgm.id);
    result.push(bgm);
  }
  return result;

  async function getPreSubjects(bgm: any) {
    const PreRelations = ['前传', '续集', '主线故事', '不同演绎'];
    const all = new Map<number, Awaited<ReturnType<BgmClient['subjectRelated']>>[0]>();
    const tasks: number[] = [bgm.id];
    for (let i = 0; i < tasks.length; i++) {
      const related = await bgmc.subjectRelated(tasks[i]);
      const pres = related.filter((r) => PreRelations.includes(r.relation));
      for (const bgm of pres) {
        if (!all.has(bgm.id)) {
          all.set(bgm.id, bgm);
          tasks.push(bgm.id);
        }
      }
    }
    return [...all.values()];
  }
}

// prettier-ignore
const years = [
  2024, 2023, 2022, 2021, 2020,
  2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010,
  // 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000
].reverse();

const rows: SimpleTableRow[] = [];

for (const year of years) {
  console.log(`Fetching ${year}`);

  const subs = await getTopSubjects(year, 10);
  const items: Array<{ text: string; value: number }> = [];
  rows.push({ label: '' + year, items });

  for (const sub of subs) {
    const name = sub.name_cn || sub.name || '';
    const score = sub.rating.score;
    items.push({ text: name + ' / ' + score.toFixed(1), value: score });
  }
}

const generated = generateSimpleBingo(
  'Bangumi 高分 TV 动画宾果',
  [{ type: 'span', content: '近年来的 Bangumi 高分 TV 动画, 你都看了吗?' }],
  [
    [
      { type: 'span', style: 'font-weight:bold;', content: '你看过其中 ' },
      { type: 'span', style: 'font-weight:bold;', reference: 'count', content: '' },
      { type: 'span', style: 'font-weight:bold;', content: ' 部动画, 平均评分是 ' },
      { type: 'span', style: 'font-weight:bold;', reference: 'avg', content: '' },
      { type: 'span', style: 'font-weight:bold;', content: ' 分, 你真是个动漫高手!' }
    ],
    [
      {
        type: 'span',
        content: '数据来源于 bangumi, 筛选来自日本的 TV 动画, 同系列作品只保留 1 个.'
      }
    ]
  ],
  rows
);

await fs.promises.writeFile('./assets/anime-data.yaml', stringify(generated.raw, null, 2), 'utf-8');
await fs.promises.writeFile(
  './assets/anime-data.json',
  JSON.stringify(
    { hash: 'd47d603ea34d51c45165a7ce00d84749e1b7c492', content: generated.parsed },
    null,
    2
  ),
  'utf-8'
);
