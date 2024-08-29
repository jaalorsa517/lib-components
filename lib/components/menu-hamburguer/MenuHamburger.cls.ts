import { ElementOpenAttr } from "lib/shared/class/ElementOpen.csl";
import { ISwitchObject } from "lib/shared/interfaces";
import { MenuHamburguerTemplate } from "lib/components/menu-hamburguer/MenuHamburguer.tmp";
import { MenuHamburguerService } from "lib/components/menu-hamburguer/MenuHamburger.services";

export class MenuHamburguer extends ElementOpenAttr {
  private _eventEmitter: CustomEvent;
  private _templateCls: MenuHamburguerTemplate;
  private _menuHamburguerService: MenuHamburguerService;
  protected _attrs: ISwitchObject;

  static get observedAttributes() {
    return ["isopen", "animation", "*"];
  }

  constructor() {
    super();
    this._templateCls = new MenuHamburguerTemplate();
    this._eventEmitter = new CustomEvent("isOpen", {
      bubbles: false,
      detail: { isOpen: false },
    });
    this._menuHamburguerService = new MenuHamburguerService({
      template: this._templateCls,
      elementAttr: this,
      eventEmitter: this._eventEmitter,
    })
    this._attrs = this._getLogicAttr();
  }

  private _getLogicAttr(): ISwitchObject {
    return {
      isopen: this._menuHamburguerService.isOpenAttr.bind(this._menuHamburguerService),
      animation: this._menuHamburguerService.animationAttr.bind(this._menuHamburguerService),
    };
  }

  connectedCallback() {
    this._menuHamburguerService.connectedCallback()
  }

  disconnectedCallback() {
    this._menuHamburguerService.disconnectedCallback()
  }
}
