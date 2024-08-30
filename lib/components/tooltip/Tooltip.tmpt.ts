import { ITemplate } from "lib/shared/interfaces/Template.interface";
import { TooltipEnum } from "lib/components/tooltip/Tooltip.enum";
import { TooltipType } from "lib/components/tooltip/Tooltip.type";

export class TooltipTemplate implements ITemplate<TooltipType> {
  private _clsNames: TooltipType;
  private _template: string;
  private _style: string;

  constructor() {
    this._clsNames = this._getClassNames();
    this._template = this._getTemplate();
    this._style = this._getStyle();
  }

  getClsNames(): TooltipType {
    return this._clsNames;
  }
  getTemplate(): string {
    return this._template;
  }
  getStyle(): string {
    return this._style;
  }

  private _getClassNames() {
    return {
      root: TooltipEnum.tag,
      container: `${TooltipEnum.tag}__container`,
      tooltip: `${TooltipEnum.tag}__tooltip`,
      tooltipNorte: `${TooltipEnum.tag}__tooltip--norte`,
      tootipOeste: `${TooltipEnum.tag}__tooltip--oeste`,
      tooltipSur: `${TooltipEnum.tag}__tooltip--sur`,
      tooltipEste: `${TooltipEnum.tag}__tooltip--este`,
      tooltipInOut: `${TooltipEnum.tag}__tooltip--in-out`,
    };
  }
  private _getTemplate() {
    return `
      <div class="${this._clsNames.container}" >
        <slot ></slot>
      </div>
    `;
  }
  private _getStyle() {
    return `
      ${this._clsNames.root},:host {
        width: fit-content;
        height: fit-content;
        display:block;
        box-sizing: border-box;
        cursor:pointer;
        --border-width: 10px;
        --background-color: #2d302d;
        --border-transparent: transparent;
        --top:0;
        --left:0;
        --bottom:initial;
        --right:initial;
        --right-before: initial;
        --left-before: 20px;
        --bottom-before: 100%;
        --top-before: initial;
        --max-width: auto;
        --min-width: auto;
        --width: auto;
        --height: auto;
        --padding: 8px;
        --fontFamily: initial;
        --fontSize: .875em;
        --fontColor: #fff;
        --text-align: start;
      }
      .${this._clsNames.container} {
        position: relative;
      }
      .${this._clsNames.tooltip}{
        width: var(--width);
        height: var(--height);
        max-width: var(--max-width);
        min-width: var(--min-width);
        padding: var(--padding);
        position: absolute;
        top: var(--top);
        left: var(--left);
        bottom: var(--bottom);
        right: var(--right);
        font-family: var(--fontFamily);
        font-size: var(--fontSize);
        text-align: var(--text-align);
        background-color: var(--background-color);
        border-radius: .5em;
        color: var(--fontColor);
        user-select: none;
        z-index: 1000;
        opacity: 0;
        transition: opacity .3s ease-in-out;
        overflow-wrap: normal;
      }
      .${this._clsNames.tooltip}.${this._clsNames.tooltipInOut}{
        opacity: 1;
      }
      .${this._clsNames.tooltip}::before{
        content: "";
        position: absolute;
        left: var(--left-before);
        bottom: var(--bottom-before);
        right: var(--right-before);
        top: var(--top-before);
        border-style: solid;
        border-width: var(--border-width);
      }
      .${this._clsNames.tooltipNorte}::before {
        border-bottom-color: var(--border-transparent);
        border-top-color: var(--background-color);
        border-left-color: var(--border-transparent);
        border-right-color: var(--border-transparent);
      }
      .${this._clsNames.tooltipEste}::before {
        border-bottom-color: var(--border-transparent);
        border-right-color: var(--background-color);
        border-top-color: var(--border-transparent);
        border-left-color: var(--border-transparent);
      }
      .${this._clsNames.tooltipSur}::before {
        border-top-color: var(--border-transparent);
        border-bottom-color: var(--background-color);
        border-left-color: var(--border-transparent);
        border-right-color: var(--border-transparent);
      }
      .${this._clsNames.tootipOeste}::before {
        border-top-color: var(--border-transparent);
        border-left-color: var(--background-color);
        border-bottom-color: var(--border-transparent);
        border-right-color: var(--border-transparent);
      }
      `;
  }
}
