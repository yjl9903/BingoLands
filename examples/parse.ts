import fs from 'node:fs';
import { stringify } from 'yaml';

import { BingoContentSchema } from 'bingolands';

const filepath = './assets/anime-data.json';

const json = JSON.parse(await fs.promises.readFile(filepath, 'utf-8'));

await fs.promises.writeFile('./assets/anime-data.yml', stringify(json), 'utf-8');

const parsed = BingoContentSchema.safeParse(json);

if (parsed.success) {
  console.log(parsed.data);
} else {
  console.log(parsed.error);
}
