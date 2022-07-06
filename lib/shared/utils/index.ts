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

export function renderDom(obj: any): void {
  const styletmp: HTMLStyleElement = document.createElement("style");
  styletmp.textContent = obj._templateCls.style;
  obj.shadowDOM.appendChild(styletmp);
  const body: HTMLTemplateElement = document.createElement("template");
  body.innerHTML = obj._templateCls.template;
  obj.shadowDOM.appendChild(document.importNode(body.content, true));
}
