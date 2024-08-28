import { ElementOpenAttr } from "lib/shared/class/ElementOpen.csl";
import { ISwitchObject } from "lib/shared/interfaces";
import { ITemplate } from "lib/shared/interfaces/Template.interface";
import { CollapseTemplate } from "lib/components/collapse/Collapse.tmp";
import { CollapseType } from "lib/components/collapse/Collapse.type";
import { CollapseService } from "lib/components/collapse/Collapse.services";

export class Collapse extends ElementOpenAttr {
  private _templateCls: ITemplate<CollapseType>;
  private collapseService: CollapseService;
  private _eventEmitter: CustomEvent;
  protected _attrs: ISwitchObject;

  static get observedAttributes() {
    return ["isopen", "*"];
  }

  constructor() {
    super();
    this._templateCls = new CollapseTemplate()
    this._eventEmitter = new CustomEvent("isOpen", { detail: { isOpen: false } });
    this.collapseService = new CollapseService({ elementAttr: this, template: this._templateCls, eventEmitter: this._eventEmitter });
    this._attrs = this._getLogicAttr();
  }

  private _getLogicAttr(): ISwitchObject {
    return {
      isopen: this.collapseService.isOpenHandler.bind(this.collapseService),
    };
  }


  connectedCallback() {
    this.collapseService.connectedCallback()
  }

  disconnectedCallback() {
    this.collapseService.disconnectedCallback()
  }
}
