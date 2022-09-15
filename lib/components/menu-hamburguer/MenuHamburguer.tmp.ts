import { Template } from "lib/shared/class/Template.cls";
import { IMenuHamburguer } from "./IMenuHamburguer";
import { MenuHamburguerEnum } from "./MenuHamburger.enum";

export class MenuHamburguerTemplate extends Template {
  private _clsNames: IMenuHamburguer;
  private _template: string;
  private _style: string;

  constructor() {
    super();
    this._clsNames = this._getClsNames();
    this._template = this._getTemplate();
    this._style = this._getStyle();
  }

  get clsNames(): IMenuHamburguer {
    return this._clsNames;
  }
  get template(): string {
    return this._template;
  }
  get style(): string {
    return this._style;
  }

  private _getClsNames(): IMenuHamburguer {
    return {
      root: MenuHamburguerEnum.tag,
      container: `${MenuHamburguerEnum.tag}__container`,
    };
  }

  private _getTemplate(): string {
    return ``;
  }

  private _getStyle(): string {
    return ``;
  }
}
