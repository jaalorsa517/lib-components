import { j5Toggle, j5Tooltip, j5MenuHamburguer, j5JsonTransform, j5Carousel } from "lib/main";

j5Toggle();
j5Tooltip();
j5MenuHamburguer();
j5JsonTransform();
j5Carousel();

const randomMinMax = (min = 0, max = 1) => Math.floor(Math.random() * (max - min + 1)) + min;

// for (let i = 0; i < 200; i++) {
//   const tooltip = document.createElement("j5-tooltip");
//   tooltip.innerHTML = `<p>Tooltip ${i}</p>`;
//   tooltip.setAttribute("text", `Este es el ${i} tooltip desde Javascript.`);
//   let isRandom = randomMinMax();
//   if (isRandom) tooltip.setAttribute("startposition", "horizontal");
//   isRandom = randomMinMax();
//   if (isRandom)
//     tooltip.setAttribute(
//       "text",
//       `Este es el ${i} tooltip desde Javascript. Este es un ejemplo aleatorio de un tooltip con texto largo.`
//     );
//   document.querySelector(".container").appendChild(tooltip);
// }
