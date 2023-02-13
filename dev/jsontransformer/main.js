import {j5JsonTransform} from 'lib/main';
import { header } from "../header.js";

header()
j5JsonTransform();

const main = document.getElementById("main");
const container = document.createElement("div");
container.className = "container";

const jsonTransform = document.createElement("j5-json-transform");

container.appendChild(jsonTransform);
main.appendChild(container);