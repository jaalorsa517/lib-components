import { TooltipTemplate } from "./Tooltip.tmpt";
import { Element } from "../../shared/class/Element.cls";
import { renderDom } from "lib/shared/utils";

export class Tooltip extends Element {
  static get observedAttributes() {
    return ["text", "startposition"];
  }

  private _templateCls: TooltipTemplate;
  private _text: string;
  private _startPosition: "vertical" | "horizontal";
  private _gap: number = 20;
  private _attrs: { [key: string]: (a: string) => void };
  private _positionObject: { [key: string]: (v: HTMLDivElement) => void } = {
    vertical: this._verticalOption.bind(this),
    horizontal: this._horizontalOption.bind(this),
  };

  constructor() {
    super();
    this._templateCls = new TooltipTemplate();
    this._text = this.getAttribute("text") || "";
    this._startPosition = this._evaluateStartPosition(this.getAttribute("startposition"));
    this._attrs = {
      text: (newValue: string) => (this._text = newValue),
      startposition: (newValue: string) => (this._startPosition = this._evaluateStartPosition(newValue)),
    };
    this._render();
  }
  private _render() {
    renderDom(this);
  }
  private _onMouseIn() {
    if (this._text) {
      const tooltip: HTMLDivElement = document.createElement("div");
      tooltip.innerHTML = this._text;
      tooltip.className = `${this._templateCls.clsNames.tooltip}`;
      this.getElement(`.${this._templateCls.clsNames.container}`)?.appendChild(tooltip);
      this._positionObject[this._startPosition](tooltip);
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
    const { isLimitX, width, sizeBefore, isLimitY, paddingBottomTooltip, paddingTopTooltip } =
      this._getBoundingClientRect(tooltip);
    if (isLimitX) {
      tooltip.classList.add(`${this._templateCls.clsNames.tooltipEste}`);
      tooltip.style.setProperty("--left", `initial`);
      tooltip.style.setProperty("--right", `${width + this._gap}px`);
      tooltip.style.setProperty("--left-before", "initial");
      tooltip.style.setProperty("--right-before", `-${sizeBefore * 2}px`);
    } else {
      tooltip.classList.add(`${this._templateCls.clsNames.tootipOeste}`);
      tooltip.style.setProperty("--left", `${width + this._gap}px`);
      tooltip.style.setProperty("--left-before", `-${sizeBefore * 2}px`);
    }

    if (isLimitY) {
      tooltip.style.setProperty("--top", "initial");
      tooltip.style.setProperty("--bottom", "0");
      tooltip.style.setProperty("--bottom-before", `${5}px`);
    } else {
      tooltip.style.setProperty("--top", `${0}`);
      tooltip.style.setProperty("--bottom-before", `initial`);
      tooltip.style.setProperty("--top-before", `${5}px`);
    }
  }
  private _verticalOption(tooltip: HTMLDivElement) {
    const {
      isLimitX,
      isLimitY,
      marginBottomTooltip,
      marginTopTooltip,
      height,
      sizeBefore,
      hasWidthMajorParent,
      client,
      paddingRightTooltip,
    } = this._getBoundingClientRect(tooltip);

    if (isLimitY) {
      tooltip.classList.add(`${this._templateCls.clsNames.tooltipSur}`);
      this.style.setProperty("--top", "initial");
      this.style.setProperty("--bottom", `${height - (marginTopTooltip + marginBottomTooltip)}px`);
      this.style.setProperty("--bottom-before", `-${sizeBefore * 2}px`);
    } else {
      tooltip.classList.add(`${this._templateCls.clsNames.tooltipNorte}`);
      this.style.setProperty("--top", `${height - (marginTopTooltip + marginBottomTooltip)}px`);
    }
    if (isLimitX) {
      this.style.setProperty("--left", `initial`);
      this.style.setProperty("--right", `0`);
    }
    if (hasWidthMajorParent && isLimitX) {
      this.style.setProperty("--left-before", `initial`);
      this.style.setProperty("--right-before", `${5}px`);
      return;
    }
    if (!hasWidthMajorParent) {
      this.style.setProperty("--left-before", `5px`);
      return;
    }
  }
  private _getBoundingClientRect(element: HTMLDivElement) {
    const client = { widthTooltip: element.clientWidth, heightTooltip: element.clientHeight };
    const { x, width, y, height } = this.getBoundingClientRect();
    const heightDocument = document.documentElement.clientHeight;
    const widthDocument = document.documentElement.clientWidth;
    const boundingClient = {
      paddingBottomTooltip: Number(
        window.getComputedStyle(element).getPropertyValue("padding-bottom").split("px")[0]
      ),
      paddingTopTooltip: Number(
        window.getComputedStyle(element).getPropertyValue("padding-top").split("px")[0]
      ),
      paddingRightTooltip: Number(
        window.getComputedStyle(element).getPropertyValue("padding-left").split("px")[0]
      ),
      marginTopTooltip: Number(
        window.getComputedStyle(element).getPropertyValue("margin-top").split("px")[0]
      ),
      marginBottomTooltip: Number(
        window.getComputedStyle(element).getPropertyValue("margin-bottom").split("px")[0]
      ),
      sizeBefore: Number(window.getComputedStyle(element).getPropertyValue("--border-width").split("px")[0]),
      isLimitY: y + height + client.heightTooltip > heightDocument - height,
      isLimitX: x + width + client.widthTooltip > widthDocument - width,
      hasWidthMajorParent: client.widthTooltip > width,
    };
    return {
      client,
      x,
      width,
      y,
      height,
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
