import { BaseElement } from "lib/shared/class/BaseElement.cls";

export abstract class ElementOpen extends BaseElement {
  constructor() {
    super();
  }
  getElement(query: string = ""): Element | null {
    return this.querySelector(query);
  }

  getElements(query: string = ""): NodeListOf<Element> {
    return this.querySelectorAll(query);
  }
}
