import { CarouselEnum } from "lib/components/carousel/Carousel.enum";
import { ITemplate } from "lib/shared/interfaces/Template.interface";
import { CarouselType } from "lib/components/carousel/Carousel.type";

export class CarouselTemplate implements ITemplate<CarouselType> {
  private _clsNames: CarouselType;
  private _template: string;
  private _style: string;

  constructor() {
    this._clsNames = this._getClsNames();
    this._template = this._getTemplate();
    this._style = this._getStyle();
  }

  getClsNames(): CarouselType {
    return this._clsNames;
  }
  getTemplate(): string {
    return this._template;
  }
  getStyle(): string {
    return this._style;
  }

  private _getClsNames(): CarouselType {
    return {
      root: `${CarouselEnum.tag}`,
      container: `${CarouselEnum.tag}__container`,
      arrow: `${CarouselEnum.tag}__arrow`,
      arrowLeft: `${CarouselEnum.tag}__arrow--left`,
      arrowRight: `${CarouselEnum.tag}__arrow--right`,
      slides: `${CarouselEnum.tag}__slides`,
      slot: `${CarouselEnum.tag}__slot`,
    };
  }

  private _getTemplate(): string {
    return `
      <div class="${this._clsNames.container}">
        <div class="${this._clsNames.arrow} ${this._clsNames.arrowLeft}">
          <span>&#5176;</span>
        </div>
        <div class="${this._clsNames.slides}">
          <slot class="${this._clsNames.slot}"></slot>
        </div>
        <div class="${this._clsNames.arrow} ${this._clsNames.arrowRight}">
          <span>&#5171;</span>
        </div>
      </div>
    `;
  }

  private _getStyle(): string {
    return `
    ${this._clsNames.root}, :host{
      display: block;
      width: fit-content;
      font-size: 16px;
      --color_back_arrows: #7f7f7f;
      --color_icon: #fff;
      --size_arrows: 1.5em;
      --size_icon: 1.5em;
    }
    .${this._clsNames.container}{
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 90vw;
      margin: 0 auto;
      overflow: hidden;
    }
    .${this._clsNames.arrow} {
      display: flex;
      justify-content: center;
      align-items: center;
      width: var(--size_arrows);
      height: var(--size_arrows);
      flex: 0 0 var(--size_arrows);
      text-align: center;
      font-size: var(--size_icon);
      color: var(--color_icon);
      background-color: var(--color_back_arrows);
      border-radius: 50%;
      cursor: pointer;
      user-select: none;
    }
    .${this._clsNames.slides}{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-grow: 1;
      overflow: hidden;
      scroll-behavior: smooth;
    }
    .${this._clsNames.arrow} > span{
      position: relative;
    }
    .${this._clsNames.arrowLeft} > span{
      left: -0.1em;
    }
    .${this._clsNames.arrowRight} > span{
      left: 0.1em;
    }
    `;
  }
}
