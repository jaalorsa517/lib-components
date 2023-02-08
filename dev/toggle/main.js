import {j5Toggle} from 'lib/main';
import { header } from "../header.js";

header();
j5Toggle();

const _j5Toggle = document.createElement("j5-toggle");
const container = document.createElement("div")
container.className="container"
container.appendChild(_j5Toggle);
_j5Toggle.setAttribute("label", "InactivoJs/ActivoJs");
_j5Toggle.setAttribute("checked", "true");
const main = document.querySelector("main");
main.appendChild(container)