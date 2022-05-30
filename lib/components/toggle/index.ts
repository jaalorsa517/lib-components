import { Toggle } from "./Toggle.cls";
import { ToggleEnum } from "./Toggle.enum";

export function j5Toggle() {
  customElements.define(ToggleEnum.tag, Toggle);
}
