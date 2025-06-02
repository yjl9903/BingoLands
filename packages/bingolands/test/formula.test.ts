import { describe, it, expect } from 'vitest';

import { parseFormula } from '../src/runtime/formula';

describe('formula', () => {
  it('should parse', () => {
    expect(parseFormula('sum(value:checked)', {})).toMatchInlineSnapshot(`
      {
        "args": [
          {
            "field": "value",
            "filter": {
              "filter": [Function],
              "kind": "filter",
            },
            "kind": "data",
          },
        ],
        "kind": "function",
        "operation": "sum",
      }
    `);

    expect(parseFormula('avg(value:checked)', {})).toMatchInlineSnapshot(`
      {
        "args": [
          {
            "field": "value",
            "filter": {
              "filter": [Function],
              "kind": "filter",
            },
            "kind": "data",
          },
        ],
        "kind": "function",
        "operation": "avg",
      }
    `);

    expect(parseFormula('count(:checked)', {})).toMatchInlineSnapshot(`
      {
        "args": [
          {
            "filter": [Function],
            "kind": "filter",
          },
        ],
        "kind": "function",
        "operation": "count",
      }
    `);
  });
});
