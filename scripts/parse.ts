import fs from 'node:fs';

import { BingoContentSchema } from '../bingo';

const filepath = './anime-data.json';

const json = JSON.parse(await fs.promises.readFile(filepath, 'utf-8'));

const parsed = BingoContentSchema.safeParse(json);

if (parsed.success) {
  console.log(parsed.data);
} else {
  console.log(parsed.error);
}
