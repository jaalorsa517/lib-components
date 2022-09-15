import { MenuHamburguer } from "./MenuHamburger.cls";
import { MenuHamburguerEnum } from "./MenuHamburger.enum";

export function j5Tooltip() {
  customElements.define(MenuHamburguerEnum.tag, MenuHamburguer);
}
