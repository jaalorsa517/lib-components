import { TooltipEnum } from "./Tooltip.enum";
import { ITooltip } from "./ITooltip";
import { Template } from "../../shared/class/Template.cls";

export class TooltipTemplate extends Template {
  private _clsNames: ITooltip;
  private _template: string;
  private _style: string;

  constructor() {
    super();
    this._clsNames = {
      root: TooltipEnum.tag,
      container: `${TooltipEnum.tag}__container`,
      tooltip: `${TooltipEnum.tag}__tooltip`,
      tooltipNorte: `${TooltipEnum.tag}__tooltip--norte`,
      tooltipEste: `${TooltipEnum.tag}__tooltip--este`,
      tooltipSur: `${TooltipEnum.tag}__tooltip--sur`,
      tootipOeste: `${TooltipEnum.tag}__tooltip--oeste`,
    };
    this._template = this._getTemplate();
    this._style = this._getStyle();
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
        --background-color: #000;
        --border-transparent: transparent;
        --top:0;
        --left:0;
        --bottom:initial;
        --right:initial;
        --right-before: initial;
        --left-before: 20px;
        --bottom-before: 100%;
        --top-before: initial;
        --max-width: unset;
        --width: auto;
        --height: auto;
        --padding: 5px;
        --fontFamily: initial;
        --fontSize: 14px;
        --fontColor: #fff;
      }
      .${this.clsNames.container} {
        position: relative;
      }
      .${this.clsNames.tooltip}{
        width: var(--width);
        height: var(--height);
        max-width: var(--max-width);
        padding: var(--padding);
        position: absolute;
        top: var(--top);
        left: var(--left);
        bottom: var(--bottom);
        right: var(--right);
        font-family: var(--fontFamily);
        font-size: var(--fontSize);
        background-color: green;
        /* background-color: var(--background-color); */
        border-radius: .5em;
        color: var(--fontColor);
        user-select: none;
        z-index: 1000;
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
        border-top-color: var(--border-transparent);
        border-bottom-color: var(--background-color);
        border-left-color: var(--border-transparent);
        border-right-color: var(--border-transparent);
      }
      .${this.clsNames.tooltipEste}::before {
        border-top-color: var(--border-transparent);
        border-left-color: var(--background-color);
        border-bottom-color: var(--border-transparent);
        border-right-color: var(--border-transparent);
      }
      .${this.clsNames.tooltipSur}::before {
        border-bottom-color: var(--border-transparent);
        border-top-color: var(--background-color);
        border-left-color: var(--border-transparent);
        border-right-color: var(--border-transparent);
      }
      .${this.clsNames.tootipOeste}::before {
        border-bottom-color: var(--border-transparent);
        border-right-color: var(--background-color);
        border-top-color: var(--border-transparent);
        border-left-color: var(--border-transparent);
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
