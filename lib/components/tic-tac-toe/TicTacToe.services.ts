import { ElementAttr } from "lib/shared/class/Element.cls";
import { TicTacToeTemplate } from "./TicTacToe.tmp";
import { Board } from "./TicTacToe.type";
import { GameMode, GameStatus, Player, GameLevel } from "./TicTacToe.enum";

export class TicTacToeService {
  private readonly _elementAttr: ElementAttr;
  private readonly _template: TicTacToeTemplate;
  private readonly _window: Window;
  private readonly board: Board = Array(9).fill(null).map(() => ({ cell: null, winner: false }));
  private readonly score = { [Player.X]: 0, [Player.O]: 0, ties: 0 };
  private readonly winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  private readonly gameLevelProbabilities = {
    winning: { 
      [GameLevel.EASY]: 0.5, 
      [GameLevel.MEDIUM]: 0.8, 
      [GameLevel.HARD]: 1 
    },
    blocking: { 
      [GameLevel.EASY]: 0.3, 
      [GameLevel.MEDIUM]: 0.7, 
      [GameLevel.HARD]: 1 
    },
    strategic: { 
      [GameLevel.EASY]: 0.5, 
      [GameLevel.MEDIUM]: 0.8, 
      [GameLevel.HARD]: 1 
    },
    random: { 
      [GameLevel.EASY]: 0.7, 
      [GameLevel.MEDIUM]: 0.4, 
      [GameLevel.HARD]: 0 
    }
  };

  private currentPlayer: Player = Player.X;
  private gameMode: GameMode = GameMode.HUMAN;
  private gameLevel: GameLevel = GameLevel.EASY;
  private gameStatus: GameStatus = GameStatus.PLAYING;
  private timeoutId: number | null = null;
  private shouldCPUStart = false;

  constructor({ elementAttr, template, window, mode = GameMode.HUMAN, level = GameLevel.EASY }: {
    elementAttr: ElementAttr;
    template: TicTacToeTemplate;
    window: Window;
    mode?: GameMode;
    level?: GameLevel;
  }) {
    this._elementAttr = elementAttr;
    this._template = template;
    this._window = window;
    this.gameMode = mode;
    this.gameLevel = level;
  }

  handleCellClick(index: number): void {
    if (!this.isValidMove(index)) return;

    this._makeMove(index);
    this.scheduleCPUMove();
  }

  handleModeChange(mode: GameMode): void {
    if (this.gameMode === mode) return;
    this._clearTimeout();
    this.gameMode = mode;
    this._resetScore();
    this.handleReset();
  }

  handleLevelChange(level: GameLevel): void {
    if (this.gameLevel === level) return;
    const cpuShouldStart = this.shouldCPUStart;
    this._clearTimeout();
    this.gameLevel = level;
    this.shouldCPUStart = cpuShouldStart;
    this._resetScore();
    this.handleReset();
  }

  handleReset(): void {
    this._clearTimeout();
    this.resetGameState();
    this.setInitialPlayer();
    this._updateUI();
  }

  private isValidMove(index: number): boolean {
    return this.gameStatus === GameStatus.PLAYING &&
           !this.board[index].cell &&
           !(this.gameMode === GameMode.CPU && this.currentPlayer === Player.O);
  }

  private resetGameState(): void {
    this.gameStatus = GameStatus.PLAYING;
    this.board.forEach(cell => {
      cell.cell = null;
      cell.winner = false;
    });
  }

  private setInitialPlayer(): void {
    if (this.gameMode !== GameMode.CPU) {
      this.currentPlayer = Player.X;
      return;
    }

    this.currentPlayer = this.shouldCPUStart ? Player.O : Player.X;
    this.shouldCPUStart = !this.shouldCPUStart;
    
    if (this.currentPlayer === Player.O) {
      this.timeoutId = this._window.setTimeout(() => this._makeCPUMove(), 500);
    }
  }

  private scheduleCPUMove(): void {
    if (
      this.gameStatus !== GameStatus.PLAYING || 
      this.gameMode !== GameMode.CPU ||
      this.currentPlayer !== Player.O
    ) return;
    
    this._clearTimeout();
    this.timeoutId = this._window.setTimeout(() => this._makeCPUMove(), 500);
  }

  private _makeMove(index: number): void {
    this.board[index].cell = this.currentPlayer;

    const winningLine = this._checkWin();
    if (winningLine) {
      this.handleWin(winningLine);
      return;
    }

    if (this._checkTie()) {
      this.handleTie();
      return;
    }

    this.switchPlayer();
    this._updateUI();
  }

  private handleWin(winningLine: number[]): void {
    this.gameStatus = GameStatus.WIN;
    this.score[this.currentPlayer]++;
    winningLine.forEach(idx => this.board[idx].winner = true);
    this._updateUI(winningLine);
  }

  private handleTie(): void {
    this.gameStatus = GameStatus.TIE;
    this.score.ties++;
    this._updateUI();
  }

  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
  }

  private _makeCPUMove(): void {
    const availableMoves = this.board
      .map((cell, index) => cell.cell ? -1 : index)
      .filter(index => index !== -1);

    if (!availableMoves.length) return;

    const moveIndex = this._getBestMove(availableMoves);
    if (moveIndex === -1 || !availableMoves.includes(moveIndex)) return;
    
    this._makeMove(moveIndex);
  }

  private _getBestMove(availableMoves: number[]): number {
    if (!availableMoves.length) return -1;

    const randomThreshold = this.gameLevelProbabilities.random[this.gameLevel] ?? 0;
    if (Math.random() < randomThreshold) {
      return this._getRandomMove(availableMoves);
    }

    const moves = [
      () => this.tryMove('winning'),
      () => this.tryMove('blocking'),
      () => this.tryStrategicMove(availableMoves),
      () => this._getRandomMove(availableMoves)
    ];

    for (const move of moves) {
      const result = move();
      if (result !== -1) return result;
    }

    return this._getRandomMove(availableMoves);
  }

  private tryMove(type: 'winning' | 'blocking'): number {
    const probability = this.gameLevelProbabilities[type][this.gameLevel] ?? 1;
    if (Math.random() >= probability) return -1;

    return this._findWinningMove(type === 'winning' ? Player.O : Player.X);
  }

  private tryStrategicMove(availableMoves: number[]): number {
    const probability = this.gameLevelProbabilities.strategic[this.gameLevel] ?? 1;
    if (Math.random() >= probability) return -1;

    // Si el centro está disponible, tomarlo
    if (availableMoves.includes(4)) return 4;

    // Si el centro está ocupado, elegir una esquina aleatoria disponible
    const corners = [0, 2, 6, 8].filter(corner => availableMoves.includes(corner));
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    return -1;
  }

  private _getRandomMove(moves: number[]): number {
    if (!moves.length) return -1;
    return moves[Math.floor(Math.random() * moves.length)];
  }

  private _findWinningMove(player: Player): number {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i].cell) continue;
      
      // Simular el movimiento
      const tempCell = this.board[i].cell;
      this.board[i].cell = player;
      
      // Verificar si es un movimiento ganador
      const isWinning = this._checkWin() !== null;
      
      // Revertir el movimiento
      this.board[i].cell = tempCell;
      
      if (isWinning) return i;
    }
    return -1;
  }

  private _checkWin(): number[] | null {
    for (const [a, b, c] of this.winPatterns) {
      if (!this.board[a].cell) continue;
      
      const cellA = this.board[a].cell;
      const cellB = this.board[b].cell;
      const cellC = this.board[c].cell;

      if (cellA && cellA === cellB && cellA === cellC) {
        return [a, b, c];
      }
    }
    return null;
  }

  private _checkTie(): boolean {
    return this.board.every(cell => cell.cell !== null);
  }

  private _updateUI(winningLine?: number[]): void {
    const root = this._elementAttr.shadowRoot;
    if (!root) return;

    this.updateCells(root, winningLine);
    this.updateScore(root);
  }

  private updateCells(root: ShadowRoot, winningLine?: number[]): void {
    this.board.forEach((cell, index) => {
      const cellElement = root.querySelector(`[data-index="${index}"]`) as HTMLElement;
      if (!cellElement) return;

      const newValue = cell.cell ?? "";
      const currentValue = cellElement.textContent?.trim() ?? "";
      
      if (newValue !== currentValue) {
        this.animateCell(cellElement, currentValue, newValue);
      }

      this.updateCellWinnerState(cellElement, cell.winner || (winningLine?.includes(index) ?? false));
    });
  }

  private updateCellWinnerState(cell: HTMLElement, isWinner: boolean): void {
    if (isWinner) {
      cell.classList.add("winner");
      return;
    }
    cell.classList.remove("winner");
  }

  private animateCell(cell: HTMLElement, currentValue: string, newValue: string): void {
    const startTime = performance.now();
    const duration = 300;
    const computedStyle = this._window.getComputedStyle(cell);
    const currentFontSize = parseFloat(computedStyle.fontSize);

    const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = easeInOut(progress);

      if (!currentValue) {
        this.animateEnter(cell, newValue, currentFontSize);
        return;
      }

      cell.textContent = currentValue;
      cell.style.fontSize = `${currentFontSize - (eased * currentFontSize * 0.7)}px`;

      if (progress < 1) {
        this._window.requestAnimationFrame(animate);
        return;
      }

      if (newValue) {
        this.animateEnter(cell, newValue, currentFontSize);
      } else {
        cell.textContent = '';
        cell.style.fontSize = '';
      }
    };

    this._window.requestAnimationFrame(animate);
  }

  private animateEnter(cell: HTMLElement, value: string, fontSize: number): void {
    const startTime = performance.now();
    const duration = 300;

    const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = easeInOut(progress);

      cell.textContent = value;
      cell.style.fontSize = `${(fontSize * 0.3) + (eased * fontSize * 0.7)}px`;

      if (progress < 1) {
        this._window.requestAnimationFrame(animate);
        return;
      }

      cell.style.fontSize = '';
    };

    this._window.requestAnimationFrame(animate);
  }

  private updateScore(root: ShadowRoot): void {
    Object.entries(this.score).forEach(([key, value]) => {
      const scoreElement = root.querySelector(
        `.${this._template.getClsNames().scoreItem} [data-score="${key}"]`
      );
      if (!scoreElement) return;
      
      scoreElement.textContent = value.toString();
      
      const container = scoreElement.closest(`.${this._template.getClsNames().scoreItem}`);
      if (!container) return;
      
      this.updateScoreCurrentState(container, key === this.currentPlayer);
    });
  }

  private updateScoreCurrentState(container: Element, isCurrent: boolean): void {
    if (this.gameStatus !== GameStatus.PLAYING) {
      container.classList.remove("current");
      return;
    }

    if (isCurrent) {
      container.classList.add("current");
      return;
    }
    container.classList.remove("current");
  }

  private _resetScore(): void {
    this.score[Player.X] = 0;
    this.score[Player.O] = 0;
    this.score.ties = 0;
  }

  private _clearTimeout(): void {
    if (this.timeoutId !== null) {
      this._window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
