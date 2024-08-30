import { ElementOpenAttr } from "lib/shared/class/ElementOpen.csl";
import { ITemplate } from "lib/shared/interfaces/Template.interface";
import { ClassNames } from "lib/shared/types";

export type MenuHamburguerType = ClassNames  &{
  menu: string;
  line: string;
  lineUno: string;
  lineDos: string;
  lineTres: string;
  containeChild: string;
}

export type MenuHamburguerServiceType = {
  elementAttr: ElementOpenAttr;
  template: ITemplate<MenuHamburguerType>;
  eventEmitter: CustomEvent;
}