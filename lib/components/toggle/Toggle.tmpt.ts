import { ToggleEnum } from "./Toggle.enum";
import { IToggle } from "./IToggle";
import { Template } from "lib/shared/class/Template.cls";

export class ToggleTemplate extends Template {
  private _label: string;
  private _clsNames: IToggle;
  private _template: string;
  private _style: string;

  constructor(label: string) {
    super();
    this._label = label;
    this._clsNames = this._getClsNames();
    this._template = this._getTemplate();
    this._style = this._getStyle();
  }
  get clsNames(): IToggle {
    return this._clsNames;
  }
  get template(): string {
    return this._template;
  }
  get style(): string {
    return this._style;
  }

  private _getClsNames(): IToggle {
    return {
      root: ToggleEnum.tag,
      container: `${ToggleEnum.tag}__container`,
      radio: `${ToggleEnum.tag}__radio`,
      switch: `${ToggleEnum.tag}__switch`,
      label: `${ToggleEnum.tag}__label`,
    };
  }

  private _getTemplate(): string {
    return `
      <div class="${this.clsNames.container}">
        <input class="${this.clsNames.radio}" type="radio" />
        <div class="${this.clsNames.switch}"></div>
        <span class="${this.clsNames.label}">${this._label}</span>
      </div>
      `;
  }

  private _getStyle(): string {
    return `
      ${this.clsNames.root},:host {
          width: fit-content;
          display:block;
          font-size: 10px;
          --backWidth: 6em;
          --backHeight: 3em;
          --backColorActive: green;
          --backColorInactive: gray;
          --backColorSwitch: white;
          --swSize: calc(var(--backHeight) - 2px);
          --labelSize: 1.6em;
          --labelColor: darkgray;
          --labelFont: sans-serif;
          --borderRadius: 10em;
          box-sizing: border-box;
        }
        .${this.clsNames.container}{
          display: flex;
          align-items: center;
          margin: .5em 0;
          }
        .${this.clsNames.radio} {
          appearance: none;
          position: absolute;
        }
        .${this.clsNames.switch} {
          order:1;
          height: var(--backHeight);
          width: var(--backWidth);
          margin: 0 .5em;
          position: relative;
          cursor: pointer;
          border-radius: var(--borderRadius);
          transition: background-color 0.3s ease-in-out;
        }
        .${this.clsNames.radio}:not(:checked) ~ .${this.clsNames.switch} {
          background-color: var(--backColorInactive);
        }
        .${this.clsNames.radio}:checked ~ .${this.clsNames.switch} {
          background-color: var(--backColorActive);
        }

        .${this.clsNames.switch}::before {
          content: "";
          height: var(--swSize);
          width: var(--swSize);
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: var(--backColorSwitch);
          border-radius: 100%;
          transition: left 0.3s ease-in-out;
        }
        .${this.clsNames.radio}:not(:checked) ~ .${this.clsNames.switch}::before {
          left: 2%;
        }
        .${this.clsNames.radio}:checked ~ .${this.clsNames.switch}::before {
          left: 50%;
        }
        .${this.clsNames.label}{
          order: 2;
          font-family: var(--labelFont);
          font-size: var(--labelSize);
          text-align: end;
          color: var(--labelColor);
          cursor: pointer;
          user-select: none;
        }
      `;
  }
}
