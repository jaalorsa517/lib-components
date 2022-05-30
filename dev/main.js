import { j5Toggle } from "@/main";

j5Toggle();

const body = document.body;

const _j5Toggle = document.createElement("j5-toggle");
body.appendChild(_j5Toggle);
_j5Toggle.setAttribute("label", "Inactivo/Activo");
_j5Toggle.setAttribute("checked", "true");
