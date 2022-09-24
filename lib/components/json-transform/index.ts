import { JsonTransform } from "./JsonTransform.cls";
import { JsonTransformEnum } from "./JsonTransform.enum";

export function j5JsonTransform() {
  customElements.define(JsonTransformEnum.tag, JsonTransform);
}
