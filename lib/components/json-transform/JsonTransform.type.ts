import { ElementOpen } from "lib/shared/class/ElementOpen.csl";
import { ITemplate } from "lib/shared/interfaces/Template.interface";
import { ClassNames } from "lib/shared/types";

export type JsonTransformType = ClassNames & {
  textArea: string;
  textAreaError: string;
  textAreaContainer: string;
  btnContainer: string;
  btn: string;
  btnCopy: string;
  btnClear: string;
  btnFormat: string;
  popup: string;
  errorInput: string;
}

export type JsonTransformServiceType = {
  elementAttr: ElementOpen;
  template: ITemplate<JsonTransformType>;
}