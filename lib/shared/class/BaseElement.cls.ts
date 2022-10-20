export abstract class BaseElement extends HTMLElement {
  constructor() {
    super();
  }
  protected getName() {
    return this.constructor.name;
  }
}
