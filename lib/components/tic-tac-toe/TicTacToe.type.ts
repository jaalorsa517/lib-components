import { ElementAttr } from "lib/shared/class/Element.cls";
import { TicTacToeTemplate } from "./TicTacToe.tmp";
import { Player, GameLevel, GameMode } from "./TicTacToe.enum";

export type { Player };
export type { GameMode}
export type { GameLevel };
export type Cell = {
  cell: Player | null;
  winner: boolean;
};
export type Board = Cell[];

export type Score = {
  [P in Player]: number;
} & {
  ties: number;
};

export type TicTacToeServiceType = {
  elementAttr: ElementAttr;
  template: TicTacToeTemplate;
  mode?: GameMode;
  level?: GameLevel;
}

export type TicTacToeTemplateType = {
  root: string;
  container: string;
  score: string;
  scoreItem: string;
  board: string;
  cell: string;
  reset: string;
}
