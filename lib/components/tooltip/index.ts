import { Tooltip } from "./Tooltip.cls";
import { TooltipEnum } from "./Tooltip.enum";

export function j5Tooltip() {
  customElements.define(TooltipEnum.tag, Tooltip);
}
