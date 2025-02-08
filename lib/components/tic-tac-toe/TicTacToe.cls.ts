import { ElementAttr } from "lib/shared/class/Element.cls";
import { TicTacToeService } from "./TicTacToe.services";
import { TicTacToeTemplate } from "./TicTacToe.tmp";
import { GameLevel, GameMode } from "./TicTacToe.type";
import { ISwitchObject } from "lib/shared/interfaces";

export class TicTacToe extends ElementAttr {
  private readonly _templateCls: TicTacToeTemplate;
  private readonly _ticTacToeService: TicTacToeService;
  protected _attrs: ISwitchObject;

  static get observedAttributes(): string[] {
    return ['mode', 'level'];
  }

  constructor() {
    super();
    this._templateCls = new TicTacToeTemplate();
    this._ticTacToeService = new TicTacToeService({ 
      elementAttr: this,
      template: this._templateCls,
      window,
      mode: this.getAttribute('mode') as GameMode || 'cpu',
      level: this.getAttribute('level') as GameLevel || 'medium'
    });
    this._attrs = this._getLogicAttr();
  }

  private _getLogicAttr(): ISwitchObject {
    return {
      mode: (value: string) => this._ticTacToeService.handleModeChange(value as GameMode),
      level: (value: string) => this._ticTacToeService.handleLevelChange(value as GameLevel)
    };
  }

  connectedCallback(): void {
    this.render(() => {
      this._addEventListeners();
    });
  }

  disconnectedCallback(): void {
    this._removeEventListeners();
  }

  private _addEventListeners(): void {
    const cells = this.getElements(`.${this._templateCls.getClsNames().cell}`);
    const resetButton = this.getElement(`.${this._templateCls.getClsNames().reset}`);

    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => this._ticTacToeService.handleCellClick(index));
    });

    if (resetButton) {
      resetButton.addEventListener('click', () => this._ticTacToeService.handleReset());
    }
  }

  private _removeEventListeners(): void {
    const cells = this.getElements(`.${this._templateCls.getClsNames().cell}`);
    const resetButton = this.getElement(`.${this._templateCls.getClsNames().reset}`);

    cells.forEach(cell => {
      cell.replaceWith(cell.cloneNode(true));
    });

    if (resetButton) {
      resetButton.replaceWith(resetButton.cloneNode(true));
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue) return;

    if (this._attrs[name]) {
      this._attrs[name](newValue);
    }
  }
}