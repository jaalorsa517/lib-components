import {j5Toggle} from 'lib/main';
import { header } from "../header.js";

header();
j5Toggle();

const main = document.getElementById("main");
const container = document.createElement("div")
container.className = "container"

const _j5Toggle = document.createElement("j5-toggle");

container.appendChild(_j5Toggle);
main.appendChild(container)

_j5Toggle.setAttribute("label", "InactivoJs/ActivoJs");
_j5Toggle.setAttribute("checked", "true");