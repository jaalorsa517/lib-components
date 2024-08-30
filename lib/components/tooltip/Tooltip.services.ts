import { TooltipType, TooltipServiceType } from "lib/components/tooltip/Tooltip.type";
import { ElementAttr } from "lib/shared/class/Element.cls";
import { ISwitchObject } from "lib/shared/interfaces";
import { ITemplate } from "lib/shared/interfaces/Template.interface";

export class TooltipService {
  private _elementAttr: ElementAttr;
  private _templateCls: ITemplate<TooltipType>;
  private _text: string;
  private _startPosition: "vertical" | "horizontal";
  private _gap: number = 20;
  private _positionObject: ISwitchObject<HTMLDivElement> = {
    vertical: this._verticalOption.bind(this),
    horizontal: this._horizontalOption.bind(this),
  };

  constructor(tooltipServiceType: TooltipServiceType) {
    this._templateCls = tooltipServiceType.template;
    this._elementAttr = tooltipServiceType.elementAttr;
    this._text = this._elementAttr.getAttribute("text") || "";
    this._startPosition = this._evaluateStartPosition(this._elementAttr.getAttribute("startposition"));
  }

  private _onMouseIn() {
    if (!this._text) return
    const tooltip: HTMLDivElement = document.createElement("div");
    tooltip.innerHTML = this._text;
    tooltip.classList.add(`${this._templateCls.getClsNames().tooltip}`);
    this._elementAttr.getElement(`.${this._templateCls.getClsNames().container}`)?.appendChild(tooltip);
    this._positionObject[this._startPosition](tooltip);
    setTimeout(() => {
      tooltip.classList.add(`${this._templateCls.getClsNames().tooltipInOut}`);
    }, 0);
  }

  private _onMouseOut() {
    if (!this._text) return
    const tooltip: Element | null = this._elementAttr.getElement(`.${this._templateCls.getClsNames().tooltip}`);
    if (!tooltip) return
    this._elementAttr.getElement(`.${this._templateCls.getClsNames().container}`)?.removeChild(tooltip);
    this._elementAttr.removeAttribute("style");
  }

  private _evaluateStartPosition(startPosition: string | null): "vertical" | "horizontal" {
    if (startPosition === "horizontal") return "horizontal";
    return "vertical";
  }

  private _horizontalOption(tooltip: HTMLDivElement) {
    const { isLimitXRight, width, sizeBefore, isLimitYBottom, isLimitYTop } =
      this._getBoundingClientRect(tooltip);
    if (isLimitXRight) {
      tooltip.classList.add(`${this._templateCls.getClsNames().tootipOeste}`);
      this._elementAttr.style.setProperty("--left", `initial`);
      this._elementAttr.style.setProperty("--right", `${width + this._gap}px`);
      this._elementAttr.style.setProperty("--left-before", "initial");
      this._elementAttr.style.setProperty("--right-before", `-${sizeBefore * 2}px`);
    } else {
      tooltip.classList.add(`${this._templateCls.getClsNames().tooltipEste}`);
      this._elementAttr.style.setProperty("--left", `${width + this._gap}px`);
      this._elementAttr.style.setProperty("--left-before", `-${sizeBefore * 2}px`);
    }

    if (isLimitYBottom) {
      this._elementAttr.style.setProperty("--top", "initial");
      this._elementAttr.style.setProperty("--bottom", `-${sizeBefore / 2}px`);
      this._elementAttr.style.setProperty("--bottom-before", `${sizeBefore / 2}px`);
      return;
    }
    if (isLimitYTop) {
      this._elementAttr.style.setProperty("--top", `-${sizeBefore / 2}px`);
      this._elementAttr.style.setProperty("--bottom-before", `initial`);
      this._elementAttr.style.setProperty("--top-before", `${sizeBefore / 2}px`);
      return;
    }
    this._elementAttr.style.setProperty("--top", `calc(50% - ${tooltip.clientHeight / 2}px )`);
    this._elementAttr.style.setProperty("--bottom-before", `initial`);
    this._elementAttr.style.setProperty("--top-before", `calc(50% - ${sizeBefore}px)`);
  }

  private _verticalOption(tooltip: HTMLDivElement) {
    const { isLimitXRight, isLlimitXLeft, isLimitYBottom, height, sizeBefore, client } =
      this._getBoundingClientRect(tooltip);

    if (isLimitYBottom) {
      tooltip.classList.add(`${this._templateCls.getClsNames().tooltipNorte}`);
      this._elementAttr.style.setProperty("--top", "initial");
      this._elementAttr.style.setProperty("--bottom", `${height + sizeBefore / 2}px`);
      this._elementAttr.style.setProperty("--bottom-before", `-${sizeBefore * 2}px`);
    } else {
      tooltip.classList.add(`${this._templateCls.getClsNames().tooltipSur}`);
      this._elementAttr.style.setProperty("--top", `${height + sizeBefore / 2}px`);
    }
    if (isLimitXRight) {
      this._elementAttr.style.setProperty("--left", `initial`);
      this._elementAttr.style.setProperty("--right", `0`);
      this._elementAttr.style.setProperty("--left-before", `initial`);
      this._elementAttr.style.setProperty("--right-before", `${sizeBefore / 2}px`);
      return;
    }
    if (isLlimitXLeft) {
      this._elementAttr.style.setProperty("--left", "0");
      this._elementAttr.style.setProperty("--left-before", `${sizeBefore / 2}px`);
      return;
    }
    this._elementAttr.style.setProperty("--left", `calc(50% - ${client.widthTooltip / 2}px)`);
    this._elementAttr.style.setProperty("--left-before", `calc(50% - ${sizeBefore}px)`);
    return;
  }

  private _getBoundingClientRect(element: HTMLDivElement) {
    const client = { widthTooltip: element.clientWidth, heightTooltip: element.clientHeight };
    const { x, width, y, height } = this._elementAttr.getBoundingClientRect();
    const heightDocument = document.documentElement.clientHeight;
    const widthDocument = document.documentElement.clientWidth;
    const boundingClient = {
      paddingTopTooltip: Number(window.getComputedStyle(this._elementAttr).getPropertyValue("padding-top").split("px")[0]),
      paddingBottomTooltip: Number(
        window.getComputedStyle(this._elementAttr).getPropertyValue("padding-bottom").split("px")[0]
      ),
      sizeBefore: Number(window.getComputedStyle(element).getPropertyValue("--border-width").split("px")[0]),
      isLimitYTop: client.heightTooltip >= y,
      isLimitYBottom: y + height + client.heightTooltip / 2 > heightDocument - height,
      isLimitXRight: x + width + client.widthTooltip / 2 > widthDocument - width,
      isLlimitXLeft: client.widthTooltip / 2 >= x,
    };
    return {
      client,
      x,
      width,
      y,
      height: height - (boundingClient.paddingTopTooltip + boundingClient.paddingBottomTooltip),
      ...boundingClient,
    };
  }

  connectedCallback() {
    this._elementAttr.render();
    this._elementAttr.addEventListener("mouseenter", this._onMouseIn.bind(this), false);
    this._elementAttr.addEventListener("mouseleave", this._onMouseOut.bind(this), false);
  }

  disconnectedCallback() {
    this._elementAttr.removeEventListener("mouseenter", this._onMouseIn.bind(this), false);
    this._elementAttr.removeEventListener("mouseleave", this._onMouseOut.bind(this), false);
  }

  textAttr(newValue: string) {
    this._text = newValue
  }

  startPositionAttr(newValue: string) {
    this._startPosition = this._evaluateStartPosition(newValue)
  }
}