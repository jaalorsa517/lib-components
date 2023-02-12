import { j5Carousel } from "lib/main";
import { header } from "../header.js";

header();
j5Carousel();

const main = document.getElementById("main");
const container = document.createElement("div");
container.className = "container";

const carousel = document.createElement("j5-carousel");
carousel.setAttribute("count-slides", "3");
carousel.setAttribute("transition-auto", "8000");
carousel.innerHTML = `
          <div class="item"><span>1</span></div>
          <div class="item"><span>2</span></div>
          <div class="item"><span>3</span></div>
          <div class="item"><span>4</span></div>
          <div class="item"><span>5</span></div>
          <div class="item"><span>6</span></div>
`;

container.appendChild(carousel);
main.appendChild(container);
