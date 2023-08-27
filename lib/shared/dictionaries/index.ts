import { ITypes } from "../interfaces";

export const typesOption: ITypes = {
  string: (a: string) => {
    const typesExclude = ["null","undefined","NaN","Symbol"];
    if (!typesExclude.includes(a)) return a
    throw new Error(a);
  },
  number: (a: string) => {
    const numberConvert = Number(a)
    if (!isNaN(numberConvert)) return numberConvert
    throw new Error(a);
  },
  boolean: (a: string) => {
    if (a === "true" || a === "false" ) return eval(a);
    if(!a) return false
    throw new Error(a);
  },
  object: (a: string) => {
    try {
      return JSON.parse(a); 
    } catch (error: any) {
      throw new Error(a);
    }
  },
};
