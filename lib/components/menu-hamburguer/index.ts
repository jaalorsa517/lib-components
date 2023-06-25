import { MenuHamburguer } from "./MenuHamburger.cls";
import { MenuHamburguerEnum } from "./MenuHamburger.enum";

/**
 * Defines and registers the custom element for a menu hamburguer icon if it
 * has not been registered yet.
 *
 * @return {void} 
 */
export function j5MenuHamburguer() {
  if (!customElements.get(MenuHamburguerEnum.tag))
    customElements.define(MenuHamburguerEnum.tag, MenuHamburguer);
}
