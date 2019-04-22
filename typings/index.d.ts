/// <reference types="node"/>

declare type Index = number|string

interface ValueRenderer<T> {
  (value: T, selected: boolean): string
}

interface ResolvedValue<T> {
  id: Index,
  value: T
}

interface Callback<T> {
  (valueId: Index, value: T): any
}

interface ValuesObject<T> {
  [s: string]: T;
}

interface ValuesArray<T> extends Array<T> {}

interface Options<T> {
  outputStream?: NodeJS.WriteStream,
  inputStream?: NodeJS.WriteStream,
  values: ValuesObject<T> | ValuesArray<T>,
  defaultValue?: Index,
  selected?: string,
  unselected?: string,
  indentation?: number,
  cleanup?: boolean,
  valueRenderer?: ValueRenderer<T>
}

declare function creator<T> (options: Options<T>): Promise<ResolvedValue<T>>;
declare function creator<T> (options: Options<T>, callback: Callback<T>): void;

export default creator

declare module 'cli-select' {
  export = creator
}
