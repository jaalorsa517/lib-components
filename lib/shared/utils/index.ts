import { Attributes, Types } from "lib/shared/enums";
import { typesOption } from "lib/shared/dictionaries";

const _unique: number = Math.round(new Date().getTime() * Math.random());

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
  obj.shadowDOM.append(body.content);
  obj.setAttribute(Attributes.hash, _unique.toString());
}

export function renderDomOpen(obj: any): void {
  const styletmp: HTMLStyleElement = document.createElement("style");
  styletmp.textContent = obj._templateCls.style;
  document.head.appendChild(styletmp);
  const body: HTMLTemplateElement = document.createElement("template");
  body.innerHTML = obj._templateCls.template;
  obj.append(body.content);
  obj.setAttribute(Attributes.hash, _unique.toString());
}
