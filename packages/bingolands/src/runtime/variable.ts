import type { VariableDefinition } from '../types';

import type { BingoRuntime } from '.';
import type { Formula } from './formula/types';

import { type EvaluateResult, parseFormula, evaluateFormula, normalizeDataType } from './formula';

export type VariableStateWatcher<T extends number | string = number | string> = (
  state: VariableState<T>,
  newValue: EvaluateResult<T>,
  oldValue: EvaluateResult<T>
) => void;

export class VariableState<T extends number | string> {
  public readonly name: string;

  public readonly definition: VariableDefinition;

  private _callbacks = new Set<VariableStateWatcher>();

  private _value: EvaluateResult<T>;

  private _formula: Formula;

  public constructor(name: string, defs: Record<string, VariableDefinition>) {
    this.definition = defs[name]!;
    this.name = name;
    this._value =
      this.definition.type === 'number'
        ? { success: true, value: normalizeDataType(this.definition, 0) as T }
        : { success: true, value: normalizeDataType(this.definition, '') as T };
    this._formula = parseFormula(this.definition.formula, defs);
  }

  public get value() {
    return this._value;
  }

  public update(runtime: BingoRuntime) {
    const newValue = evaluateFormula<T>(this.definition, this._formula, runtime);
    const oldValue = this._value;

    if (
      (newValue.success && oldValue.success && newValue.value !== oldValue.value) ||
      (newValue.success && !oldValue.success) ||
      (!newValue.success && oldValue.success)
    ) {
      this._value = newValue;
      this.emit(newValue, oldValue);
    }
  }

  private emit(newValue: EvaluateResult<T>, oldValue: EvaluateResult<T>) {
    for (const cb of this._callbacks) {
      try {
        cb(this, newValue, oldValue);
      } catch (error) {
        console.error(error);
      }
    }
  }

  public watch<T extends number | string>(callback: VariableStateWatcher<T>) {
    this._callbacks.add(callback as any);
    return () => {
      return this._callbacks.delete(callback as any);
    };
  }
}
