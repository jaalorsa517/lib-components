export abstract class BaseElement extends HTMLElement {
  private _unique: number;

  constructor() {
    super();
    this._unique = Math.round(new Date().getTime() * Math.random());
  }
  protected getName() {
    return this.constructor.name;
  }
  connectedCallback() {
    this.setAttribute("j5-hash", this._unique.toString());
  }
}
