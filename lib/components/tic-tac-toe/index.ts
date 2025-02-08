import { TicTacToe } from "./TicTacToe.cls";
import { j5TicTacToeEnum } from "./TicTacToe.enum";

/**
 * Defines a custom element for the TicTacToe class if it does not already exist.
 *
 * @return {void} Nothing is returned by this function.
 */
export function j5TicTacToe() {
  if (!customElements.get(j5TicTacToeEnum.tag))
    customElements.define(j5TicTacToeEnum.tag, TicTacToe);
}
