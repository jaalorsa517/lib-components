import { ElementAttr } from "lib/shared/class/Element.cls";
import { CarouselServiceType, CarouselType } from "lib/components/carousel/Carousel.type";
import { ITemplate } from "lib/shared/interfaces/Template.interface";

export class CarouselService {

  private _slides: HTMLDivElement | any
  private _widthSlide: number = 0;
  private _countSlides: number;
  private _setInterval: any = 0;
  private _elementAttr: ElementAttr;
  private _template: ITemplate<CarouselType>;
  private _window: Window;

  constructor({ elementAttr, window, template }: CarouselServiceType) {
    this._elementAttr = elementAttr;
    this._window = window;
    this._template = template;
    this._countSlides = parseInt(this._elementAttr.getAttribute("count-slides") || "3");
  }

  get getCountSlides() {
    return this._countSlides;
  }

  get getSlides() {
    return this._slides
  }

  get getSetInterval() {
    return this._setInterval
  }

  connectedCallback(): void {
    this._elementAttr.render()

    this._slides = this._elementAttr.getElement(`.${this._template.getClsNames().slides}`) as unknown as HTMLDivElement;
    const transitionAuto = this._elementAttr.getAttribute("transition-auto");
    const timeWait = parseInt(transitionAuto || "0");
    if (timeWait) {
      this._setInterval = this._window.setInterval(() => {
        this.moveRight();
      }, timeWait);
    }
    this.setWidthContainer();
    
    const arrowLeft = this._elementAttr.getElement(`.${this._template.getClsNames().arrowLeft}`);
    if (arrowLeft) {
      arrowLeft.addEventListener("click", this.moveLeft.bind(this));
    }
    
    const arrowRight = this._elementAttr.getElement(`.${this._template.getClsNames().arrowRight}`);
    if (arrowRight) {
      arrowRight.addEventListener("click", this.moveRight.bind(this));
    }
  }

  private setWidthContainer() {
    const slot = this._elementAttr.getElement(`slot.${this._template.getClsNames().slot}`) as unknown as HTMLSlotElement;
    if (!slot) return
    const slides = slot.assignedElements();
    if (!slides.length) return
    const sumatoriaSize = slides.reduce((acc, current) => {
      const margin =
        parseFloat(this._window.getComputedStyle(current).marginRight) +
        parseFloat(this._window.getComputedStyle(current).marginLeft);
      const width = parseFloat(this._window.getComputedStyle(current).width);
      acc += margin + width;
      return acc;
    }, 0);
    this._widthSlide = Math.round(sumatoriaSize / slides.length);

    const slotParent = slot.parentElement;
    if (!slotParent) return
    slotParent.style.width = this._widthSlide * this._countSlides + "px";
  }

  moveLeft() {
    const startWidth = this._slides.scrollLeft <= 0;
    if (startWidth) {
      this._slides.scrollLeft = this._slides.scrollWidth - this._slides.clientWidth;
      return;
    }

    const isJumpCompleted = this._slides.scrollLeft % this._widthSlide === 0;
    if (isJumpCompleted) {
      this._slides.scrollLeft -= this._widthSlide;
      return;
    }

    const scrollLeft = Math.round(this._widthSlide + (this._slides.scrollLeft % this._widthSlide));
    this._slides.scrollLeft -= scrollLeft;
  }

  moveRight() {
    const finalWidth = this._slides.scrollLeft >= this._slides.scrollWidth - this._slides.clientWidth;
    if (finalWidth) {
      this._slides.scrollLeft = 0;
      return;
    }

    const isJumpCompleted = this._slides.scrollLeft % this._widthSlide === 0;
    if (isJumpCompleted) {
      this._slides.scrollLeft += this._widthSlide;
      return;
    }

    const scrollLeft = Math.round(this._widthSlide - (this._slides.scrollLeft % this._widthSlide));
    this._slides.scrollLeft += scrollLeft;
  }

  disconnectedCallback(): void {
    if (this._setInterval) this._window.clearInterval(this._setInterval);
    const arrowLeft = this._elementAttr.getElement(`.${this._template.getClsNames().arrowLeft}`);
    if (arrowLeft) {
      arrowLeft.removeEventListener("click", this.moveLeft);
    }

    const arrowRight = this._elementAttr.getElement(`.${this._template.getClsNames().arrowRight}`);
    if (arrowRight) {
      arrowRight.removeEventListener("click", this.moveRight);
    }
  }

  countSlides(newValue: string) {
    this._countSlides = parseInt(newValue) || 3;
    this.setWidthContainer();
  }
}