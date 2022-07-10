import { ITypes } from "../interfaces";

export const typesOption: ITypes = {
  string: (a: string) => {
    throw new Error(a);
  },
  number: (a: string) => {
    throw new Error(a);
  },
  boolean: (a: string) => {
    if (a === "true" || a === "false") return eval(a);
    throw new Error(a);
  },
  object: (a: string) => {
    throw new Error(a);
  },
};
