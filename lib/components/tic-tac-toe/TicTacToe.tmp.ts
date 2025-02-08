import { j5TicTacToeEnum } from "lib/components/tic-tac-toe/TicTacToe.enum";
import { ITemplate } from "lib/shared/interfaces/Template.interface";
import { TicTacToeTemplateType } from "lib/components/tic-tac-toe/TicTacToe.type";

export class TicTacToeTemplate implements ITemplate<TicTacToeTemplateType> {
  private readonly _clsNames: TicTacToeTemplateType = {
    root: `${j5TicTacToeEnum.tag}`,
    container: `${j5TicTacToeEnum.tag}__container`,
    score: `${j5TicTacToeEnum.tag}__score`,
    scoreItem: `${j5TicTacToeEnum.tag}__scoreItem`,
    board: `${j5TicTacToeEnum.tag}__board`,
    cell: `${j5TicTacToeEnum.tag}__cell`,
    reset: `${j5TicTacToeEnum.tag}__reset`
  };

  private readonly _template: string;
  private readonly _style: string;

  constructor() {
    this._template = this._getTemplate();
    this._style = this._getStyle();
  }

  public getClsNames(): TicTacToeTemplateType {
    return this._clsNames;
  }

  getTemplate(): string {
    return this._template;
  }

  getStyle(): string {
    return this._style;
  }

  private _getTemplate(): string {
    const cls = this._clsNames;
    return `
      <div class="${cls.container}">
        <div class="${cls.score}">
          <div class="${cls.scoreItem} current">
            <b>Jugador X</b>
            <span data-score="X">0</span>
          </div>
          <div class="${cls.scoreItem}">
            <b>Empates</b>
            <span data-score="ties">0</span>
          </div>
          <div class="${cls.scoreItem}">
            <b>Jugador O</b>
            <span data-score="O">0</span>
          </div>
        </div>
        <div class="${cls.board}">
          ${Array(9).fill('').map((_, i) => `
            <button class="${cls.cell}" data-index="${i}"></button>
          `).join('')}
        </div>
        <button class="${cls.reset}">Reiniciar</button>
      </div>
    `;
  }

  private _getStyle(): string {
    const cls = this._clsNames;
    return `
      .${cls.root}, :host{
        --color-cell-winner: #438c40;
        --color-cell-font-winner: #dfeedc;
        --color-cell-background: #fff;
        --color-border: #ccc;
        --color-cell-font: #252525;
        --color-reset: #f44336;
        --color-reset-hover: #d32f2f;
        --cell-gap: 8px;
        display: block;
      }

      .${cls.container} {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        color: var(--color-font);
      }

      .${cls.score} {
        display: flex;
        justify-content: center;
        gap: 1em;
      }

      .${cls.scoreItem} {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.1em;
        transition: color 0.3s ease, transform 0.3s ease;
      }

      .${cls.scoreItem} span {
        transition: all 0.3s ease;
      }

      .${cls.scoreItem}.current {
        color: var(--color-cell-winner);
        font-weight: bold;
        transform: scale(1.1);
      }

      .${cls.board} {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--cell-gap);
        aspect-ratio: 1;
      }

      .${cls.cell} {
        appearance: none;
        border: 1px solid var(--color-border);
        background-color: var(--color-cell-background);
        font-size: 2em;
        color: var(--color-cell-font);
        cursor: pointer;
        aspect-ratio: 1;
        transition: background-color 0.3s ease, color 0.3s ease;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .${cls.cell} span {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .${cls.cell}.winner {
        background-color: var(--color-cell-winner);
        color: var(--color-cell-font-winner);
      }

      .${cls.reset} {
        padding: 0.5em 1em;
        font-size: 1em;
        cursor: pointer;
        background-color: var(--color-reset);
        color: var(--color-reset-font);
        border: none;
        border-radius: 4px;
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      .${cls.reset}:hover {
        background-color: var(--color-reset-hover);
      }
    `;
  }
}
