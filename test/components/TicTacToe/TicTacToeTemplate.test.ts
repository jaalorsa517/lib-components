import { j5TicTacToeEnum } from "lib/components/tic-tac-toe/TicTacToe.enum";
import { TicTacToeTemplate } from "lib/components/tic-tac-toe/TicTacToe.tmp";
import { describe, it, expect } from "vitest";

describe("[TicTacToeTemplate]", () => {
  const clsNames = {
    root: `${j5TicTacToeEnum.tag}`,
    container: `${j5TicTacToeEnum.tag}__container`,
    score: `${j5TicTacToeEnum.tag}__score`,
    scoreItem: `${j5TicTacToeEnum.tag}__scoreItem`,
    board: `${j5TicTacToeEnum.tag}__board`,
    cell: `${j5TicTacToeEnum.tag}__cell`,
    reset: `${j5TicTacToeEnum.tag}__reset`
  };

  it("Debería retornar los nombres de las clases correctamente", () => {
    const template = new TicTacToeTemplate();
    expect(template.getClsNames()).toEqual(clsNames);
  });

  it("Debería generar el template con la estructura correcta", () => {
    const template = new TicTacToeTemplate();
    const htmlTemplate = template.getTemplate();

    // Verificar que el template contiene los elementos principales
    expect(htmlTemplate).toContain(`class="${clsNames.container}"`);
    expect(htmlTemplate).toContain(`class="${clsNames.score}"`);
    expect(htmlTemplate).toContain(`class="${clsNames.board}"`);
    expect(htmlTemplate).toContain(`class="${clsNames.reset}"`);

    // Verificar que contiene los elementos del score
    expect(htmlTemplate).toContain('data-score="X"');
    expect(htmlTemplate).toContain('data-score="O"');
    expect(htmlTemplate).toContain('data-score="ties"');

    // Verificar que contiene las 9 celdas del tablero
    const cellMatches = htmlTemplate.match(new RegExp(`class="${clsNames.cell}"`, 'g'));
    expect(cellMatches).toHaveLength(9);
  });

  it("Debería generar los estilos con las variables CSS correctas", () => {
    const template = new TicTacToeTemplate();
    const styles = template.getStyle();

    // Verificar variables CSS
    const expectedVariables = [
      '--color-cell-winner',
      '--color-cell-font-winner',
      '--color-cell-background',
      '--color-border',
      '--color-cell-font',
      '--color-reset',
      '--color-reset-hover',
      '--cell-gap'
    ];

    expectedVariables.forEach(variable => {
      expect(styles).toContain(`var(${variable})`);
    });

    // Verificar clases principales
    expect(styles).toContain(`.${clsNames.container}`);
    expect(styles).toContain(`.${clsNames.score}`);
    expect(styles).toContain(`.${clsNames.board}`);
    expect(styles).toContain(`.${clsNames.cell}`);
    expect(styles).toContain(`.${clsNames.reset}`);

    // Verificar clase winner
    expect(styles).toContain('.winner');
  });
});
