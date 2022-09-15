import { Element } from "lib/shared/class/Element.cls";
import { renderDom } from "lib/shared/utils";
// import { MenuHamburguerTemplate } from "./MenuHamburguer.tmp";

export class MenuHamburguer extends Element {
  // static get observedAttributes() {
  //   return [];
  // }
  // private _eventEmitter: CustomEvent;
  // private _templateCls: MenuHamburguerTemplate;

  constructor() {
    super();
    // this._templateCls = new MenuHamburguerTemplate();
    this._render();
  }

  private _render() {
    renderDom(this);
  }
}
