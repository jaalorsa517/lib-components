import { Toggle } from "./Toggle.cls";
import { ToggleEnum } from "./Toggle.enum";

/**
 * Defines a custom element for the Toggle class if it does not exist.
 *
 * @return {void} 
 */
export function j5Toggle() {
  if (!customElements.get(ToggleEnum.tag)) customElements.define(ToggleEnum.tag, Toggle);
}
