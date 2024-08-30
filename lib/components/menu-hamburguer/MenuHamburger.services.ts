import { MenuHamburguerServiceType, MenuHamburguerType } from "lib/components/menu-hamburguer/MenuHamburguer.type";
import { ElementOpenAttr } from "lib/shared/class/ElementOpen.csl";
import { ProxyWatch } from "lib/shared/class/Proxies.cls";
import { ITemplate } from "lib/shared/interfaces/Template.interface";
import { StrategyCommand } from "lib/shared/class/AnimateCommands.cls";
import { CommandEnum } from "lib/shared/enums/AnimateCommands.enum";
import { IAnimationInOut } from "lib/shared/interfaces/AnimateCommands.interface";

export class MenuHamburguerService {
  private _templateCls: ITemplate<MenuHamburguerType>;
  private _elementAttr: ElementOpenAttr;
  private _eventEmitter: CustomEvent
  private _menuElement: Element | null = null;
  private _isOpen: ProxyWatch;
  private _container: Element | null = null;
  private _slotChild: Element | null = null;
  private _animation: string;
  private _children: Element | null = null;
  private _animationIn: Animation = new Animation();
  private _animationOut: Animation = new Animation();

  constructor(menuHamburguerServiceType: MenuHamburguerServiceType) {
    this._templateCls = menuHamburguerServiceType.template;
    this._elementAttr = menuHamburguerServiceType.elementAttr;
    this._eventEmitter = menuHamburguerServiceType.eventEmitter;
    this._animation = this.validateAttributeAnimation(this._elementAttr.getAttribute("animation") || "");
    this._isOpen = new ProxyWatch(false);
    this._isOpen.watch(this.openClose.bind(this));
  }

  private get getMenu() {
    return this._elementAttr.getElement(`.${this._templateCls.getClsNames().containeChild} section`) as Element;
  }

  private validateAttributeAnimation(animation: string): string {
    const isExist: boolean = Object.entries(CommandEnum).findIndex(([_, value]) => animation === value) > -1;
    return isExist ? animation : CommandEnum.FADE_IN_OUT;
  }

  private _init() {
    this._menuElement = this._elementAttr.getElement(`.${this._templateCls.getClsNames().menu}`) as HTMLDivElement;
    if (this._menuElement) this._menuElement.addEventListener("click", this.onClick, false);

    this._container = this._elementAttr.getElement(`.${this._templateCls.getClsNames().container}`);
    this._slotChild = this._elementAttr.getElement(`.${this._templateCls.getClsNames().containeChild}`);

    this.extractSlot();
    this._elementAttr.setAttribute("animation", this._animation);
  }

  private extractSlot() {
    const children = Array.from(this._elementAttr.children);
    const index = children.findIndex((elem: Element) =>
      elem.className.includes(this._templateCls.getClsNames().container)
    );
    if (index < 0) return;

    children.splice(index, 1);
    const section = document.createElement("section");
    children.forEach((elem: Element) => {
      section.append(elem);
    });
    this._children = section;
    section.addEventListener("click", () => {
      this._isOpen.value = false;
      this._eventEmitter.detail.isOpen = this._isOpen.value;
      this._elementAttr.dispatchEvent(this._eventEmitter);
    });
  }

  private saveChildren() {
    const children = this.getMenu;
    if (children)
      this._children = children;
  }

  private onClick = (e: Event) => {
    e.preventDefault();
    this._isOpen.value = !this._isOpen.value;
    this._eventEmitter.detail.isOpen = this._isOpen.value;
    this._elementAttr.dispatchEvent(this._eventEmitter);
  };

  private removeSlot() {
    if (!this._animation || !this._container || !this._slotChild) return
    this._animationIn.cancel();
    this._animationOut.play();
    this._animationOut.onfinish = this._onFinish.bind(this);
  }

  private _onFinish() {
    this.saveChildren();
    if (this._children) this._children.remove();
  }

  private appendSlot() {
    if (!this._animation || !this._container || !this._slotChild || !this._children) return
    this._slotChild?.append(this._children);
    this._animationOut.cancel();
    this._animationIn.play();
  }

  private openClose(): void {
    const menu = this._elementAttr.getElement(`.${this._templateCls.getClsNames().menu}`);
    if (menu) menu.classList.toggle("active");

    const lines = this._elementAttr.getElements(`.${this._templateCls.getClsNames().line}`);
    lines.forEach((line) => line.classList.toggle("active"));

    if (this._isOpen.value) this.appendSlot();
    else this.removeSlot();
  }

  connectedCallback() {
    this._elementAttr.render(this._init.bind(this));
  }

  disconnectedCallback() {
    if (this._menuElement) this._menuElement.removeEventListener("click", this.onClick, false);
  }

  isOpenAttr(value: string) {
    this._isOpen.value = value === "true";
  }

  animationAttr(value: string) {
    setTimeout(() => {
      this._animation = this.validateAttributeAnimation(value);
      if (!this._slotChild) return
      const instances = new StrategyCommand(this._slotChild, this._animation)
        .instances as IAnimationInOut;
      this._animationIn = instances.in.execute();
      this._animationOut = instances.out.execute();
    }, 0);
  }

}
