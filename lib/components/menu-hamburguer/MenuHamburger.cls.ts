import { Element } from "lib/shared/class/Element.cls";
import { Attributes } from "lib/shared/enums";
import { renderDom } from "lib/shared/utils";
import { MenuHamburguerTemplate } from "./MenuHamburguer.tmp";

export class MenuHamburguer extends Element {
  private _eventEmitter: CustomEvent;
  private _menuElement: Element | null = null;
  private _templateCls: MenuHamburguerTemplate;
  private _isOpen: boolean = false;
  private _container: Element | null = null;
  private _slotChild: Element | null = null;
  private _animation: string;

  constructor() {
    super();
    this._animation = this.getAttribute("in-out") || "opacity";
    this._templateCls = new MenuHamburguerTemplate(this._animation);
    this._eventEmitter = new CustomEvent("isOpen", { bubbles: false, detail: { isOpen: this._isOpen } });
  }

  private _render() {
    renderDom(this);
    this._container = this.getElement(`.${this._templateCls.clsNames.containeChild}`);

    this._menuElement = this.getElement(`.${this._templateCls.clsNames.menu}`);
    if (this._menuElement) this._menuElement.addEventListener("click", this.onClick, false);

    this._container = this.getElement(`.${this._templateCls.clsNames.container}`);
    this._slotChild = this.getElement(`.${this._templateCls.clsNames.containeChild}`);
    if (this._slotChild) this._slotChild.classList.add("animation-out");
  }

  private onClick = (e: MouseEvent) => {
    e.preventDefault();
    const menu = this.getElement(`.${this._templateCls.clsNames.menu}`);
    if (menu) menu.classList.toggle("active");
    const lines = this.getElements(`.${this._templateCls.clsNames.line}`);
    lines.forEach((line) => line.classList.toggle("active"));
    this._isOpen = !this._isOpen;
    if (this._isOpen) this.appendSlot();
    else this.removeSlot();
    this._eventEmitter.detail.isOpen = this._isOpen;
    this.dispatchEvent(this._eventEmitter);
  };

  private removeSlot() {
    if (this._animation && this._container && this._slotChild) {
      this._slotChild.classList.remove("animation-in");
      this._slotChild.classList.add("animation-out");
      return;
    }
  }

  private appendSlot() {
    if (this._animation && this._container && this._slotChild) {
      this._slotChild.classList.remove("animation-out");
      this._slotChild.classList.add("animation-in");
      return;
    }
  }

  connectedCallback() {
    const hash = this.getAttribute(Attributes.hash);
    if (!hash) this._render();
  }
  disconnectedCallback() {
    if (this._menuElement) this._menuElement.removeEventListener("click", this.onClick, false);
  }
}
