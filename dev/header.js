import { j5MenuHamburguer } from "lib/main";

j5MenuHamburguer();
const randomMinMax = (min = 0, max = 1) => Math.floor(Math.random() * (max - min + 1)) + min;

export function header() {
  const header = document.createElement("header");
  const animations = ["fade_in_out", "slide_in_out_1", "slide_in_out_2", "slide_in_out_3", "slide_in_out_4"];
  const index = randomMinMax(0, animations.length - 1);
  header.innerHTML = `
    <j5-menu-hamburguer id="menu" animation="${animations.at(index)}">
      <li><a href="/index.html">Inicio</a></li>
      <li><a href="/dev/carousel/index.html">Carousel</a></li>
      <li><a href="/dev/jsontransformer/index.html">JsonTransform</a></li>
      <li><a href="/dev/toggle/index.html">Toggle</a></li>
      <li><a href="/dev/tooltip/index.html">Tooltip</a></li>
    </j5-menu-hamburguer>`;
  const style = document.createElement("style");
  style.innerHTML = `
    body{
      margin: 0;
      padding: 0;
    }
    header{
       display: flex;
       justify-content: flex-end;
       align-items: center;
       padding: 10px 5px;
       margin-bottom: 10px;
       box-shadow: 0 0 3px rgba(0,0,0,0.5);
       background-color: #f1f1f1;
    }
    header li{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      list-style: none;
      padding: 10px;
    }  
    header a {
      font-weight: bold;
      color: #438C40;
      text-decoration: none;
      font-size: 1.2em;
    }
    `;
  const body = document.querySelector("body");
  body.prepend(style);
  body.prepend(header);
}
