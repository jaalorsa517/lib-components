import { Carousel } from "lib/components/carousel/Carousel.cls";
import { CarouselEnum } from "lib/components/carousel/Carousel.enum";

/**
 * Defines a custom element for a j5Carousel if one does not exist.
 *
 * @return {void} There is no return value.
 */
export function j5Carousel() {
  if (!customElements.get(CarouselEnum.tag)) customElements.define(CarouselEnum.tag, Carousel);
}
