import { ElementAttr } from "lib/shared/class/Element.cls";
import { ITemplate } from "lib/shared/interfaces/Template.interface";
import { ClassNames } from "lib/shared/types";

export type ToggleType = ClassNames & {
  radio: string;
  switch: string;
  label: string;
}

export type ToggleServiceType = {
  elementAttr: ElementAttr;
  template: ITemplate<ToggleType>;
  eventEmitter: CustomEvent;
  getType: Function;
}