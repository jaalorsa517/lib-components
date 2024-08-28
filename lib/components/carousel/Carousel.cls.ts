import { CarouselTemplate } from "lib/components/carousel/Carousel.tmp";
import { ElementAttr } from "lib/shared/class/Element.cls";
import { ISwitchObject } from "lib/shared/interfaces";
import { CarouselService } from "lib/components/carousel/Carousel.services";

export class Carousel extends ElementAttr {
  private _templateCls: CarouselTemplate;
  private _carouselService: CarouselService;
  protected _attrs: ISwitchObject;

  static get observedAttributes() {
    return ["count-slides", "*"];
  }

  constructor() {
    super();
    this._templateCls = new CarouselTemplate();
    this._carouselService = new CarouselService({
      elementAttr: this,
      window: window,
      template: this._templateCls
    });
    this._attrs = this._getLogicAttr();
  }

  private _getLogicAttr(): ISwitchObject {
    return {
      "count-slides": this._carouselService.countSlides.bind(this._carouselService),
    };
  }

  connectedCallback(): void {
    this._carouselService.connectedCallback()
  }

  disconnectedCallback(): void {
    this._carouselService.disconnectedCallback()
  }
}
