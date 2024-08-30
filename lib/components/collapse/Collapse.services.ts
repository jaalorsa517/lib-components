import { CarouselServiceType, CollapseType } from "lib/components/collapse/Collapse.type";
import { StrategyCommand } from "lib/shared/class/AnimateCommands.cls";
import { ElementOpenAttr } from "lib/shared/class/ElementOpen.csl";
import { ProxyWatch } from "lib/shared/class/Proxies.cls";
import { CommandEnum } from "lib/shared/enums/AnimateCommands.enum";
import { IAnimationInOut } from "lib/shared/interfaces/AnimateCommands.interface";
import { ITemplate } from "lib/shared/interfaces/Template.interface";

export class CollapseService {
  private _templateCls: ITemplate<CollapseType>;
  private _elementAttr: ElementOpenAttr;
  private _eventEmitter: CustomEvent;
  private _animation: string;
  private _slotSummary: Element | null = null;
  private _slotContent: Element | null = null;
  private _isOpen: ProxyWatch = new ProxyWatch(false);
  private _animationIn: Animation = new Animation();
  private _animationOut: Animation = new Animation();


  constructor(carouselServiceType: CarouselServiceType) {
    this._templateCls = carouselServiceType.template;
    this._elementAttr = carouselServiceType.elementAttr;
    this._eventEmitter = carouselServiceType.eventEmitter;
    this._isOpen.watch(this._toggleContent.bind(this));
    this._animation = CommandEnum.GROW_IN_OUT;

  }

  private get _container(): Element | null {
    return this._elementAttr.getElement(`.${this._templateCls.getClsNames().container}`);
  }

  isOpenHandler(value: string) {
    this._isOpen.value = value === "true";
  }

  private _clearContent() {
    const children = Array.from(this._elementAttr.children);
    children.forEach(this._clearChildren.bind(this));
  }

  private _clearChildren(child: Element) {
    const isContainer = child.classList.contains(this._templateCls.getClsNames().container);
    const slot = child.getAttribute("slot") || "";
    if (isContainer || ["content", "summary"].includes(slot)) {
      return
    }
    child.remove();
  }

  private _init() {
    this._clearContent();

    this._slotSummary = this._elementAttr.getElement("[slot=summary]");
    if (this._slotSummary) {
      this._initSlotSummary(this._slotSummary);
    }

    this._slotContent = this._elementAttr.getElement("[slot=content]");
    if (this._slotContent) {
      this._initSlotContent(this._slotContent);
    }
  }

  private _initSlotSummary(slotSummary: Element) {
    if (this._container) {
      this._container.appendChild(this._slotSummary as Node);
    }
    const eventManual = this._elementAttr.getAttribute("eventmanual");
    if (eventManual !== "true")
      slotSummary.addEventListener("click", this._onToggle.bind(this), false);
  }

  private _initSlotContent(slotContent: Element) {
    const instace = new StrategyCommand(slotContent, this._animation).instances as IAnimationInOut;
    this._animationIn = instace.in.execute();
    this._animationOut = instace.out.execute();
    slotContent.remove();
  }

  private _onToggle() {
    this._isOpen.value = !this._isOpen.value;
  }

  private _toggleContent() {
    setTimeout(this._toggleContentTimeOut.bind(this), 0);
  }

  private _toggleContentTimeOut() {
    if (!this._slotContent) return;

    const isOpen = this._elementAttr.getAttribute("isopen");
    if (isOpen !== this._isOpen.value.toString()) {
      this._eventEmitter.detail.isOpen = this._isOpen.value;
      this._elementAttr.dispatchEvent(this._eventEmitter);
    }

    this._elementAttr.setAttribute("isopen", this._isOpen.value.toString());
    if (this._isOpen.value) {
      this._animationOut.cancel();
      this._animationIn.play();
      this._container?.appendChild(this._slotContent as Node);
      return
    }

    this._animationOut.onfinish = () => {
      this._slotContent?.remove();
    };
    this._animationIn.cancel();
    this._animationOut.play();
  }

  connectedCallback() {
    this._elementAttr.render(this._init.bind(this));
  }

  disconnectedCallback() {
    this._slotSummary?.addEventListener("click", this._onToggle.bind(this), false);
  }
}