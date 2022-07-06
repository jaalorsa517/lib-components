export abstract class Element extends HTMLElement {
  private _shadow: ShadowRoot;
  private _unique: number;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });
    this._unique = Math.round(new Date().getTime() * Math.random());
  }

  getElement(query: string = ""): Element | null {
    return this._shadow.querySelector(query);
  }

  getElements(query: string = ""): NodeListOf<Element> {
    return this._shadow.querySelectorAll(query);
  }
  protected getName() {
    return this.constructor.name;
  }
  protected get shadowDOM(): ShadowRoot {
    return this._shadow;
  }
  protected get unique(): number {
    return this._unique;
  }
  connectedCallback() {
    this.setAttribute("j5-hash", this._unique.toString());
  }
}
