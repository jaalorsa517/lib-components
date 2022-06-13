import { Types } from "../enums";
import { typesOption } from "../dictionaries";

export function getType(value: string, type: Types, DOM: any): any {
  let response: any;
  try {
    response = typesOption[type](value);
  } catch (e: any) {
    DOM.innerHTML = "Attribute " + e.message + " is not valid";
  }
  return response || "";
}
