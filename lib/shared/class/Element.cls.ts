export abstract class Element extends HTMLElement {
  private _shadow: ShadowRoot;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });
  }

  getElement(query: string): Element | null {
    return this._shadow.querySelector(query);
  }

  getElements(query: string): NodeListOf<Element> {
    return this._shadow.querySelectorAll(query);
  }

  protected get shadowDOM(): ShadowRoot {
    return this._shadow;
  }
}
