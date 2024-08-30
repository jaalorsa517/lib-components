import { CarouselEnum } from "lib/components/carousel/Carousel.enum";
import { CarouselTemplate } from "lib/components/carousel/Carousel.tmp";
import { describe, it, expect } from "vitest";

describe("[CarouselTemplate]", () => {
  const clsNames = {
    root: `${CarouselEnum.tag}`,
    container: `${CarouselEnum.tag}__container`,
    arrow: `${CarouselEnum.tag}__arrow`,
    arrowLeft: `${CarouselEnum.tag}__arrow--left`,
    arrowRight: `${CarouselEnum.tag}__arrow--right`,
    slides: `${CarouselEnum.tag}__slides`,
    slot: `${CarouselEnum.tag}__slot`,
  };

  it("Get styles", () => {
    const style = `
    ${clsNames.root}, :host{
      display: block;
      width: fit-content;
      font-size: 16px;
      --color_back_arrows: #7f7f7f;
      --color_icon: #fff;
      --size_arrows: 1.5em;
      --size_icon: 1.5em;
    }
    .${clsNames.container}{
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 90vw;
      margin: 0 auto;
      overflow: hidden;
    }
    .${clsNames.arrow} {
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
    .${clsNames.slides}{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-grow: 1;
      overflow: hidden;
      scroll-behavior: smooth;
    }
    .${clsNames.arrow} > span{
      position: relative;
    }
    .${clsNames.arrowLeft} > span{
      left: -0.1em;
    }
    .${clsNames.arrowRight} > span{
      left: 0.1em;
    }
    `
    const carouselTemplate = new CarouselTemplate()
    expect(carouselTemplate.getStyle()).toBe(style)
  })

  it("Get classNames", () => {
    const carouselTemplate = new CarouselTemplate()
    expect(carouselTemplate.getClsNames()).toStrictEqual(clsNames)
  })

  it("Get template", () => {
    const template = `
      <div class="${clsNames.container}">
        <div class="${clsNames.arrow} ${clsNames.arrowLeft}">
          <span>&#5176;</span>
        </div>
        <div class="${clsNames.slides}">
          <slot class="${clsNames.slot}"></slot>
        </div>
        <div class="${clsNames.arrow} ${clsNames.arrowRight}">
          <span>&#5171;</span>
        </div>
      </div>
    `
    const carouselTemplate = new CarouselTemplate()
    expect(carouselTemplate.getTemplate()).toBe(template)
  })

})