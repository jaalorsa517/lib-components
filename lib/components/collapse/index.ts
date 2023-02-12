import { Collapse } from "./Collapse.cls";
import { CollapseEnum } from "./Collapse.enum";

export function j5Collapse() {
  customElements.define(CollapseEnum.tag, Collapse);
}
