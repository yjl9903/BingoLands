import type { VariableDefinition } from '../types';

import type { CellState } from './cell';

export type VariableStateWatcher<T extends number | string = number | string> = (
  state: VariableState<T>,
  newVal: T,
  oldVal: T
) => void;

export class VariableState<T extends number | string> {
  public readonly name: string;

  public readonly definition: VariableDefinition;

  private _callbacks = new Set<VariableStateWatcher>();

  private _value!: T;

  public constructor(name: string, definition: VariableDefinition) {
    this.name = name;
    this.definition = definition;
  }

  public get value() {
    return this._value;
  }

  public update(states: CellState[]) { }

  public watch<T extends number | string>(callback: VariableStateWatcher<T>) {
    this._callbacks.add(callback as any);
    return () => {
      return this._callbacks.delete(callback as any);
    };
  }
}
