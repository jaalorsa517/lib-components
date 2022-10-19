import { BaseElement } from "lib/shared/class/BaseElement.cls";

export abstract class Element extends BaseElement {
  private _shadow: ShadowRoot;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });
  }

  getElement(query: string = ""): Element | null {
    return this._shadow.querySelector(query);
  }

  getElements(query: string = ""): NodeListOf<Element> {
    return this._shadow.querySelectorAll(query);
  }

  protected get shadowDOM(): ShadowRoot {
    return this._shadow;
  }
}
