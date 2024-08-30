import { ToggleTemplate } from "./Toggle.tmpt";
import { ElementAttr } from "lib/shared/class/Element.cls";
import { getType } from "lib/shared/utils";
import { Types } from "lib/shared/enums";
import { ISwitchObject } from "lib/shared/interfaces";
import { ITemplate } from "lib/shared/interfaces/Template.interface";
import { ToggleType } from "lib/components/toggle/Toggle.type";
import { ToggleService } from "lib/components/toggle/Toggle.services";

export class Toggle extends ElementAttr {
  private _eventEmitter: CustomEvent;
  private _templateCls: ITemplate<ToggleType>;
  private _toggleService: ToggleService;
  public _attrs: ISwitchObject;

  static get observedAttributes() {
    return ["checked", "label", "*"];
  }

  constructor() {
    super();
    const label = ToggleService.getOptionsLabel(this);
    const checked = getType(
      this.getAttribute("checked") || "false",
      Types.BOOLEAN,
      this.shadowDOM
    );
    this._templateCls = new ToggleTemplate(label[checked]);
    this._eventEmitter = new CustomEvent("change", {
      detail: { isChecked: checked },
    });
    this._toggleService = new ToggleService({
      elementAttr: this,
      template: this._templateCls,
      eventEmitter: this._eventEmitter,
      getType,
    })
    this._attrs = this._getLogicAttr();
    this._toggleService.attrs = this._attrs;
  }

  private _getLogicAttr(): ISwitchObject {
    return {
      checked: this._toggleService.checkedAttr.bind(this._toggleService),
      label: this._toggleService.labelAttr.bind(this._toggleService),
    };
  }

  connectedCallback() {
    this._toggleService.connectedCallback();
  }

  disconnectedCallback() {
    this._toggleService.disconnectedCallback();
  }
}
