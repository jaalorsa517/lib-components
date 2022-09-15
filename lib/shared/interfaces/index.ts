export interface ClassNames {
  root: string;
  container: string;
}
export interface ITypes {
  string: Function;
  number: Function;
  boolean: Function;
  object: Function;
}

export interface ISwitchObject<T = string> {
  [key: string]: (a: T) => void;
}
