export interface ITemplate<T> {
  getClsNames(): T;
  getTemplate(): string;
  getStyle(): string;
}