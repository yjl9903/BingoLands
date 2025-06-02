import type { CellValue, VariableDefinition } from '../../types';
import type { BingoRuntime } from '..';
import type { CellState } from '../cell';

import type { Formula, Variable } from './types';

export type EvaluateResult<T = CellValue> =
  | { success: true; value: T }
  | { success: false; errors: string[] };

export function evaluateFormula<T extends CellValue>(
  def: VariableDefinition,
  formula: Formula,
  runtime: BingoRuntime
): EvaluateResult<T> {
  switch (formula.kind) {
    case 'function': {
      const data = evaludateData(def, formula.args[0], runtime);
      if (data.success) {
        switch (formula.operation) {
          case 'sum': {
            const sum = (data.value as number[]).reduce((acc, cur) => acc + cur, 0);
            return { success: true, value: normalizeDataType(def, sum) as T };
          }
          case 'avg': {
            if (data.value.length === 0) {
              // 除 0 设置为 0
              return { success: true, value: normalizeDataType(def, 0) as T };
            } else {
              const count = data.value.length;
              const sum = (data.value as number[]).reduce((acc, cur) => acc + cur, 0);
              return { success: true, value: normalizeDataType(def, sum / count) as T };
            }
          }
          case 'count': {
            return { success: true, value: normalizeDataType(def, data.value.length) as T };
          }
          default: {
            return { success: false, errors: [`不支持公式 ${formula.operation}`] };
          }
        }
      } else {
        return data;
      }
    }
    case 'variable': {
      return evaludateVariable(def, formula, runtime);
    }
    case 'data': {
      return {
        success: false,
        errors: ['根节点不能为 Bingo 数据']
      };
    }
    case 'filter': {
      return {
        success: false,
        errors: ['根节点不能为筛选器']
      };
    }
    case 'literal': {
      return {
        success: true,
        value: formula.value as T
      };
    }
  }
}

function evaludateVariable<T extends CellValue>(
  def: VariableDefinition,
  formula: Variable,
  runtime: BingoRuntime
): EvaluateResult<T> {
  const variable = runtime.getVariable(formula.reference);
  if (variable) {
    return variable.value as EvaluateResult<T>;
  } else {
    return {
      success: false,
      errors: [`未知变量 ${formula.reference}`]
    };
  }
}

function evaludateData(
  def: VariableDefinition,
  formula: Formula,
  runtime: BingoRuntime
): EvaluateResult<CellValue[] | CellState[]> {
  switch (formula.kind) {
    case 'data': {
      const result: CellValue[] = [];
      for (const cell of runtime.getStates()) {
        if (formula.filter.filter(cell)) {
          const data = normalizeDataType(def, cell.data[formula.field]);
          if (data !== undefined) {
            result.push(data);
          }
        }
      }
      return { success: true, value: result };
    }
    case 'filter': {
      const result: CellState[] = [];
      for (const cell of runtime.getStates()) {
        if (formula.filter(cell)) {
          result.push(cell);
        }
      }
      return { success: true, value: result };
    }
    default: {
      return { success: false, errors: [`不支持公式参数类型 ${formula.kind}`] };
    }
  }
}

export function normalizeDataType(
  def: VariableDefinition,
  value: CellValue | undefined | null
): CellValue | undefined {
  if (value !== undefined && value !== null) {
    if (def.type === 'number') {
      const number = typeof value === 'number' ? value : Number.parseFloat(value);
      return def.fixed ? +number.toFixed(def.fixed) : number;
    }
  }
  return undefined;
}
