import { j5TicTacToe } from "lib/components/tic-tac-toe/index";
import { header } from "../header.js";

header()
j5TicTacToe();

// Obtener elementos
const ticTacToe = document.querySelector('j5-tic-tac-toe');
const modeButtons = document.querySelectorAll('[data-mode]');
const levelButtons = document.querySelectorAll('[data-level]');
const levelControls = document.querySelector('.ticTacToe__levelControls');

// Función para actualizar botones activos
function updateActiveButtons(buttons, activeButton) {
  buttons.forEach(button => {
    button.classList.remove('ticTacToe__button--active');
  });
  activeButton.classList.add('ticTacToe__button--active');
}

// Inicializar visibilidad de controles de nivel
if (levelControls && ticTacToe?.getAttribute('mode') === 'cpu') {
  levelControls.classList.add('ticTacToe__levelControls--visible');
}

// Manejar cambios de modo
modeButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const target = e.currentTarget;
    if (target instanceof HTMLElement) {
      const mode = target.dataset.mode;
      ticTacToe?.setAttribute('mode', mode);
      updateActiveButtons(modeButtons, target);
      levelControls?.classList.toggle('ticTacToe__levelControls--visible', mode === 'cpu');
    }
  });
});

// Manejar cambios de nivel
levelButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const target = e.currentTarget;
    if (target instanceof HTMLElement) {
      const level = target.dataset.level;
      ticTacToe?.setAttribute('level', level);
      updateActiveButtons(levelButtons, target);
    }
  });
});
