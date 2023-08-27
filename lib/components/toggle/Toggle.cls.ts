import { ToggleTemplate } from "./Toggle.tmpt";
import { ElementAttr } from "lib/shared/class/Element.cls";
import { getType } from "lib/shared/utils";
import { Types } from "lib/shared/enums";
import { ISwitchObject } from "lib/shared/interfaces";

export class Toggle extends ElementAttr {
  private _checked: boolean;
  private _eventEmitter: CustomEvent;
  private _templateCls: ToggleTemplate;
  private _labelOptions: string[] = [];
  protected _attrs: ISwitchObject;

  static get observedAttributes() {
    return ["checked", "label", "*"];
  }

  constructor() {
    super();
    this._labelOptions = this._getOptionsLabel();
    this._checked = getType(
      this.getAttribute("checked") || "false",
      Types.BOOLEAN,
      this.shadowDOM
    );
    this._templateCls = new ToggleTemplate(this._getLabel);
    this._attrs = this._getLogicAttr();
    this._eventEmitter = new CustomEvent("change", {
      detail: { isChecked: this._checked },
    });
  }
  private _getLogicAttr(): ISwitchObject {
    return {
      checked: (newValue: string) =>
        this._changeChecked(getType(newValue, Types.BOOLEAN, this.shadowDOM)),
      label: (newValue: string) => this._attrLabel(newValue),
    };
  }
  private onClick = (e: MouseEvent) => {
    e.preventDefault();
    this._checked = !getType(
      this.getAttribute("checked") || "false",
      Types.BOOLEAN,
      this.shadowDOM
    );
    this.setAttribute("checked", `${this._checked}`);
    this.setAttribute("label", this._getLabel);
    this._eventEmitter.detail.isChecked = this._checked;
    this.dispatchEvent(this._eventEmitter);
  };
  private _getOptionsLabel(): string[] {
    const _label: string = this.getAttribute("label") || "";
    const labelOptions: string[] = _label.split("/").slice(0, 2);
    if (labelOptions.length === 1) labelOptions.push(_label);
    return labelOptions;
  }
  private _changeChecked(value: boolean) {
    const radio: HTMLInputElement | null = this.shadowDOM.querySelector(
      `.${this._templateCls.clsNames.radio}`
    );
    if (!radio) return;
    radio.checked = value || false;
    this._checked = value || false;
    this._attrs.label(this._getLabel);
  }
  private _changeLabel(label: string) {
    const labelEl: HTMLElement | null = this.shadowDOM.querySelector(
      `.${this._templateCls.clsNames.label}`
    );
    if (labelEl) {
      labelEl.innerText = label;
    }
  }
  private _attrLabel(newValue: string) {
    const hasElements: boolean = newValue?.split("/").length === 2 || false;
    if (
      hasElements &&
      (this._labelOptions.length !== 2 ||
        !this._labelOptions.every((value) => value))
    )
      this._labelOptions = this._getOptionsLabel();
    this._changeLabel(hasElements ? this._getLabel : newValue || "");
  }
  private get _getLabel(): string {
    return this._labelOptions[+this._checked];
  }

  connectedCallback() {
    this.render(() => {
      this._checked = getType(
        this.getAttribute("checked") || "false",
        Types.BOOLEAN,
        this.shadowDOM
      );
      this._changeChecked(this._checked);
      this._eventEmitter.detail.isChecked = this._checked;
      this.dispatchEvent(this._eventEmitter);
    });
    this.addEventListener("click", this.onClick, false);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.onClick);
  }
}
