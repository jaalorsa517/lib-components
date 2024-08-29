import { ToggleServiceType, ToggleType } from "lib/components/toggle/Toggle.type";
import { ElementAttr } from "lib/shared/class/Element.cls";
import { Types } from "lib/shared/enums";
import { ISwitchObject } from "lib/shared/interfaces";
import { ITemplate } from "lib/shared/interfaces/Template.interface";

export class ToggleService {
  private _eventEmitter: CustomEvent;
  private _templateCls: ITemplate<ToggleType>;
  private _labelOptions: string[] = [];
  private _elementAttr: ElementAttr;
  private _attrs: ISwitchObject = {}
  private _checked: boolean;
  private _getType: Function;

  constructor(toggleServiceType: ToggleServiceType) {
    this._templateCls = toggleServiceType.template;
    this._eventEmitter = toggleServiceType.eventEmitter
    this._elementAttr = toggleServiceType.elementAttr
    this._getType = toggleServiceType.getType
    this._labelOptions = ToggleService.getOptionsLabel(this._elementAttr);
    this._checked = this._getType(
      this._elementAttr.getAttribute("checked") || "false",
      Types.BOOLEAN,
      this._elementAttr.shadowDOM
    );
  }

  static getOptionsLabel(element: ElementAttr): string[] {
    const _label: string = element.getAttribute("label") || "";
    const labelOptions: string[] = _label.split("/").slice(0, 2);
    if (labelOptions.length === 1) labelOptions.push(_label);
    return labelOptions;
  }

  set attrs(value: ISwitchObject) {
    this._attrs = value
  }

  private onClick = (e: MouseEvent) => {
    e.preventDefault();
    this._checked = !this._getType(
      this._elementAttr.getAttribute("checked") || "false",
      Types.BOOLEAN,
      this._elementAttr.shadowDOM
    );
    this._elementAttr.setAttribute("checked", `${this._checked}`);
    this._elementAttr.setAttribute("label", this._getLabel);
    this._eventEmitter.detail.isChecked = this._checked;
    this._elementAttr.dispatchEvent(this._eventEmitter);
  };

  private _changeChecked(value: boolean) {
    const radio: HTMLInputElement | null = this._elementAttr.shadowDOM.querySelector(
      `.${this._templateCls.getClsNames().radio}`
    );
    if (!radio) return;
    radio.checked = value || false;
    this._checked = value || false;
    this._attrs.label(this._getLabel);
  }
  private _changeLabel(label: string) {
    const labelEl: HTMLElement | null = this._elementAttr.shadowDOM.querySelector(
      `.${this._templateCls.getClsNames().label}`
    );
    if (!labelEl) return
    labelEl.innerText = label;
  }

  private _attrLabel(newValue: string) {
    const hasElements: boolean = newValue?.split("/").length === 2 || false;
    const isLabelOptionslengthNot2: boolean = this._labelOptions.length !== 2
    const isLabelOptionsNotAllTrue: boolean = !this._labelOptions.every((value) => value)
    const isLabelOptionsValid: boolean = (isLabelOptionslengthNot2 || isLabelOptionsNotAllTrue)
    if (hasElements && isLabelOptionsValid)
      this._labelOptions = ToggleService.getOptionsLabel(this._elementAttr);
    this._changeLabel(hasElements ? this._getLabel : newValue || "");
  }

  private get _getLabel(): string {
    return this._labelOptions[+this._checked];
  }

  connectedCallback() {
    this._elementAttr.render(this._callbackRender.bind(this));
    this._elementAttr.addEventListener("click", this.onClick, false);
  }

  private _callbackRender() {
    this._checked = this._getType(
      this._elementAttr.getAttribute("checked") || "false",
      Types.BOOLEAN,
      this._elementAttr.shadowDOM
    );
    this._changeChecked(this._checked);
    this._eventEmitter.detail.isChecked = this._checked;
    this._elementAttr.dispatchEvent(this._eventEmitter);
  }

  disconnectedCallback() {
    this._elementAttr.removeEventListener("click", this.onClick);
  }

  checkedAttr(newValue: string) {
    this._changeChecked(this._getType(newValue, Types.BOOLEAN, this._elementAttr.shadowDOM))
  }

  labelAttr(newValue: string) { this._attrLabel(newValue) }
}