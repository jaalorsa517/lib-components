import { StrategyCommand } from "lib/shared/class/AnimateCommands.cls";
import { ElementOpenAttr } from "lib/shared/class/ElementOpen.csl";
import { ProxyWatch } from "lib/shared/class/Proxies.cls";
import { CommandEnum } from "lib/shared/enums/AnimateCommands.enum";
import { ISwitchObject } from "lib/shared/interfaces";
import { IAnimationInOut } from "lib/shared/interfaces/AnimateCommands.interface";
import { CollapseTemplate } from "./Collapse.tmp";

export class Collapse extends ElementOpenAttr {
  private _templateCls: CollapseTemplate;
  private _animation: string;
  private _slotSummary: Element | null = null;
  private _slotContent: Element | null = null;
  private _isOpen: ProxyWatch = new ProxyWatch(false);
  private _animationIn: Animation = new Animation();
  private _animationOut: Animation = new Animation();
  protected _attrs: ISwitchObject;
  private _eventEmitter: CustomEvent;

  static get observedAttributes() {
    return ["isopen", "*"];
  }

  private get _container(): Element | null {
    return this.getElement(`.${this._templateCls.clsNames.container}`);
  }

  constructor() {
    super();
    this._isOpen.watch(this._toggleContent.bind(this));
    this._templateCls = new CollapseTemplate();
    this._animation = this.validateAttributeAnimation();
    this._attrs = this._getLogicAttr();
    this._eventEmitter = new CustomEvent("isOpen", { detail: { isOpen: this._isOpen.value } });
  }

  private _getLogicAttr(): ISwitchObject {
    return {
      isopen: (value: string) => {
        this._isOpen.value = value === "true";
      },
    };
  }

  private validateAttributeAnimation(): string {
    const animation = this.getAttribute("animation") as string;
    const isExist: boolean = animation === CommandEnum.GROW_IN_OUT;
    return isExist ? animation : CommandEnum.GROW_IN_OUT;
  }

  private _init() {
    this._slotSummary = this.getElement("[slot=summary]");
    this._slotContent = this.getElement("[slot=content]");

    if (this._slotSummary) {
      if (this._container) {
        this._container.appendChild(this._slotSummary as Node);
      }
      const eventManual = this.getAttribute("eventmanual");
      if (eventManual !== "true")
        this._slotSummary.addEventListener("click", this._onToggle.bind(this), false);
    }
    if (this._slotContent) {
      const instace = new StrategyCommand(this._slotContent, this._animation).instances as IAnimationInOut;
      this._animationIn = instace.in.execute();
      this._animationOut = instace.out.execute();
      this._slotContent.remove();
    }
  }

  private _onToggle() {
    this._isOpen.value = !this._isOpen.value;
  }

  private _toggleContent() {
    setTimeout(() => {
      if (!this._slotContent) return;
      const isOpen = this.getAttribute("isopen");
      if (isOpen !== this._isOpen.value.toString()) {
        this._eventEmitter.detail.isOpen = this._isOpen.value;
        this.dispatchEvent(this._eventEmitter);
      }
      this.setAttribute("isopen", this._isOpen.value.toString());
      if (this._isOpen.value) {
        this._animationOut.cancel();
        this._animationIn.play();
        this._container?.appendChild(this._slotContent as Node);
      } else {
        this._animationOut.onfinish = () => {
          this._slotContent?.remove();
        };
        this._animationIn.cancel();
        this._animationOut.play();
      }
    }, 0);
  }

  connectedCallback() {
    this.render(this._init.bind(this));
  }

  disconnectedCallback() {
    this._slotSummary?.addEventListener("click", this._onToggle.bind(this), false);
  }
}
