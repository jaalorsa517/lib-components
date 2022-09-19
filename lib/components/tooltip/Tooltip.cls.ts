import { TooltipTemplate } from "./Tooltip.tmpt";
import { Element } from "lib/shared/class/Element.cls";
import { renderDom } from "lib/shared/utils";
import { ISwitchObject } from "lib/shared/interfaces";

export class Tooltip extends Element {
  static get observedAttributes() {
    return ["text", "startposition"];
  }

  private _templateCls: TooltipTemplate;
  private _text: string;
  private _startPosition: "vertical" | "horizontal";
  private _gap: number = 20;
  private _attrs: ISwitchObject;
  private _positionObject: ISwitchObject<HTMLDivElement> = {
    vertical: this._verticalOption.bind(this),
    horizontal: this._horizontalOption.bind(this),
  };

  constructor() {
    super();
    this._templateCls = new TooltipTemplate();
    this._text = this.getAttribute("text") || "";
    this._startPosition = this._evaluateStartPosition(this.getAttribute("startposition"));
    this._attrs = this._getAttrs();
    this._render();
  }
  private _render() {
    renderDom(this);
  }
  private _getAttrs(): ISwitchObject {
    return {
      text: (newValue: string) => (this._text = newValue),
      startposition: (newValue: string) => (this._startPosition = this._evaluateStartPosition(newValue)),
    };
  }
  private _onMouseIn() {
    if (this._text) {
      const tooltip: HTMLDivElement = document.createElement("div");
      tooltip.innerHTML = this._text;
      tooltip.classList.add(`${this._templateCls.clsNames.tooltip}`);
      this.getElement(`.${this._templateCls.clsNames.container}`)?.appendChild(tooltip);
      this._positionObject[this._startPosition](tooltip);
      setTimeout(() => {
        tooltip.classList.add(`${this._templateCls.clsNames.tooltipInOut}`);
      }, 0);
    }
  }
  private _onMouseOut() {
    if (this._text) {
      const tooltip: Element | null = this.getElement(`.${this._templateCls.clsNames.tooltip}`);
      if (tooltip) {
        this.getElement(`.${this._templateCls.clsNames.container}`)?.removeChild(tooltip);
        this.removeAttribute("style");
      }
    }
  }
  private _evaluateStartPosition(startPosition: string | null): "vertical" | "horizontal" {
    if (startPosition === "horizontal") return "horizontal";
    return "vertical";
  }
  private _horizontalOption(tooltip: HTMLDivElement) {
    const { isLimitXRight, width, client, sizeBefore, isLimitYBottom, isLimitYTop } =
      this._getBoundingClientRect(tooltip);
    if (isLimitXRight) {
      tooltip.classList.add(`${this._templateCls.clsNames.tootipOeste}`);
      this.style.setProperty("--left", `initial`);
      this.style.setProperty("--right", `${width + this._gap}px`);
      this.style.setProperty("--left-before", "initial");
      this.style.setProperty("--right-before", `-${sizeBefore * 2}px`);
    } else {
      tooltip.classList.add(`${this._templateCls.clsNames.tooltipEste}`);
      this.style.setProperty("--left", `${width + this._gap}px`);
      this.style.setProperty("--left-before", `-${sizeBefore * 2}px`);
    }

    if (isLimitYBottom) {
      this.style.setProperty("--top", "initial");
      this.style.setProperty("--bottom", `-${sizeBefore / 2}px`);
      this.style.setProperty("--bottom-before", `${sizeBefore / 2}px`);
      return;
    }
    if (isLimitYTop) {
      this.style.setProperty("--top", `-${sizeBefore / 2}px`);
      this.style.setProperty("--bottom-before", `initial`);
      this.style.setProperty("--top-before", `${sizeBefore / 2}px`);
      return;
    }
    this.style.setProperty("--top", `calc(50% - ${client.heightTooltip / 2}px )`);
    this.style.setProperty("--bottom-before", `initial`);
    this.style.setProperty("--top-before", `calc(50% - ${sizeBefore}px)`);
  }
  private _verticalOption(tooltip: HTMLDivElement) {
    const { isLimitXRight, isLlimitXLeft, isLimitYBottom, height, sizeBefore, client } =
      this._getBoundingClientRect(tooltip);

    if (isLimitYBottom) {
      tooltip.classList.add(`${this._templateCls.clsNames.tooltipNorte}`);
      this.style.setProperty("--top", "initial");
      this.style.setProperty("--bottom", `${height + sizeBefore / 2}px`);
      this.style.setProperty("--bottom-before", `-${sizeBefore * 2}px`);
    } else {
      tooltip.classList.add(`${this._templateCls.clsNames.tooltipSur}`);
      this.style.setProperty("--top", `${height + sizeBefore / 2}px`);
    }
    if (isLimitXRight) {
      this.style.setProperty("--left", `initial`);
      this.style.setProperty("--right", `0`);
      this.style.setProperty("--left-before", `initial`);
      this.style.setProperty("--right-before", `${sizeBefore / 2}px`);
      return;
    }
    if (isLlimitXLeft) {
      this.style.setProperty("--left", "0");
      this.style.setProperty("--left-before", `${sizeBefore / 2}px`);
      return;
    }
    this.style.setProperty("--left", `calc(50% - ${client.widthTooltip / 2}px)`);
    this.style.setProperty("--left-before", `calc(50% - ${sizeBefore}px)`);
    return;
  }
  private _getBoundingClientRect(element: HTMLDivElement) {
    const client = { widthTooltip: element.clientWidth, heightTooltip: element.clientHeight };
    const { x, width, y, height } = this.getBoundingClientRect();
    const heightDocument = document.documentElement.clientHeight;
    const widthDocument = document.documentElement.clientWidth;
    const boundingClient = {
      paddingTopTooltip: Number(window.getComputedStyle(this).getPropertyValue("padding-top").split("px")[0]),
      paddingBottomTooltip: Number(
        window.getComputedStyle(this).getPropertyValue("padding-bottom").split("px")[0]
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

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) this._attrs[name](newValue);
  }
  connectedCallback() {
    this.addEventListener("mouseenter", this._onMouseIn, false);
    this.addEventListener("mouseleave", this._onMouseOut, false);
  }
  disconnectedCallback() {
    this.removeEventListener("mouseenter", this._onMouseIn, false);
    this.removeEventListener("mouseleave", this._onMouseOut, false);
  }
}
