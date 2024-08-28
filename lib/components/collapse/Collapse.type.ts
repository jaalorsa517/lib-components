import { ElementOpenAttr } from "lib/shared/class/ElementOpen.csl";
import { ITemplate } from "lib/shared/interfaces/Template.interface";
import { ClassNames } from "lib/shared/types";

export type CollapseType = ClassNames & {}

export type CarouselServiceType = {
  elementAttr: ElementOpenAttr;
  template: ITemplate<CollapseType>;
  eventEmitter: CustomEvent;
}