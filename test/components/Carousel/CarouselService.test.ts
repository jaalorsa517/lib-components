import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { CarouselService } from "lib/components/carousel/Carousel.services";
import { CarouselTemplate } from "lib/components/carousel/Carousel.tmp";
import { CarouselType } from "lib/components/carousel/Carousel.type";
import { ITemplate } from "lib/shared/interfaces/Template.interface";


describe("CarouselService", () => {
  const template: ITemplate<CarouselType> = new CarouselTemplate()

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks();
  })

  it("countSlides debería ser 10", () => {
    const elementAttr = {
      getAttribute: vi.fn().mockReturnValue("10"),
      getElement: vi.fn()
    }
    const constructorCarousel = {
      elementAttr: elementAttr as any,
      window,
      template: template
    }
    const carouselService = new CarouselService(constructorCarousel);
    carouselService.countSlides("10");
    expect(carouselService.getCountSlides).toBe(10);
  })

  it("countSlides debería ser 3 porque no hay valor", () => {
    const elementAttr = {
      getAttribute: vi.fn().mockReturnValue(""),
      getElement: vi.fn().mockImplementation((query: string) => {
        if (query === `slot.${template.getClsNames().slot}`) return {
          assignedElements: vi.fn().mockReturnValueOnce([]),
        }
        return undefined
      }),
      render: vi.fn()
    }
    const constructorCarousel = {
      elementAttr: elementAttr as any,
      window,
      template: template
    }
    const carouselService = new CarouselService(constructorCarousel);
    carouselService.countSlides("");
    expect(carouselService.getCountSlides).toBe(3);
    carouselService.connectedCallback()
    expect(carouselService.getSlides).toBe(undefined);
  })

  it("connectedCallback", () => {
    const elementAttr = {
      getAttribute: vi.fn(),
      getElement: vi.fn().mockImplementation((query: string) => {
        if (query === `slot.${template.getClsNames().slot}`) return {
          assignedElements: vi.fn().mockReturnValueOnce([{}]),
        }
        return undefined
      }),
      render: vi.fn()
    }
    const windowMock: any = {
      ...window,
      getComputedStyle: vi.fn()
        .mockImplementation(() => ({
          marginRight: "10px",
          marginLeft: "10px",
          width: "200px"
        })),
    }
    const constructorCarousel = {
      elementAttr: elementAttr as any,
      window: windowMock,
      template: template
    }
    const carouselService = new CarouselService(constructorCarousel);
    carouselService.connectedCallback();
    expect(carouselService.getSlides).toBe(undefined);
    expect(elementAttr.getAttribute).toBeCalled();
  })

  it("connectedCallBack activando auto transicion", () => {
    const elementAttr = {
      getAttribute: vi.fn().mockImplementation((attr: string) => {
        if (attr === "count-slides") return "3"
        if (attr === "transition-auto") return "100"
        return undefined
      }),
      getElement: vi.fn().mockImplementation((query: string) => {
        if (query === `.${template.getClsNames().slides}`) return {
          scrollLeft: 1,
          scrollWidth: 800,
          clientWidth: 220
        }
        if (query === `slot.${template.getClsNames().slot}`) return {
          assignedElements: vi.fn().mockReturnValueOnce([
            {}, {}, {}, {}
          ]),
          parentElement: {
            style: {
              width: ""
            }
          }
        }
        return undefined
      }),
      render: vi.fn()
    }
    const windowMock: any = {
      ...window,
      getComputedStyle: vi.fn()
        .mockImplementation(() => ({
          marginRight: "10px",
          marginLeft: "10px",
          width: "200px"
        })),
      clearInterval: vi.fn()
    }
    const constructorCarousel = {
      elementAttr: elementAttr as any,
      window: windowMock,
      template: template
    }
    const carouselService = new CarouselService(constructorCarousel);
    carouselService.connectedCallback();
    vi.advanceTimersToNextTimer()
    expect(carouselService.getSlides.scrollLeft).toBe(220);
    expect(elementAttr.getAttribute).toBeCalledWith("transition-auto");
    expect(carouselService.getSetInterval).not.toBe(undefined);
    vi.advanceTimersToNextTimer()
    expect(carouselService.getSlides.scrollLeft).toBe(440);
    vi.advanceTimersToNextTimer()
    expect(carouselService.getSlides.scrollLeft).toBe(660);
    vi.advanceTimersToNextTimer()
    expect(carouselService.getSlides.scrollLeft).toBe(0);
    carouselService.disconnectedCallback()
    expect(windowMock.clearInterval).toBeCalled();
  })

  it("Montar y desomontar evento click moveRight", () => {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    const elementAttr = {
      getAttribute: vi.fn(),
      getElement: vi.fn().mockImplementation((query: string) => {
        if (query === `.${template.getClsNames().arrowRight}`) return {
          addEventListener,
          removeEventListener
        }
        return undefined
      }),
      render: vi.fn()
    }
    const window: any = {
      getComputedStyle: vi.fn()
        .mockImplementation(() => ({
          marginRight: "10px",
          marginLeft: "10px",
          width: "200px"
        }))
    }
    const constructorCarousel = {
      elementAttr: elementAttr as any,
      window,
      template: template
    }
    const carouselService = new CarouselService(constructorCarousel);
    carouselService.connectedCallback();
    expect(addEventListener).toBeCalled();
    carouselService.disconnectedCallback();
    expect(removeEventListener).toBeCalled();
  })

  it("Evento click y moveLeft metodo", () => {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    const elementAttr = {
      getAttribute: vi.fn(),
      getElement: vi.fn().mockImplementation((query: string) => {
        if (query === `.${template.getClsNames().arrowLeft}`) return {
          addEventListener,
          removeEventListener
        }
        if (query === `slot.${template.getClsNames().slot}`) return {
          assignedElements: vi.fn().mockReturnValueOnce([
            {}, {}, {}, {}
          ]),
          parentElement: {
            style: {
              width: ""
            }
          }
        }
        if (query === `.${template.getClsNames().slides}`) return {
          scrollLeft: 1,
          scrollWidth: 800,
          clientWidth: 220
        }
        return undefined
      }),
      render: vi.fn()
    }
    const window: any = {
      getComputedStyle: vi.fn()
        .mockImplementation(() => ({
          marginRight: "10px",
          marginLeft: "10px",
          width: "200px"
        }))
    }

    const constructorCarousel = {
      elementAttr: elementAttr as any,
      window,
      template: template
    }
    const carouselService = new CarouselService(constructorCarousel);
    carouselService.connectedCallback();
    expect(addEventListener).toBeCalled();
    carouselService.moveLeft();
    expect(carouselService.getSlides.scrollLeft).toBe(-220);
    carouselService.moveLeft();
    expect(carouselService.getSlides.scrollLeft).toBe(580);
    carouselService.moveLeft();
    expect(carouselService.getSlides.scrollLeft).toBe(220);
    carouselService.moveLeft();
    expect(carouselService.getSlides.scrollLeft).toBe(0);
    carouselService.moveLeft();
    expect(carouselService.getSlides.scrollLeft).toBe(580);
    carouselService.disconnectedCallback();
    expect(removeEventListener).toBeCalled();
  })
})