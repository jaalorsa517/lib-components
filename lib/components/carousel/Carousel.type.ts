import { ElementAttr } from "lib/shared/class/Element.cls";
import { ITemplate } from "lib/shared/interfaces/Template.interface";
import { ClassNames } from "lib/shared/types";

export type CarouselServiceType = {
  elementAttr: ElementAttr;
  window: Window;
  template: ITemplate<CarouselType>
}

export type CarouselType = ClassNames & {
  arrow: string;
  arrowLeft: string;
  arrowRight: string;
  slides: string;
  slot: string;
}
