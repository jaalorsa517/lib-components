import { TooltipService } from "lib/components/tooltip/Tooltip.services";
import { TooltipTemplate } from "lib/components/tooltip/Tooltip.tmpt";
import { ElementAttr } from "lib/shared/class/Element.cls";
import { ISwitchObject } from "lib/shared/interfaces";

export class Tooltip extends ElementAttr {
  private _templateCls: TooltipTemplate;
  private _tooltipService: TooltipService
  protected _attrs: ISwitchObject;

  static get observedAttributes() {
    return ["text", "startposition", "*"];
  }

  constructor() {
    super();
    this._templateCls = new TooltipTemplate();
    this._tooltipService = new TooltipService({
      elementAttr: this,
      template: this._templateCls
    });
    this._attrs = this._getAttrs();
  }

  private _getAttrs(): ISwitchObject {
    return {
      text: this._tooltipService.textAttr.bind(this._tooltipService),
      startposition: this._tooltipService.startPositionAttr.bind(this._tooltipService),
    };
  }
  connectedCallback() {
    this._tooltipService.connectedCallback();
  }

  disconnectedCallback() {
    this._tooltipService.disconnectedCallback();
  }
}
