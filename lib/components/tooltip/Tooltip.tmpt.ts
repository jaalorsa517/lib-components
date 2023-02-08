import { TooltipEnum } from "./Tooltip.enum";
import { ITooltip } from "./ITooltip";
import { Template } from "lib/shared/class/Template.cls";

export class TooltipTemplate extends Template {
  private _clsNames: ITooltip;
  private _template: string;
  private _style: string;

  constructor() {
    super();
    this._clsNames = this._getClassNames();
    this._template = this._getTemplate();
    this._style = this._getStyle();
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
      ${this.clsNames.root},:host {
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
      .${this.clsNames.container} {
        position: relative;
      }
      .${this.clsNames.tooltip}{
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
      .${this.clsNames.tooltip}.${this.clsNames.tooltipInOut}{
        opacity: 1;
      }
      .${this.clsNames.tooltip}::before{
        content: "";
        position: absolute;
        left: var(--left-before);
        bottom: var(--bottom-before);
        right: var(--right-before);
        top: var(--top-before);
        border-style: solid;
        border-width: var(--border-width);
      }
      .${this.clsNames.tooltipNorte}::before {
        border-bottom-color: var(--border-transparent);
        border-top-color: var(--background-color);
        border-left-color: var(--border-transparent);
        border-right-color: var(--border-transparent);
      }
      .${this.clsNames.tooltipEste}::before {
        border-bottom-color: var(--border-transparent);
        border-right-color: var(--background-color);
        border-top-color: var(--border-transparent);
        border-left-color: var(--border-transparent);
      }
      .${this.clsNames.tooltipSur}::before {
        border-top-color: var(--border-transparent);
        border-bottom-color: var(--background-color);
        border-left-color: var(--border-transparent);
        border-right-color: var(--border-transparent);
      }
      .${this.clsNames.tootipOeste}::before {
        border-top-color: var(--border-transparent);
        border-left-color: var(--background-color);
        border-bottom-color: var(--border-transparent);
        border-right-color: var(--border-transparent);
      }
      `;
  }

  get clsNames() {
    return this._clsNames;
  }
  get template() {
    return this._template;
  }
  get style() {
    return this._style;
  }
}
