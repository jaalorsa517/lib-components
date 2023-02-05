import { ElementOpen } from "lib/shared/class/ElementOpen.csl";
import { Attributes } from "lib/shared/enums";
import { renderDomOpen } from "lib/shared/utils";
import { StrategyCommand } from "lib/shared/class/AnimateCommands.cls";
import { MenuHamburguerTemplate } from "./MenuHamburguer.tmp";
import { CommandEnum } from "lib/shared/enums/AnimateCommands.enum";
import { IAnimationInOut } from "lib/shared/interfaces/AnimateCommands.interface";

export class MenuHamburguer extends ElementOpen {
  private _eventEmitter: CustomEvent;
  private _menuElement: Element | null = null;
  private _templateCls: MenuHamburguerTemplate;
  private _isOpen: boolean = false;
  private _container: Element | null = null;
  private _slotChild: Element | null = null;
  private _animation: string;
  private _children: Element | null = null;
  private _animationIn: Animation = new Animation();
  private _animationOut: Animation = new Animation();

  private get getMenu() {
    return this.getElement(`.${this._templateCls.clsNames.containeChild} section`) as Element;
  }

  constructor() {
    super();
    this._animation = this.validateAttributeAnimation();
    this._templateCls = new MenuHamburguerTemplate();
    this._eventEmitter = new CustomEvent("isOpen", { bubbles: false, detail: { isOpen: this._isOpen } });
  }

  private validateAttributeAnimation():string {
    const animation = this.getAttribute("animation") as string
    const isExist:boolean = Object.entries(CommandEnum).findIndex(([_, value]) => animation === value) > -1;
    return isExist ? animation: CommandEnum.FADE_IN_OUT
  }

  private _render() {
    renderDomOpen(this);

    this._menuElement = this.getElement(`.${this._templateCls.clsNames.menu}`) as HTMLDivElement;
    if (this._menuElement) this._menuElement.addEventListener("click", this.onClick, false);

    this._container = this.getElement(`.${this._templateCls.clsNames.container}`);
    this._slotChild = this.getElement(`.${this._templateCls.clsNames.containeChild}`);

    this.extractSlot();
    const instances = new StrategyCommand(this, this._animation).instances as IAnimationInOut;
    this._animationIn = instances.in.execute();
    this._animationOut = instances.out.execute();
  }

  private extractSlot() {
    const children = Array.from(this.children);
    const index = children.findIndex((elem: Element) =>
      elem.className.includes(this._templateCls.clsNames.container)
    );
    if (index > -1) {
      children.splice(index, 1);
      const section = document.createElement("section");
      children.forEach((elem: Element) => {
        section.appendChild(elem.cloneNode(true));
        elem.remove();
      });
      this._children = section;
    }
  }

  private saveChildren() {
    const children = this.getMenu;
    if (children) this._children = children;
  }

  private onClick = (e: Event) => {
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
      this._animationOut.play();
      this._animationOut.onfinish = () => {
        this.saveChildren();
        if (this._children) this._slotChild?.removeChild(this._children);
      };
      return;
    }
  }

  private appendSlot() {
    if (this._animation && this._container && this._slotChild && this._children) {
      this._slotChild?.append(this._children);
      this._animationIn.play();
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
