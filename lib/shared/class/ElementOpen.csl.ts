import { BaseElement } from "lib/shared/class/BaseElement.cls";
import { Attributes } from "lib/shared/enums";
import { ISwitchObject } from "lib/shared/interfaces";
import { renderDomOpen } from "lib/shared/utils";

export abstract class ElementOpen extends BaseElement {
  constructor() {
    super();
  }
  private _renderComponent(cb: Function | undefined) {
    renderDomOpen(this);
    if (cb) cb();
  }

  protected render(cb: Function = () => {}) {
    const hash = this.getAttribute(Attributes.hash);
    if (!hash) {
      this._renderComponent(cb);
    }
  }

  getElement(query: string = ""): Element | null {
    return this.querySelector(query);
  }

  getElements(query: string = ""): NodeListOf<Element> {
    return this.querySelectorAll(query);
  }
}

export abstract class ElementOpenAttr extends ElementOpen {
  protected abstract _attrs: ISwitchObject;

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) this._attrs[name](newValue);
  }
}
