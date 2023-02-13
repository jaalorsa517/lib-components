import { Template } from "lib/shared/class/Template.cls";
import { ICollapse } from "./ICollapse";
import { CollapseEnum } from "./Collapse.enum";

export class CollapseTemplate extends Template {
  private _clsNames: ICollapse;
  private _template: string;
  private _style: string;

  constructor() {
    super();
    this._clsNames = this._getClsNames();
    this._template = this._getTemplate();
    this._style = this._getStyle();
  }

  get clsNames(): ICollapse {
    return this._clsNames;
  }
  get template(): string {
    return this._template;
  }
  get style(): string {
    return this._style;
  }

  private _getClsNames(): ICollapse {
    return {
      root: CollapseEnum.tag,
      container: `${CollapseEnum.tag}__container`,
    };
  }

  private _getTemplate(): string {
    return `
      <div class="${this._clsNames.container}">
      </div>
    `;
  }

  private _getStyle(): string {
    return `
      summary > * {
        display: inline-block;
      }
      ${this._clsNames.root}, :host{
        display: block;
        width: 500px;
        color: #112e09;
        font-size: 1em;
        font-family: "Roboto", sans-serif;
      }
      .${this._clsNames.container}{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }
    `;
  }
}
