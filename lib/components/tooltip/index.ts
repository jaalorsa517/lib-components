import { Tooltip } from "./Tooltip.cls";
import { TooltipEnum } from "./Tooltip.enum";

/**
 * Defines a custom element for a J5 tooltip if it has not been defined yet.
 *
 * @return {void} 
 */
export function j5Tooltip() {
  if (!customElements.get(TooltipEnum.tag)) customElements.define(TooltipEnum.tag, Tooltip);
}
