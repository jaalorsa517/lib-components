import { BaseElement } from "lib/shared/class/BaseElement.cls";
import { Attributes } from "lib/shared/enums";
import { ISwitchObject } from "lib/shared/interfaces";
import { renderDom } from "lib/shared/utils";

export abstract class Element extends BaseElement {
  private _shadow: ShadowRoot;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });
  }

  private _renderComponent(cb: Function | undefined) {
    renderDom(this);
    if (cb) cb();
  }

  protected render(cb: Function = () => {}) {
    const hash = this.getAttribute(Attributes.hash);
    if (!hash) {
      this._renderComponent(cb);
    }
  }

  protected get shadowDOM(): ShadowRoot {
    return this._shadow;
  }

  getElement(query: string = ""): Element | null {
    return this._shadow.querySelector(query);
  }

  getElements(query: string = ""): NodeListOf<Element> {
    return this._shadow.querySelectorAll(query);
  }
}

export abstract class ElementAttr extends Element {
  protected abstract _attrs: ISwitchObject;

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) this._attrs[name](newValue);
  }
}
