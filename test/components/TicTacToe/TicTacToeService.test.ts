import { describe, expect, it, vi, beforeEach } from "vitest";
import { TicTacToeService } from "lib/components/tic-tac-toe/TicTacToe.services";
import {
  GameLevel,
  GameMode,
  GameStatus,
  Player,
} from "lib/components/tic-tac-toe/TicTacToe.enum";
import { TicTacToeFactory } from "./TicTacToeService.utils";

function callBackFunction(callback: Function) {
  callback(performance.now() + 400)
}

describe("TicTacToeService", () => {
  let service: TicTacToeService;

  beforeEach(() => {
    service = TicTacToeFactory.createService();
  });

  describe("Inicialización y Configuración", () => {
    it("Debería inicializar el juego correctamente", () => {
      expect(service["board"].length).toBe(9);
      expect(service["board"].every((cell) => cell.cell === null)).toBe(true);
      expect(service["currentPlayer"]).toBe(Player.X);
      expect(service["gameStatus"]).toBe(GameStatus.PLAYING);
    });

    it("Debería cambiar el modo de juego", () => {
      service.handleModeChange(GameMode.CPU);
      expect(service["gameMode"]).toBe(GameMode.CPU);
    });

    it("Debería cambiar el nivel de juego", () => {
      service.handleLevelChange(GameLevel.HARD);
      expect(service["gameLevel"]).toBe(GameLevel.HARD);
    });

    it("Debería reiniciar el juego", () => {
      service["board"][0].cell = Player.X;
      service["gameStatus"] = GameStatus.WIN;
      service.handleReset();
      expect(service["board"].every((cell) => cell.cell === null)).toBe(true);
      expect(service["gameStatus"]).toBe(GameStatus.PLAYING);
    });
  });

  describe("Lógica del Juego", () => {
    describe("Movimientos", () => {
      describe("handleCellClick", () => {
        it("No debería permitir movimientos inválidos", () => {
          const isValidMoveSpy = vi.spyOn(service as any, "isValidMove") as any;
          isValidMoveSpy.mockReturnValue(false);

          // Juego terminado
          service = TicTacToeFactory.createGameFinished();
          service.handleCellClick(0);
          expect(service["board"][0].cell).toBeNull();

          // Celda ocupada
          service = TicTacToeFactory.createGameWithOccupiedCell();
          service.handleCellClick(0);
          expect(service["board"][0].cell).toBe(Player.X);

          // Turno de CPU
          service = TicTacToeFactory.createGameInCPUTurn();
          service.handleCellClick(0);
          expect(service["board"][0].cell).toBeNull();

          isValidMoveSpy.mockRestore();
        });

        it("Debería hacer el movimiento y programar movimiento de CPU", () => {
          service = TicTacToeFactory.createServiceWithImmediateTimeout();
          const makeCPUMoveSpy = vi.spyOn(service as any, "_makeCPUMove");
          service.handleModeChange(GameMode.CPU);
          service["gameStatus"] = GameStatus.PLAYING;
          service["currentPlayer"] = Player.X;

          service.handleCellClick(0);

          // Verificar el estado después del movimiento del jugador
          expect(service["board"][0].cell).toBe(Player.X);
          expect(makeCPUMoveSpy).toHaveBeenCalled();

          makeCPUMoveSpy.mockRestore();
        });

        it("Debería detectar victoria y empate", () => {
          // Victoria
          service = TicTacToeFactory.createGameWithHorizontalWin();
          expect(service["_checkWin"]()).toEqual([0, 1, 2]);

          // Empate
          service = TicTacToeFactory.createService();
          for (let i = 0; i < 9; i++) {
            service["board"][i].cell = i % 2 === 0 ? Player.X : Player.O;
          }
          expect(service["_checkTie"]()).toBe(true);
        });
      });

      describe("CPU Logic", () => {
        describe("scheduleCPUMove", () => {
          it("No debería programar movimiento si el juego terminó", () => {
            service = TicTacToeFactory.createGameFinished();
            (service as any).scheduleCPUMove();
            expect(service["timeoutId"]).toBeNull();
          });

          it("Debería programar movimiento si el juego está en curso", () => {
            const timeoutId = 123;
            const mockWindow = {
              setTimeout: vi.fn().mockReturnValue(timeoutId),
            };
            service = TicTacToeFactory.createService();
            (service as any)["_window"] = mockWindow as unknown as Window;
            service["gameMode"] = GameMode.CPU;
            service["gameStatus"] = GameStatus.PLAYING;
            service["currentPlayer"] = Player.O;

            (service as any).scheduleCPUMove();

            expect(mockWindow.setTimeout).toHaveBeenCalledWith(
              expect.any(Function),
              500
            );
            expect(service["timeoutId"]).toBe(timeoutId);
          });
        });

        describe("tryMove", () => {
          it("Debería encontrar movimiento bloqueante", () => {
            service = TicTacToeFactory.createGameWithPotentialWin();
            const checkWinSpy = vi.spyOn(service as any, "_checkWin");
            const randomSpy = vi.spyOn(Math, "random");
            randomSpy.mockReturnValue(0);

            checkWinSpy.mockImplementation(() => {
              const board = service["board"];
              if (board[2].cell === Player.X) return [0, 1, 2];
              return null;
            });

            const result = (service as any).tryMove("blocking");
            expect(result).toBe(2);

            checkWinSpy.mockRestore();
            randomSpy.mockRestore();
          });

          it("Debería retornar -1 si no hay movimiento bloqueante", () => {
            const result = (service as any).tryMove("blocking");
            expect(result).toBe(-1);
          });
        });

        describe("_findWinningMove", () => {
          it("Debería encontrar movimiento ganador", () => {
            service = TicTacToeFactory.createGameWithPotentialWin();
            const result = service["_findWinningMove"](Player.O);
            expect(result).toBe(2);
          });

          it("Debería retornar -1 si no hay movimiento ganador", () => {
            const result = service["_findWinningMove"](Player.O);
            expect(result).toBe(-1);
          });
        });
      });
    });

    describe("Estado del Juego", () => {
      it("Debería detectar victoria correctamente", () => {
        // Victoria horizontal
        service = TicTacToeFactory.createGameWithHorizontalWin();
        expect(service["_checkWin"]()).toEqual([0, 1, 2]);

        // Victoria vertical
        service = TicTacToeFactory.createGameWithVerticalWin();
        expect(service["_checkWin"]()).toEqual([0, 3, 6]);

        // Victoria diagonal
        service = TicTacToeFactory.createGameWithDiagonalWin();
        expect(service["_checkWin"]()).toEqual([0, 4, 8]);
      });
    });

    describe("_makeMove", () => {
      it("_makeMove debería manejar una victoria", () => {
        const mockWindow = {
          getComputedStyle: vi.fn().mockReturnValue({ fontSize: "16px" }),
          requestAnimationFrame: vi.fn(callBackFunction),
        };
        (service as any)["_window"] = mockWindow as unknown as Window;
        service["board"][0] = { cell: Player.X, winner: false };
        service["board"][1] = { cell: Player.X, winner: false };
        service["currentPlayer"] = Player.X;
        const handleWinSpy = vi.spyOn(service as any, "handleWin");

        service["_makeMove"](2);

        expect(handleWinSpy).toHaveBeenCalledWith([0, 1, 2]);
        expect(service["board"][2].cell).toBe(Player.X);
      });

      it("_makeMove debería manejar un empate", () => {
        const mockWindow = {
          getComputedStyle: vi.fn().mockReturnValue({ fontSize: "16px" }),
          requestAnimationFrame: vi.fn(callBackFunction),
        };
        (service as any)["_window"] = mockWindow as unknown as Window;
        (service as any)["board"] = Array(9).fill({
          cell: Player.X,
          winner: false,
        });
        service["currentPlayer"] = Player.O;
        const handleTieSpy = vi.spyOn(service as any, "handleTie");
        vi.spyOn(service as any, "_checkWin").mockReturnValue(null);

        service["_makeMove"](8); // Último movimiento

        expect(handleTieSpy).toHaveBeenCalled();
        expect(service["board"][8].cell).toBe(Player.O);
      });
    });
  });

  describe("UI y Animaciones", () => {
    it("Debería actualizar el estado de victoria de las celdas", () => {
      const cell = document.createElement("div");
      (service as any).updateCellWinnerState(cell, true);
      expect(cell.classList.contains("winner")).toBe(true);
    });

    it("Debería actualizar el estado actual del puntaje", () => {
      const container = document.createElement("div");
      (service as any).updateScoreCurrentState(container, true);
      expect(container.classList.contains("current")).toBe(true);
    });

    it("updateCells debería actualizar las celdas correctamente", () => {
      const mockCell = {
        textContent: "",
        classList: { add: vi.fn(), remove: vi.fn() },
        style: {},
      };
      const mockRoot = {
        querySelector: vi.fn().mockReturnValue(mockCell),
      };
      const mockWindow = {
        getComputedStyle: vi.fn().mockReturnValue({ fontSize: "16px" }),
        requestAnimationFrame: vi.fn(),
      };
      (service["_elementAttr"] as any).shadowRoot =
        mockRoot as unknown as ShadowRoot;
      (service["_window"] as any) = mockWindow as unknown as Window;
      service["board"][0].cell = Player.X;
      service["board"][0].winner = true;

      service["updateCells"](mockRoot as unknown as ShadowRoot);

      expect(mockRoot.querySelector).toHaveBeenCalledWith('[data-index="0"]');
      expect(mockCell.classList.add).toHaveBeenCalledWith("winner");
    });

    it("updateScore debería actualizar el marcador correctamente", () => {
      const mockRoot = {
        querySelector: vi.fn().mockReturnValue({
          textContent: "",
          closest: vi.fn().mockReturnValue({
            classList: { add: vi.fn(), remove: vi.fn() },
          }),
        }),
      };
      (service["_elementAttr"] as any).shadowRoot =
        mockRoot as unknown as ShadowRoot;
      (service["_template"] as any).getClsNames = vi
        .fn()
        .mockReturnValue({ scoreItem: "score-item" });
      service["score"][Player.X] = 1;

      service["updateScore"](mockRoot as unknown as ShadowRoot);

      expect(mockRoot.querySelector).toHaveBeenCalled();
    });

    it("animateCell debería animar la celda correctamente", () => {
      const mockCell = {
        textContent: "",
        style: { fontSize: "16px" },
        classList: { add: vi.fn(), remove: vi.fn() },
      };
      const mockWindow = {
        getComputedStyle: vi.fn().mockReturnValue({ fontSize: "16px" }),
        requestAnimationFrame: vi.fn(),
      };
      (service["_window"] as any) = mockWindow as unknown as Window;

      service["animateCell"](mockCell as unknown as HTMLElement, "", "X");

      expect(mockWindow.requestAnimationFrame).toHaveBeenCalled();
    });
  });

  describe("Animaciones y UI", () => {
    it("animateCell debería manejar el caso sin valor actual", () => {
      const mockCell = {
        textContent: "",
        style: { fontSize: "16px" },
        classList: { add: vi.fn(), remove: vi.fn() },
      };
      const mockWindow = {
        getComputedStyle: vi.fn().mockReturnValue({ fontSize: "16px" }),
        requestAnimationFrame: vi.fn(callBackFunction),
      };
      (service["_window"] as any) = mockWindow as unknown as Window;

      service["animateCell"](mockCell as unknown as HTMLElement, "", "X");

      expect(mockWindow.requestAnimationFrame).toHaveBeenCalled();
      expect(mockCell.textContent).toBe("X");
      expect(mockCell.style.fontSize).toBe("");
    });

    it("animateCell debería manejar el caso sin valor nuevo", () => {
      const mockCell = {
        textContent: "X",
        style: { fontSize: "16px" },
        classList: { add: vi.fn(), remove: vi.fn() },
      };
      const mockWindow = {
        getComputedStyle: vi.fn().mockReturnValue({ fontSize: "16px" }),
        requestAnimationFrame: vi.fn(callBackFunction),
      };
      (service["_window"] as any) = mockWindow as unknown as Window;

      service["animateCell"](mockCell as unknown as HTMLElement, "X", "");

      expect(mockWindow.requestAnimationFrame).toHaveBeenCalled();
      expect(mockCell.textContent).toBe("");
      expect(mockCell.style.fontSize).toBe("");
    });

    it("animateEnter debería animar la entrada de un valor", () => {
      const mockCell = {
        textContent: "",
        style: { fontSize: "16px" },
        classList: { add: vi.fn(), remove: vi.fn() },
      };
      const mockWindow = {
        requestAnimationFrame: vi.fn(callBackFunction),
      };
      (service["_window"] as any) = mockWindow as unknown as Window;

      service["animateEnter"](mockCell as unknown as HTMLElement, "X", 16);

      expect(mockWindow.requestAnimationFrame).toHaveBeenCalled();
      expect(mockCell.textContent).toBe("X");
      expect(mockCell.style.fontSize).toBe("");
    });

    it("animateEnter debería animar la entrada con progreso parcial", () => {
      const mockCell = {
        textContent: "",
        style: { fontSize: "16px" },
        classList: { add: vi.fn(), remove: vi.fn() },
      };
      let callCount = 0;
      const mockWindow = {
        requestAnimationFrame: vi.fn((callback) => {
          if (callCount++ < 1) {
            callback(performance.now() + 100);
          }
        }),
      };
      (service["_window"] as any) = mockWindow as unknown as Window;

      service["animateEnter"](mockCell as unknown as HTMLElement, "X", 16);

      expect(mockWindow.requestAnimationFrame).toHaveBeenCalled();
      expect(mockCell.textContent).toBe("X");
      expect(mockCell.style.fontSize).not.toBe("16px");
    });

    it("updateScore debería manejar el caso sin elementos de puntaje", () => {
      const mockRoot = {
        querySelector: vi.fn().mockReturnValue(null),
      };
      (service["_elementAttr"] as any).shadowRoot =
        mockRoot as unknown as ShadowRoot;
      (service["_template"] as any).getClsNames = vi
        .fn()
        .mockReturnValue({ scoreItem: "score-item" });

      service["updateScore"](mockRoot as unknown as ShadowRoot);

      expect(mockRoot.querySelector).toHaveBeenCalled();
    });

    it("updateScoreCurrentState debería manejar el caso de juego no en progreso", () => {
      const mockContainer = {
        classList: { add: vi.fn(), remove: vi.fn() },
      };
      service["gameStatus"] = GameStatus.WIN;

      service["updateScoreCurrentState"](
        mockContainer as unknown as Element,
        true
      );

      expect(mockContainer.classList.remove).toHaveBeenCalledWith("current");
    });

    it("animateCell debería manejar el caso de animación en progreso", () => {
      const mockCell = {
        textContent: "X",
        style: { fontSize: "16px" },
        classList: { add: vi.fn(), remove: vi.fn() },
      };
      let callCount = 0;
      const mockWindow = {
        getComputedStyle: vi.fn().mockReturnValue({ fontSize: "16px" }),
        requestAnimationFrame: vi.fn((callback) => {
          if (callCount++ < 1) {
            callback(performance.now() + 100); // Simula progreso < 1
          }
        }),
      };
      (service["_window"] as any) = mockWindow as unknown as Window;

      service["animateCell"](mockCell as unknown as HTMLElement, "X", "O");

      expect(mockWindow.requestAnimationFrame).toHaveBeenCalled();
      expect(mockCell.textContent).toBe("X");
      expect(mockCell.style.fontSize).not.toBe("16px");
    });

    it("animateEnter debería manejar el caso de animación completa", () => {
      const mockCell = {
        textContent: "",
        style: { fontSize: "16px" },
        classList: { add: vi.fn(), remove: vi.fn() },
      };
      let callCount = 0;
      const mockWindow = {
        requestAnimationFrame: vi.fn((callback) => {
          if (callCount++ < 1) {
            callback(performance.now() + 400); // Simula progreso = 1
          }
        }),
      };
      (service["_window"] as any) = mockWindow as unknown as Window;

      service["animateEnter"](mockCell as unknown as HTMLElement, "X", 16);

      expect(mockWindow.requestAnimationFrame).toHaveBeenCalled();
      expect(mockCell.textContent).toBe("X");
      expect(mockCell.style.fontSize).toBe("");
    });

    it("_clearTimeout debería limpiar el timeout existente", () => {
      const mockWindow = {
        clearTimeout: vi.fn(),
      };
      (service["_window"] as any) = mockWindow as unknown as Window;
      service["timeoutId"] = 123;

      service["_clearTimeout"]();

      expect(mockWindow.clearTimeout).toHaveBeenCalledWith(123);
      expect(service["timeoutId"]).toBeNull();
    });

    it("_clearTimeout no debería hacer nada si no hay timeout", () => {
      const mockWindow = {
        clearTimeout: vi.fn(),
      };
      (service["_window"] as any) = mockWindow as unknown as Window;
      service["timeoutId"] = null;

      service["_clearTimeout"]();

      expect(mockWindow.clearTimeout).not.toHaveBeenCalled();
      expect(service["timeoutId"]).toBeNull();
    });

    it("_updateUI no debería hacer nada si no hay root", () => {
      (service["_elementAttr"] as any).shadowRoot = null;
      service["_updateUI"]();
      // No debería lanzar error
    });

    it("updateCells no debería hacer nada si no encuentra el elemento celda", () => {
      const mockRoot = {
        querySelector: vi.fn().mockReturnValue(null),
      };

      service["updateCells"](mockRoot as unknown as ShadowRoot);

      expect(mockRoot.querySelector).toHaveBeenCalled();
    });

    it("animateCell debería manejar la transición a un nuevo valor", () => {
      const mockCell = {
        textContent: "X",
        style: { fontSize: "16px" },
        classList: { add: vi.fn(), remove: vi.fn() },
      };
      let callCount = 0;
      const mockWindow = {
        getComputedStyle: vi.fn().mockReturnValue({ fontSize: "16px" }),
        requestAnimationFrame: vi.fn((callback) => {
          callback(performance.now() + 400); // Segunda animación (fade in)
          callCount++;
        }),
      };
      (service["_window"] as any) = mockWindow as unknown as Window;

      service["animateCell"](mockCell as unknown as HTMLElement, "X", "O");

      expect(mockWindow.requestAnimationFrame).toHaveBeenCalled();
      expect(mockCell.textContent).toBe("O");
      expect(mockCell.style.fontSize).toBe("");
    });

    it("animateCell debería manejar la transición sin nuevo valor", () => {
      const mockCell = {
        textContent: "X",
        style: { fontSize: "16px" },
        classList: { add: vi.fn(), remove: vi.fn() },
      };
      let callCount = 0;
      const mockWindow = {
        getComputedStyle: vi.fn().mockReturnValue({ fontSize: "16px" }),
        requestAnimationFrame: vi.fn((callback) => {
          if (callCount++ < 1) {
            callback(performance.now() + 400); // Simula progreso = 1
          }
        }),
      };
      (service["_window"] as any) = mockWindow as unknown as Window;

      service["animateCell"](mockCell as unknown as HTMLElement, "X", "");

      expect(mockWindow.requestAnimationFrame).toHaveBeenCalled();
      expect(mockCell.textContent).toBe("");
      expect(mockCell.style.fontSize).toBe("");
    });
  });

  describe("Cambios de Estado", () => {
    it("handleLevelChange debería mantener el estado del juego al cambiar nivel", () => {
      service["gameMode"] = GameMode.CPU;
      service["shouldCPUStart"] = true;
      service["currentPlayer"] = Player.O;
      service["board"][0].cell = Player.X;

      service.handleLevelChange(GameLevel.MEDIUM);

      expect(service["gameLevel"]).toBe(GameLevel.MEDIUM);
      expect(service["board"][0].cell).toBeNull();
      expect(service["score"][Player.X]).toBe(0);
      expect(service["score"][Player.O]).toBe(0);
      expect(service["score"].ties).toBe(0);
    });

    it("handleModeChange debería reiniciar el juego correctamente", () => {
      service["score"][Player.X] = 5;
      service["score"][Player.O] = 3;
      service["score"].ties = 2;
      service["board"][0].cell = Player.X;

      service.handleModeChange(GameMode.CPU);

      expect(service["score"][Player.X]).toBe(0);
      expect(service["score"][Player.O]).toBe(0);
      expect(service["score"].ties).toBe(0);
      expect(service["board"][0].cell).toBeNull();
    });
  });

  describe("Movimientos Estratégicos", () => {
    it("_getRandomMove debería retornar -1 cuando no hay movimientos disponibles", () => {
      expect(service["_getRandomMove"]([])).toBe(-1);
    });

    it("updateCells debería actualizar las celdas con línea ganadora", () => {
      const mockCellElement = {
        textContent: "",
        style: { fontSize: "" },
        classList: { add: vi.fn(), remove: vi.fn() },
      };
      const mockRoot = {
        querySelector: vi.fn().mockReturnValue(mockCellElement),
      };
      const mockWindow = {
        getComputedStyle: vi.fn().mockReturnValue({ fontSize: "16px" }),
        requestAnimationFrame: vi.fn(callBackFunction),
      };
      (service["_window"] as any) = mockWindow as unknown as Window;

      service["board"][0] = { cell: Player.X, winner: true };
      service["board"][1] = { cell: Player.X, winner: true };
      service["board"][2] = { cell: Player.X, winner: true };

      service["updateCells"](mockRoot as unknown as ShadowRoot, [0, 1, 2]);

      expect(mockRoot.querySelector).toHaveBeenCalledTimes(9);
      expect(mockCellElement.classList.add).toHaveBeenCalledWith("winner");
    });

    it("tryStrategicMove debería fallar si la probabilidad no se cumple", () => {
      service["gameLevel"] = GameLevel.EASY;
      const randomSpy = vi.spyOn(Math, "random");
      randomSpy.mockReturnValue(1); // Siempre falla la probabilidad

      const result = service["tryStrategicMove"]([1, 4, 7]);

      expect(result).toBe(-1);
      randomSpy.mockRestore();
    });

    it("tryStrategicMove debería elegir una esquina si el centro está ocupado", () => {
      service["gameLevel"] = GameLevel.HARD;
      const randomSpy = vi.spyOn(Math, "random");
      randomSpy.mockReturnValueOnce(0); // Pasa la probabilidad
      randomSpy.mockReturnValueOnce(0); // Elige la primera esquina disponible

      const result = service["tryStrategicMove"]([0, 1, 2, 3, 5, 6, 7, 8]); // 4 (centro) no disponible

      expect([0, 2, 6, 8]).toContain(result);
      randomSpy.mockRestore();
    });
  });

  describe("Lógica del Juego", () => {
    describe("tryStrategicMove", () => {
      it("Debería elegir el centro si está disponible", () => {
        const availableMoves = [1, 4, 7];
        const randomSpy = vi.spyOn(Math, "random");
        randomSpy.mockReturnValue(0);

        const result = service["tryStrategicMove"](availableMoves);

        expect(result).toBe(4);
        randomSpy.mockRestore();
      });

      it("Debería elegir una esquina si el centro no está disponible", () => {
        const availableMoves = [0, 2, 3, 5, 6, 8];
        const randomSpy = vi.spyOn(Math, "random");
        randomSpy.mockReturnValue(0);

        const result = service["tryStrategicMove"](availableMoves);

        expect([0, 2, 6, 8]).toContain(result);
        randomSpy.mockRestore();
      });
    });

    describe("_getBestMove", () => {
      it("Debería intentar ganar primero", () => {
        service["gameLevel"] = GameLevel.HARD;
        const randomSpy = vi.spyOn(Math, "random");
        randomSpy.mockReturnValue(0);
        const tryMoveSpy = vi.spyOn(service as any, "tryMove");
        tryMoveSpy.mockReturnValue(4);

        const result = service["_getBestMove"]([1, 4, 7]);

        expect(result).toBe(4);
        randomSpy.mockRestore();
        tryMoveSpy.mockRestore();
      });

      it("Debería hacer movimientos aleatorios en nivel fácil", () => {
        service["gameLevel"] = GameLevel.EASY;
        const randomSpy = vi.spyOn(Math, "random");
        randomSpy.mockReturnValueOnce(0.8); // Para que pase el umbral aleatorio
        randomSpy.mockReturnValueOnce(0.8); // Para que falle el intento de ganar
        randomSpy.mockReturnValueOnce(0.8); // Para que falle el intento de bloquear
        randomSpy.mockReturnValueOnce(0.8); // Para que falle el intento estratégico
        randomSpy.mockReturnValueOnce(0); // Para la selección del movimiento aleatorio

        const result = service["_getBestMove"]([1, 4, 7]);

        expect(result).toBe(1);
        randomSpy.mockRestore();
      });

      it("Debería intentar bloquear si no puede ganar", () => {
        service["gameLevel"] = GameLevel.HARD;
        const randomSpy = vi.spyOn(Math, "random");
        randomSpy.mockReturnValue(0);
        const tryMoveSpy = vi.spyOn(service as any, "tryMove");
        tryMoveSpy.mockImplementation((type) => (type === "winning" ? -1 : 4));

        const result = service["_getBestMove"]([1, 4, 7]);

        expect(result).toBe(4);
        randomSpy.mockRestore();
        tryMoveSpy.mockRestore();
      });

      it("Debería intentar movimiento estratégico si no puede ganar ni bloquear", () => {
        service["gameLevel"] = GameLevel.HARD;
        const randomSpy = vi.spyOn(Math, "random");
        randomSpy.mockReturnValue(0);
        const tryMoveSpy = vi.spyOn(service as any, "tryMove");
        tryMoveSpy.mockReturnValue(-1);
        const tryStrategicMoveSpy = vi.spyOn(
          service as any,
          "tryStrategicMove"
        );
        tryStrategicMoveSpy.mockReturnValue(4);

        const result = service["_getBestMove"]([1, 4, 7]);

        expect(result).toBe(4);
        randomSpy.mockRestore();
        tryMoveSpy.mockRestore();
        tryStrategicMoveSpy.mockRestore();
      });
    });
  });

  describe("Gestión del Estado", () => {
    describe("handleLevelChange", () => {
      it("Debería mantener shouldCPUStart al cambiar nivel", () => {
        service["shouldCPUStart"] = true;
        service.handleLevelChange(GameLevel.MEDIUM);

        expect(service["shouldCPUStart"]).toBe(true);
      });
    });

    describe("setInitialPlayer", () => {
      it("Debería alternar el jugador inicial en modo CPU", () => {
        service["gameMode"] = GameMode.CPU;
        service["shouldCPUStart"] = true;

        service["setInitialPlayer"]();
        expect(service["currentPlayer"]).toBe(Player.O);
        expect(service["shouldCPUStart"]).toBe(false);

        service["setInitialPlayer"]();
        expect(service["currentPlayer"]).toBe(Player.X);
        expect(service["shouldCPUStart"]).toBe(true);
      });
    });
  });

  describe("UI y Animaciones", () => {
    it("_updateUI debería actualizar celdas y puntaje", () => {
      const mockCellElement = {
        textContent: "",
        style: { fontSize: "" },
        classList: { add: vi.fn(), remove: vi.fn() },
      };
      const mockScoreContainer = {
        classList: { add: vi.fn(), remove: vi.fn() },
      };
      const mockScoreElement = {
        textContent: "0",
        classList: { add: vi.fn(), remove: vi.fn() },
        closest: vi.fn().mockReturnValue(mockScoreContainer),
      };
      const mockRoot = {
        querySelector: vi.fn().mockImplementation((selector) => {
          if (selector.includes("data-index")) {
            return mockCellElement;
          }
          if (selector.includes("score-item")) {
            return mockScoreElement;
          }
          return null;
        }),
      };
      const mockWindow = {
        getComputedStyle: vi.fn().mockReturnValue({ fontSize: "16px" }),
        requestAnimationFrame: vi.fn(callBackFunction),
      };
      (service["_window"] as any) = mockWindow as unknown as Window;
      (service["_elementAttr"] as any).shadowRoot =
        mockRoot as unknown as ShadowRoot;
      (service["_template"] as any).getClsNames = vi.fn().mockReturnValue({
        scoreItem: "score-item",
        scoreContainer: "score-container",
      });
      (service["_template"] as any).getCls = vi
        .fn()
        .mockReturnValue("score-item");

      // Simular una línea ganadora y puntajes
      service["board"][0] = { cell: Player.X, winner: true };
      service["board"][1] = { cell: Player.X, winner: true };
      service["board"][2] = { cell: Player.X, winner: true };
      (service["score"] as any) = { X: 1, O: 0, ties: 0 };

      service["_updateUI"]([0, 1, 2]);

      // Verificar que se actualizaron las celdas
      expect(mockRoot.querySelector).toHaveBeenCalledWith('[data-index="0"]');
      expect(mockCellElement.classList.add).toHaveBeenCalledWith("winner");

      // Verificar que se actualizó el puntaje
      expect(mockRoot.querySelector).toHaveBeenCalledWith(
        '.score-item [data-score="X"]'
      );
      expect(mockScoreElement.closest).toHaveBeenCalledWith(".score-item");
      expect(mockScoreContainer.classList.add).toHaveBeenCalledWith("current");
      expect(mockScoreElement.textContent).toBe("0"); // El valor se actualiza en updateScore
    });
  });
});
