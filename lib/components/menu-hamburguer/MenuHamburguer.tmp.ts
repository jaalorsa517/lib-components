import { Template } from "lib/shared/class/Template.cls";
import { Regex } from "lib/shared/constantes/regex.constantes";
import { IMenuHamburguer } from "./IMenuHamburguer";
import { MenuHamburguerEnum } from "./MenuHamburger.enum";

export class MenuHamburguerTemplate extends Template {
  private _clsNames: IMenuHamburguer;
  private _template: string;
  private _style: string;
  private _transition: string;
  private _propTime: number = 0;
  private _left: string = "";
  private _right: string = "";
  private _opacity: string = "";

  constructor(animation: string) {
    super();
    this._transition = this._getTransition(animation);
    this._clsNames = this._getClsNames();
    this._template = this._getTemplate();
    this._style = this._getStyle();
  }

  get clsNames(): IMenuHamburguer {
    return this._clsNames;
  }
  get template(): string {
    return this._template;
  }
  get style(): string {
    return this._style;
  }

  private _getTransition(prop: string): string {
    if (prop.includes("left")) this._left = "100%";
    else if (prop.includes("right")) this._right = "100%";
    else this._opacity = "0";

    const optionsTransition: string[] = prop.split(" ");
    const findNumber: string = optionsTransition.find((option) => option.match(Regex.FLOAT)) || "";
    if (findNumber && !this._propTime) {
      let _time: number = Number(findNumber.match(Regex.FLOAT)?.at(0));
      if (Regex.IS_SECOND.test(findNumber)) _time = _time * 1000;
      this._propTime = _time || 0;
      return prop;
    }

    this._propTime = 600;
    if (prop === "unset") return prop;
    return `${prop} ${this._propTime}ms ease-in-out`;
  }

  private _getClsNames(): IMenuHamburguer {
    return {
      root: MenuHamburguerEnum.tag,
      container: `${MenuHamburguerEnum.tag}__container`,
      menu: `${MenuHamburguerEnum.tag}__menu`,
      line: `${MenuHamburguerEnum.tag}__line`,
      lineUno: `${MenuHamburguerEnum.tag}__line--uno`,
      lineDos: `${MenuHamburguerEnum.tag}__line--dos`,
      lineTres: `${MenuHamburguerEnum.tag}__line--tres`,
      containeChild: `${MenuHamburguerEnum.tag}__containerChild`,
    };
  }

  private _getTemplate(): string {
    return `
      <div class="${this._clsNames.container}">
        <div class="${this._clsNames.menu}">
          <div class="${this._clsNames.line} ${this._clsNames.lineUno}"></div>
          <div class="${this._clsNames.line} ${this._clsNames.lineDos}"></div>
          <div class="${this._clsNames.line} ${this._clsNames.lineTres}"></div>
        </div>
        <div class="${this._clsNames.containeChild}">
          <slot></slot>
        </div>
      </div>
    `;
  }

  private _getStyle(): string {
    return `
      ${this._clsNames.root}, :host{
        display: block;
        font-size: 10px;
        --color: #215376;
        --colorActive: #215376;
        --menuPositionTop: 0;
        --menuPositionRight: ${this._getRight()};
        --menuPositionLeft: ${this._getLeft()};
        --menuBackground: #fff;
        --menuWidth: 100vw;
        --menuHeight: 100vh;
        --menuZIndex: 1000;
      }
      
      .${this._clsNames.menu} {
        cursor: pointer;
        position: relative;
        z-index: calc(var(--menuZIndex) + 1);
      }

      .${this._clsNames.line} {
        height: .4em;
        width: 3em;
        background-color: var(--color);
        margin: .3em 0;
        cursor: pointer;
        transition: transform ${this._propTime}ms ease-in-out, background-color ${
      this._propTime * 1.35
    }ms ease-in-out;
      }

      .${this._clsNames.line}.active {
        background-color: var(--colorActive);
      }

      .${this._clsNames.lineDos} {
        transition: opacity ${this._propTime / 2}ms ${this._propTime / 3}ms ease-in-out;
      }
      .${this._clsNames.lineDos}.active {
        transition: opacity ${this._propTime / 2}ms ease-in-out;
      }

      .${this._clsNames.menu}.active .${this._clsNames.lineUno} {
        transform: rotate(-45deg) translate(-25%, 50%);
      }
      .${this._clsNames.menu}.active .${this._clsNames.lineDos} {
        opacity: 0;
      }
      .${this._clsNames.menu}.active .${this._clsNames.lineTres} {
        transform: rotate(45deg) translate(-25%, -55%);
      }
      .${this._clsNames.menu}.active + .${this._clsNames.containeChild}{
        z-index: var(--menuZIndex);
      }
      .${this._clsNames.containeChild}{
        width: var(--menuWidth);
        height: var(--menuHeight);
        position: fixed;
        top: var(--menuPositionTop);
        left: var(--menuPositionLeft);
        right: var(--menuPositionRight);
        font-size: 1rem;
        background-color: var(--menuBackground);
        z-index: -1;
        opacity: ${this._opacity || "1"};
        transition: ${this._transition};
      }
      .animation-in{
        ${this._getAnimationIn()}
      }
      .animation-out{
        ${this._getAnimationOut()}
      }
    `;
  }

  private _getAnimationIn(): string {
    if (this._left) return `left: 0;`;
    if (this._right) return `right: 0;`;
    return `opacity: 1;`;
  }

  private _getAnimationOut(): string {
    if (this._left) return `left: 100%;`;
    if (this._right) return `right: 100%;`;
    return `opacity: 0;`;
  }

  private _getRight(): string {
    if (this._left) return "unset";
    return "100%";
  }

  private _getLeft(): string {
    if (this._right) return "unset";
    if (this._opacity) return "0";
    return "100%";
  }
}
