import { Collapse } from "./Collapse.cls";
import { CollapseEnum } from "./Collapse.enum";

/**
 * Defines a custom element for CollapseEnum.tag if it does not already exist.
 *
 * @return {void} 
 */
export function j5Collapse() {
  if (!customElements.get(CollapseEnum.tag)) customElements.define(CollapseEnum.tag, Collapse);
}
