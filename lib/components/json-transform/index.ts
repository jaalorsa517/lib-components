import { JsonTransform } from "./JsonTransform.cls";
import { JsonTransformEnum } from "./JsonTransform.enum";

/**
 * Defines a custom element for the JsonTransform class if it does not already exist.
 *
 * @return {void} Nothing is returned by this function.
 */
export function j5JsonTransform() {
  if (!customElements.get(JsonTransformEnum.tag)) customElements.define(JsonTransformEnum.tag, JsonTransform);
}
