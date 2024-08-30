import { CollapseEnum } from "lib/components/collapse/Collapse.enum";
import { ITemplate } from "lib/shared/interfaces/Template.interface";
import { CollapseType } from "lib/components/collapse/Collapse.type";
import { ClassNames } from "lib/shared/types";

export class CollapseTemplate implements ITemplate<CollapseType> {
  private _clsNames: CollapseType;
  private _template: string;
  private _style: string;

  constructor() {
    this._clsNames = this._getClsNames();
    this._template = this._getTemplate();
    this._style = this._getStyle();
  }
  getClsNames(): ClassNames {
    return this._clsNames;
  }
  getTemplate(): string {
    return this._template;
  }
  getStyle(): string {
    return this._style;
  }

  private _getClsNames(): CollapseType {
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
