import type { VariableDefinition } from '../../types';

import type { CellState } from '../cell';

import type { Filter, Formula, Literal } from './types';

const FuncOperations = new Set(['sum', 'avg', 'count']);

export function parseFormula(text: string, defs: Record<string, VariableDefinition>) {
  const VariableSet = new Set(Object.keys(defs));

  let cursor = 0;

  return parseRoot();

  function skipWhiteSpaces() {
    while (cursor < text.length && /\s/.test(text[cursor])) {
      cursor += 1;
    }
  }

  function parseRoot(): Formula {
    skipWhiteSpaces();

    // 1. Try number or string literals
    if (text[cursor] === '"' || text[cursor] === "'") {
      return parseStringLiteral();
    } else if (/\d/.test(text[cursor])) {
      return parseNumberLiteral();
    }

    // 2. Try parsing filters
    if (text[cursor] === ':') {
      return parseFilter();
    }

    // 3. Try parsing next word
    const word = parseWord();

    if (FuncOperations.has(word)) {
      skipWhiteSpaces();

      if (text[cursor] === '(') {
        cursor += 1;
      } else {
        throw new Error(`Expect: '('`);
      }

      skipWhiteSpaces();

      const args: Formula[] = [];

      while (cursor < text.length && !/,\)/.test(text[cursor])) {
        args.push(parseRoot());
        skipWhiteSpaces();
        if (text[cursor] === ',') {
          cursor += 1;
          skipWhiteSpaces();
        } else if (text[cursor] === ')') {
          cursor += 1;
          break;
        }
      }

      return { kind: 'function', operation: word as any, args };
    } else if (VariableSet.has(word)) {
      return { kind: 'variable', reference: word };
    } else {
      return { kind: 'data', field: word, filter: parseFilter() };
    }
  }

  function parseStringLiteral(): Literal {
    const start = text[cursor];
    cursor += 1;
    let literal = '';
    while (cursor < text.length && text[cursor] !== start) {
      if (text[cursor] === '\\') {
        literal += text[++cursor];
      } else {
        literal += text[cursor];
      }
      cursor += 1;
    }
    return { kind: 'literal', type: 'string', value: literal };
  }

  function parseNumberLiteral(): Literal {
    return { kind: 'literal', type: 'number', value: 0 };
  }

  function parseFilter(): Filter {
    const conditions: Array<(state: CellState) => boolean> = [];

    while (text[cursor] === ':') {
      cursor += 1;
      const word = parseWord();
      if (word === 'checked') {
        conditions.push((state) => state.checked);
      }
    }

    return {
      kind: 'filter',
      filter: (state) => conditions.every((f) => f(state))
    };
  }

  function parseWord() {
    let start = cursor;
    while (cursor < text.length && !/[\s\(\)\+\-\*/,:]/.test(text[cursor])) {
      cursor += 1;
    }
    const word = text.slice(start, cursor);
    return word;
  }
}
