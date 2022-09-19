import { MenuHamburguer } from "./MenuHamburger.cls";
import { MenuHamburguerEnum } from "./MenuHamburger.enum";

export function j5MenuHamburguer() {
  customElements.define(MenuHamburguerEnum.tag, MenuHamburguer);
}
