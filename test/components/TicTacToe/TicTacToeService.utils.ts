import { vi, expect } from "vitest";
import { TicTacToeService } from "lib/components/tic-tac-toe/TicTacToe.services";
import { TicTacToeTemplate } from "lib/components/tic-tac-toe/TicTacToe.tmp";
import {
  GameLevel,
  GameMode,
  GameStatus,
  Player,
} from "lib/components/tic-tac-toe/TicTacToe.enum";
import { ElementAttr } from "lib/shared/class/Element.cls";

export class TicTacToeBuilder {
  private readonly mockElement = {
    classList: { add: vi.fn(), remove: vi.fn() },
    closest: vi
      .fn()
      .mockReturnValue({ classList: { add: vi.fn(), remove: vi.fn() } }),
    textContent: "",
    style: { fontSize: "" },
    querySelector: vi
      .fn()
      .mockReturnValue({ classList: { add: vi.fn(), remove: vi.fn() } }),
    querySelectorAll: vi
      .fn()
      .mockReturnValue([{ classList: { add: vi.fn(), remove: vi.fn() } }]),
  } as const;

  private readonly mockWindow = {
    setTimeout: vi.fn(),
    clearTimeout: vi.fn(),
    getComputedStyle: vi.fn().mockReturnValue({ fontSize: "16px" }),
    requestAnimationFrame: vi.fn((callback) => {
      if (this.animationFrameId > 10) return 0;
      this.animationFrameId++;
      callback(this.animationFrameId * 1000);
      return this.animationFrameId;
    }),
    performance: {
      now: vi.fn().mockReturnValue(0),
    },
  } as const;

  private animationFrameId = 0;
  private service: any;
  private readonly elementAttr = {
    getAttribute: vi.fn(),
    getElement: vi.fn().mockReturnValue(this.mockElement),
    getElements: vi.fn().mockReturnValue(
      Array(9)
        .fill(null)
        .map(() => ({ ...this.mockElement }))
    ),
    shadowRoot: {
      querySelector: vi.fn().mockReturnValue(this.mockElement),
      querySelectorAll: vi.fn(),
    },
    render: vi.fn(),
  } as const;

  constructor() {
    this.service = new TicTacToeService({
      elementAttr: this.elementAttr as any,
      template: new TicTacToeTemplate(),
      window: this.mockWindow as any,
    }) as any;
  }

  withGameMode(mode: GameMode): this {
    this.service["gameMode"] = mode;
    return this;
  }

  withGameLevel(level: GameLevel): this {
    this.service["gameLevel"] = level;
    return this;
  }

  withGameStatus(status: GameStatus): this {
    this.service["gameStatus"] = status;
    return this;
  }

  withCurrentPlayer(player: Player): this {
    this.service["currentPlayer"] = player;
    return this;
  }

  withBoard(board: (Player | null)[]): this {
    const fullBoard = Array(9).fill(null);
    board.forEach((cell, index) => {
      if (index < 9) fullBoard[index] = cell;
    });

    this.service["board"] = fullBoard.map((cell) => ({
      cell,
      winner: false,
    }));

    return this;
  }

  withTimeoutId(id: number | null): this {
    this.service["timeoutId"] = id as never;
    return this;
  }

  withShouldCPUStart(should: boolean): this {
    this.service["shouldCPUStart"] = should as never;
    return this;
  }

  withMockRandom(value: number): this {
    vi.spyOn(global.Math, "random").mockReturnValue(value);
    return this;
  }

  build(): {
    service: any;
    element: any;
    elementAttr: any;
    window: any;
  } {
    return {
      service: this.service,
      element: this.mockElement,
      elementAttr: this.elementAttr,
      window: this.mockWindow,
    } as const;
  }

  reset(): this {
    vi.clearAllMocks();
    this.service = new TicTacToeService({
      elementAttr: this.elementAttr as any,
      template: new TicTacToeTemplate(),
      window: this.mockWindow as any,
    }) as any;

    this.service["board"] = Array(9)
      .fill(null)
      .map(() => ({ cell: null, winner: false })) as never;
    this.service["gameStatus"] = GameStatus.PLAYING as never;
    this.service["currentPlayer"] = Player.X as never;
    return this;
  }
}

export const expectMovementToBe = (
  service: TicTacToeService,
  moves: number[],
  expected: number,
  config?: { level?: GameLevel }
) => {
  if (config?.level) {
    service.handleLevelChange(config.level);
  }
  expect(service["_getBestMove"](moves)).toBe(expected);
};

export class TicTacToeFactory {
  static createService() {
    const elementAttr = {
      classList: { add: vi.fn(), remove: vi.fn() },
    } as unknown as ElementAttr;
    const template = {
      render: vi.fn(),
      getRoot: vi.fn().mockReturnValue({
        querySelector: vi.fn(),
        querySelectorAll: vi.fn(),
      }),
    } as unknown as TicTacToeTemplate;
    const window = {
      setTimeout: vi.fn(),
      clearTimeout: vi.fn(),
    } as unknown as Window;
    return new TicTacToeService({ elementAttr, template, window });
  }

  static createGameFinished() {
    const service = this.createService();
    service["gameStatus"] = GameStatus.WIN;
    return service;
  }

  static createGameWithOccupiedCell() {
    const service = this.createService();
    service["gameStatus"] = GameStatus.PLAYING;
    service["board"][0].cell = Player.X;
    return service;
  }

  static createGameInCPUTurn() {
    const service = this.createService();
    service["gameMode"] = GameMode.CPU;
    service["gameStatus"] = GameStatus.PLAYING;
    service["currentPlayer"] = Player.O;
    return service;
  }

  static createGameWithHorizontalWin() {
    const service = this.createService();
    service["gameStatus"] = GameStatus.PLAYING;
    service["board"][0].cell = Player.X;
    service["board"][1].cell = Player.X;
    service["board"][2].cell = Player.X;
    return service;
  }

  static createGameWithVerticalWin() {
    const service = this.createService();
    service["gameStatus"] = GameStatus.PLAYING;
    service["board"][0].cell = Player.O;
    service["board"][3].cell = Player.O;
    service["board"][6].cell = Player.O;
    return service;
  }

  static createGameWithDiagonalWin() {
    const service = this.createService();
    service["gameStatus"] = GameStatus.PLAYING;
    service["board"][0].cell = Player.X;
    service["board"][4].cell = Player.X;
    service["board"][8].cell = Player.X;
    return service;
  }

  static createGameWithPotentialWin() {
    const service = this.createService();
    service["gameStatus"] = GameStatus.PLAYING;
    service["board"][0].cell = Player.O;
    service["board"][1].cell = Player.O;
    return service;
  }

  static createServiceWithImmediateTimeout() {
    const mockWindow = {
      setTimeout: (callback: Function) => {
        callback();
        return 123;
      },
    };
    const elementAttr = {
      classList: { add: vi.fn(), remove: vi.fn() },
    } as unknown as ElementAttr;
    const template = {
      render: vi.fn(),
      getRoot: vi.fn().mockReturnValue({
        querySelector: vi.fn(),
        querySelectorAll: vi.fn(),
      }),
    } as unknown as TicTacToeTemplate;
    return new TicTacToeService({
      elementAttr,
      template,
      window: mockWindow as unknown as Window,
    });
  }
}
