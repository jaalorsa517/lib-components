import { Carousel } from "lib/components/carousel/Carousel.cls";
import { CarouselEnum } from "lib/components/carousel/Carousel.enum";

export function j5Carousel() {
  customElements.define(CarouselEnum.tag, Carousel);
}
