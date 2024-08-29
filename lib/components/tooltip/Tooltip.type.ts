import { ElementAttr } from "lib/shared/class/Element.cls";
import { ITemplate } from "lib/shared/interfaces/Template.interface";
import { ClassNames } from "lib/shared/types";

export type TooltipType = ClassNames & {
  tooltip: string;
  tooltipNorte: string;
  tootipOeste: string;
  tooltipSur: string;
  tooltipEste: string;
  tooltipInOut: string;
}

export type TooltipServiceType = {
  elementAttr: ElementAttr;
  template: ITemplate<TooltipType>;
}
