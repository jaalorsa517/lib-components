import { ElementOpenAttr } from "lib/shared/class/ElementOpen.csl";
import { StrategyCommand } from "lib/shared/class/AnimateCommands.cls";
import { MenuHamburguerTemplate } from "./MenuHamburguer.tmp";
import { CommandEnum } from "lib/shared/enums/AnimateCommands.enum";
import { IAnimationInOut } from "lib/shared/interfaces/AnimateCommands.interface";
import { ISwitchObject } from "lib/shared/interfaces";
import { ProxyWatch } from "lib/shared/class/Proxies.cls";

export class MenuHamburguer extends ElementOpenAttr {
  private _eventEmitter: CustomEvent;
  private _menuElement: Element | null = null;
  private _templateCls: MenuHamburguerTemplate;
  private _isOpen: ProxyWatch;
  private _container: Element | null = null;
  private _slotChild: Element | null = null;
  private _animation: string;
  private _children: Element | null = null;
  private _animationIn: Animation = new Animation();
  private _animationOut: Animation = new Animation();
  protected _attrs: ISwitchObject;

  static get observedAttributes() {
    return ["isopen", "animation", "*"];
  }

  private get getMenu() {
    return this.getElement(`.${this._templateCls.getClsNames().containeChild} section`) as Element;
  }

  constructor() {
    super();
    this._animation = this.validateAttributeAnimation(this.getAttribute("animation") || "");
    this._templateCls = new MenuHamburguerTemplate();
    this._isOpen = new ProxyWatch(false);
    this._isOpen.watch(this.openClose.bind(this));
    this._eventEmitter = new CustomEvent("isOpen", {
      bubbles: false,
      detail: { isOpen: this._isOpen.value },
    });
    this._attrs = this._getLogicAttr();
  }

  private validateAttributeAnimation(animation: string): string {
    const isExist: boolean = Object.entries(CommandEnum).findIndex(([_, value]) => animation === value) > -1;
    return isExist ? animation : CommandEnum.FADE_IN_OUT;
  }

  private _init() {
    this._menuElement = this.getElement(`.${this._templateCls.getClsNames().menu}`) as HTMLDivElement;
    if (this._menuElement) this._menuElement.addEventListener("click", this.onClick, false);

    this._container = this.getElement(`.${this._templateCls.getClsNames().container}`);
    this._slotChild = this.getElement(`.${this._templateCls.getClsNames().containeChild}`);

    this.extractSlot();
    this.setAttribute("animation", this._animation);
  }

  private _getLogicAttr(): ISwitchObject {
    return {
      isopen: (value: string) => {
        this._isOpen.value = value === "true";
      },
      animation: (value: string) => {
        setTimeout(() => {
          this._animation = this.validateAttributeAnimation(value);
          if (this._slotChild) {
            const instances = new StrategyCommand(this._slotChild, this._animation)
              .instances as IAnimationInOut;
            this._animationIn = instances.in.execute();
            this._animationOut = instances.out.execute();
          }
        }, 0);
      },
    };
  }

  private extractSlot() {
    const children = Array.from(this.children);
    const index = children.findIndex((elem: Element) =>
      elem.className.includes(this._templateCls.getClsNames().container)
    );
    if (index > -1) {
      children.splice(index, 1);
      const section = document.createElement("section");
      children.forEach((elem: Element) => {
        section.append(elem);
      });
      this._children = section;
      section.addEventListener("click", () => {
        this._isOpen.value = false;
        this._eventEmitter.detail.isOpen = this._isOpen.value;
        this.dispatchEvent(this._eventEmitter);
      });
    }
  }

  private saveChildren() {
    const children = this.getMenu;
    if (children) this._children = children;
  }

  private onClick = (e: Event) => {
    e.preventDefault();
    this._isOpen.value = !this._isOpen.value;
    this._eventEmitter.detail.isOpen = this._isOpen.value;
    this.dispatchEvent(this._eventEmitter);
  };

  private removeSlot() {
    if (this._animation && this._container && this._slotChild) {
      this._animationIn.cancel();
      this._animationOut.play();
      this._animationOut.onfinish = () => {
        this.saveChildren();
        if (this._children) this._children.remove();
      };
      return;
    }
  }

  private appendSlot() {
    if (this._animation && this._container && this._slotChild && this._children) {
      this._slotChild?.append(this._children);
      this._animationOut.cancel();
      this._animationIn.play();
      return;
    }
  }

  private openClose(): void {
    const menu = this.getElement(`.${this._templateCls.getClsNames().menu}`);
    if (menu) menu.classList.toggle("active");
    const lines = this.getElements(`.${this._templateCls.getClsNames().line}`);
    lines.forEach((line) => line.classList.toggle("active"));
    if (this._isOpen.value) this.appendSlot();
    else this.removeSlot();
  }

  connectedCallback() {
    this.render(this._init.bind(this));
  }

  disconnectedCallback() {
    if (this._menuElement) this._menuElement.removeEventListener("click", this.onClick, false);
  }
}
