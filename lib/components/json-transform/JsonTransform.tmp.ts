import { Template } from "lib/shared/class/Template.cls";
import { IJsonTransform } from "./IJsonTransform";
import { JsonTransformEnum } from "./JsonTransform.enum";

export class JsonTransformTemplate extends Template {
  private _clsNames: IJsonTransform;
  private _template: string;
  private _style: string;

  constructor() {
    super();
    this._clsNames = this._getClsNames();
    this._template = this._getTemplate();
    this._style = this._getStyle();
  }

  get clsNames(): IJsonTransform {
    return this._clsNames;
  }
  get template(): string {
    return this._template;
  }
  get style(): string {
    return this._style;
  }

  private _getClsNames(): IJsonTransform {
    return {
      root: JsonTransformEnum.tag,
      container: `${JsonTransformEnum.tag}__container`,
      textArea: `${JsonTransformEnum.tag}__textArea`,
      btnContainer: `${JsonTransformEnum.tag}__btnContainer`,
      btn: `${JsonTransformEnum.tag}__btn`,
      btnCopy: `${JsonTransformEnum.tag}__btn--copy`,
      btnClear: `${JsonTransformEnum.tag}__btn--clear`,
      popup: `${JsonTransformEnum.tag}__popup`,
      textAreaContainer: `${JsonTransformEnum.tag}__textAreaContainer`,
    };
  }

  private _getTemplate(): string {
    return `
      <div class="${this._clsNames.container}">
        <div class="${this._clsNames.textAreaContainer}">
          <textarea  rea class="${this._clsNames.textArea}"></textarea>
        </div>
        <div class="${this._clsNames.btnContainer}">
          <button class="${this._clsNames.btn} ${this._clsNames.btnCopy}">Copiar</button>
          <button class="${this._clsNames.btn} ${this._clsNames.btnClear}">Limpiar</button>
        </div>
      </div>
    `;
  }

  private _getStyle(): string {
    return `
      ${this._clsNames.root}, :host{
        display: block;
        position: relative;
        width: 500px;
        height: 500px;
        --color_primary: #438C40;
        --color_font: #112e09;
        --color_font_light: #f9f9f9;
        --color_popup: var(--color_font);
        --color_popup_font: var(--color_font_light);
        --font-size: 1em;
        --font-family: "Roboto", sans-serif;
        --line-height: 1.5;
      }
      .${this._clsNames.container}{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
      .${this._clsNames.textArea} {
        width: 90%;
        height: 95%;
        padding: 0.5em;
        color: var(--color_font);
        font-size: var(--font-size);
        font-family: var(--font-family);
        line-height: var(--line-height);
        border: 2px solid var(--color_primary);
        border-radius: 0.5em;
        overflow: auto;
        white-space: pre-wrap;
        scrollbar-width: thin;
      }
      .${this._clsNames.textArea}:focus-visible {
        outline: 1px solid var(--color_primary);
      }
      .${this._clsNames.textArea}::-webkit-scrollbar {
        width: 1px;
      }
      .${this._clsNames.textAreaContainer} {
        flex: 10;
      }
      .${this._clsNames.btnContainer}{
        flex: 1;
      }
      .${this._clsNames.btnContainer},
      .${this._clsNames.textAreaContainer} {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
      .${this._clsNames.btn} {
        padding: .1875em .3125em;
        margin: 1em;
        min-width: 100px;
        position: relative;
        font-size: .9375em;
        color: var(--color_font_light);
        outline: none;
        background-color: var(--color_primary);
        border: 1px solid var(--color_primary);
        border-radius: 4px;
        cursor: pointer;
        user-select: none;
      }
      .${this._clsNames.btn}:hover {
        opacity: 0.8
      }
      .${this.clsNames.popup}{
        padding: 0.3em;
        position: absolute;
        left: 50%;
        border-radius: 3px;
        color: var(--color_popup_font);
        background-color: var(--color_popup);
        transform: translate(-50%, -50%);
        animation: entry 1.2s linear forwards;
      }
      @keyframes entry{
        0%{
          opacity:0;
          top: 200%;
        }
        30%{
        }
        50%{
          top: 50%;
          opacity: 1;
        }
        100%{
          opacity:0;
          top: -100%;
        }
      }
    `;
  }
}
