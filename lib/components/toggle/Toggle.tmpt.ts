import { ITemplate } from "lib/shared/interfaces/Template.interface";
import { ToggleEnum } from "lib/components/toggle/Toggle.enum";
import { ToggleType } from "lib/components/toggle/Toggle.type";

export class ToggleTemplate implements ITemplate<ToggleType> {
  private _label: string;
  private _clsNames: ToggleType;
  private _template: string;
  private _style: string;

  constructor(label: string) {
    this._label = label;
    this._clsNames = this._getClsNames();
    this._template = this._getTemplate();
    this._style = this._getStyle();
  }
  getClsNames() {
    return this._clsNames;
  }
  getTemplate(): string {
    return this._template;
  }
  getStyle(): string {
    return this._style;
  }

  private _getClsNames(): ToggleType {
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
      <div class="${this._clsNames.container}">
        <input class="${this._clsNames.radio}" type="radio" />
        <div class="${this._clsNames.switch}"></div>
        <span class="${this._clsNames.label}">${this._label}</span>
      </div>
      `;
  }

  private _getStyle(): string {
    return `
      ${this._clsNames.root},:host {
          width: fit-content;
          display:block;
          font-size: 10px;
          box-sizing: border-box;
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
        }
        .${this._clsNames.container}{
          display: flex;
          align-items: center;
          margin: .5em 0;
          }
        .${this._clsNames.radio} {
          appearance: none;
          position: absolute;
        }
        .${this._clsNames.switch} {
          order:1;
          height: var(--backHeight);
          width: var(--backWidth);
          margin: 0 .5em;
          position: relative;
          cursor: pointer;
          border-radius: var(--borderRadius);
          transition: background-color 0.3s ease-in-out;
        }
        .${this._clsNames.radio}:not(:checked) ~ .${this._clsNames.switch} {
          background-color: var(--backColorInactive);
        }
        .${this._clsNames.radio}:checked ~ .${this._clsNames.switch} {
          background-color: var(--backColorActive);
        }

        .${this._clsNames.switch}::before {
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
        .${this._clsNames.radio}:not(:checked) ~ .${this._clsNames.switch}::before {
          left: 2%;
        }
        .${this._clsNames.radio}:checked ~ .${this._clsNames.switch}::before {
          left: 50%;
        }
        .${this._clsNames.label}{
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
