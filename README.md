# J5-Components: Librería web components

## Descripción

Libreria de componentes web, para ayudar al desarrollador javascript en su día a día. Como la librería está hecha en javascript vanilla, se puede utilizar en cualquier proyecto javascript, sin importar el framework usado.

## Instalación

```bash
npm install @jaalorsa/j5-components
```

## Uso

```html
<!-- En el HTML -->
<j5-toggle></j5-toggle>
```

```javascript
// main.js
// Importar la librería y seleccionar el componente que se desea utilizar
import { j5Toggle } from "@jaalorsa/j5-components";
// Iniciar el componente al ejecutar la función
j5Toggle();
```

## Características

Las característica que tiene la librería J5-Components son:

- J5-Components está hecha con Typescript, por lo que si se usa cualquier IDE con autocompletado, tiene a disposición la ayuda del IDE.
- Toda etiqueta tiene que tener etiqueta de apertura y cierre.
- Posibilidad de insertar componentes web en cualquier lugar de la página web.
- Flexibilidad de los componentes, al permitir personalizares los estilos y funcionalidades.
- Todos los componentes heredan de una clase Abstracta, la cual tiene una función, llamada **getElement** que permite acceder a cualquier elemento interno del Shadow Dom.

  ```javascript
  const toggle = document.querySelector("j5-toggle");
  const containerShadow = toggle.getElement(".j5-toggle__container");
  ```

- Personalizar los estilos de los componentes de acuerdo a la necesidad del proyecto. Cada componente tiene definidas unas **variables de CSS**, que al reescribirlas se pueden personalizar los estilos. También los tamaños vienen definidos en unidades `em`, por lo que modificando el `font-size` de un componente, se puede modificar el tamaño de todos los componentes. **TENER EN CUENTA** los fundamentos de CSS en el tema de especificidad. Más información en: [CSS Especificidad](https://developer.mozilla.org/es/docs/Web/CSS/Specificity)
  ```css
  j5-toggle {
    font-size: 10px;
    --backWidth: 6em;
    --backHeight: 3em;
    --backColorActive: green;
    --backColorInactive: gray;
    ...;
  }
  ```

## Componentes

<details class="detail">
<summary><h3 class="toggle-head" style="display:inline;"> j5-toggle: Toggle </h3> </summary>

#### Instrucciones

En el html se usa la etiqueta `j5-toggle`

```html
<j5-toggle></j5-toggle>
<j5-toggle checked="true"></j5-toggle>
<j5-toggle checked="true" label="Incorrecto/Correcto"></j5-toggle>
<j5-toggle label="Inactivo/Activo"></j5-toggle>
```

En el archivo de entrada Js se importa la librería y se ejecuta la función **j5Toggle**.

```javascript
// main.js
// Importar la librería y seleccionar j5Toggle
import { j5Toggle } from "@jaalorsa/j5-components";
// Iniciar el componente al ejecutar la función
j5Toggle();
```

O se puede inyectar todo desde javascript

```javascript
import { j5Toggle } from "@/main";
j5Toggle();
const body = document.body;
const _j5Toggle = document.createElement("j5-toggle");
body.appendChild(_j5Toggle);
_j5Toggle.setAttribute("label", "Inactivo/Activo");
_j5Toggle.setAttribute("checked", "true");
```

Es **importante** tener en cuenta que la asignación de atributos se tiene que hacer luego que se agrega el elemento al DOM.

#### Valores por defecto

Se encuentra en el selector CSS de etiqueta `j5-toggle`

```css
j5-toggle {
  font-size: 10px;
  --backWidth: 6em;
  --backHeight: 3em;
  --backColorActive: green;
  --backColorInactive: gray;
  --backColorSwitch: white;
  --swSize: calc(var(--backHeight) - 2px);
  --labelSize: 1.6em;
  --labelColor: darkgray;
  --labelFont: sans-serif;
  --borderRadius: 10em;
}
```

#### Nombre de las clases de los elementos internos

```javascript
Componente: `j5-toggle`,
Contenedor: `j5-toggle__container`,
Input tipo radio, toggle lógico: `j5-toggle__radio`,
Toggle visual: `j5-toggle__switch`,
Label: `j5-toggle__label`,
```

#### Atributos

- **checked [true, false]:** Atributo para indicar el estado del toggle.
  ```html
  <j5-toggle checked="true"></j5-toggle>
  <j5-toggle checked="false"></j5-toggle>
  ```
- **label [string]:** Atributo para indicar el texto del label. Este tiene una **característica especial**: si pasa un texto separado por un slash ("/"), el toggle mostrará el primer texto cuando sea falso y el segundo cuando sea verdadero; llegado el caso donde solo se pasa un string normal, se muestra dicho string.

  ```html
  <!-- Cuando sea falso, mostrará Inactivo -->
  <!-- Cuando sea Verdadero, mostrará Activo -->
  <j5-toggle label="Inactivo/Activo"></j5-toggle>
  <j5-toggle label="Viajar"></j5-toggle>
  ****
  ```

#### Eventos

- **change:** Evento que envía el estado del toggle. La información del estado se envía dentro un objeto llamado `detail`, dentro se envía el valor `isChecked` con su respectivo estado.
  ```javascript
  const toggle = document.querySelector(".my-toggle");
  toggle.addEventListener("change", (e) => {
    console.log(e.detail); //{isChecked: true} || {ischecked: false}
  });
  ```

</details>
<details class="detail">
<summary><h3 class="toggle-head" style="display:inline;"> j5-tooltip: Tooltip </h3> </summary>

#### Instrucciones

En el html se usa la etiqueta `j5-tooltip`

```html
<j5-tooltip class="tres" text="Probando un texto mediano para el tooltip." startposition="horizontal">
  <a href="#">Hello a element with display inline</a>
</j5-tooltip>
<j5-tooltip
  class="cuatro"
  text="Hello World this is a tooltip for example. I am a tooltip and I want to be a tooltip."
>
  <p>Hello everybody!</p>
</j5-tooltip>
```

En el archivo de entrada Js se importa la librería y se ejecuta la función **j5Tooltip**.

```javascript
// main.js
// Importar la librería y seleccionar j5Tooltip
import { j5Tooltip } from "@jaalorsa/j5-components";
// Iniciar el componente al ejecutar la función
j5Tooltip();
```

O se puede inyectar todo desde javascript

```javascript
import { j5Tooltip } from "@jaalorsa/j5-components";
j5Tooltip();
const tooltip = document.createElement("j5-tooltip");
tooltip.innerHTML = `<p>Tooltip ${i}</p>`;
tooltip.setAttribute("text", `Este es el tooltip desde Javascript.`);
tooltip.setAttribute("startposition", "horizontal");
document.querySelector(".container").appendChild(tooltip);
```

#### Valores por defecto

Se encuentra en el selector CSS de etiqueta `j5-tooltip`

```css
j5-tooltip {
  width: fit-content;
  height: fit-content;
  display: block;
  box-sizing: border-box;
  cursor: pointer;
  --border-width: 10px;
  --background-color: #2d302d;
  --border-transparent: transparent;
  --top: 0;
  --left: 0;
  --bottom: initial;
  --right: initial;
  --right-before: initial;
  --left-before: 20px;
  --bottom-before: 100%;
  --top-before: initial;
  --max-width: auto;
  --min-width: auto;
  --width: auto;
  --height: auto;
  --padding: 8px;
  --fontFamily: initial;
  --fontSize: 0.875em;
  --fontColor: #fff;
  --text-align: start;
}
```

#### Nombre de las clases de los elementos internos

```javascript
Component: `j5-tooltip`,
Contenedor: `j5-tooltip__container`,
Tooltip: `j5-tooltip__tooltip`,
Tooltip posición norte: `j5-tooltip__tooltip--norte`,
Tooltip posición sur: `j5-tooltip__tooltip--sur`,
Tooltip posición este: `j5-tooltip__tooltip--este`,
Tooltip posición oeste: `j5-tooltip__tooltip--oeste`,
Transición tooltip: `j5-tooltip__tooltip--in-out`,
```

#### Atributos

- **text [string]:** Atributo para indicar el texto del que muestra el tooltip.

  ```html
  <j5-tooltip
    class="cuatro"
    text="Hello World this is a tooltip for example. I am a tooltip and I want to be a tooltip."
  >
    <p>Hello everybody!</p>
  </j5-tooltip>
  ```

- **startposition [horizontal, vertical(default)]:** Attributo opcional para indicar sí el tooltip aparece abajo/arriba o derecha/izquierda.
  ```html
  <j5-tooltip class="tres" text="Probando un texto mediano para el tooltip." startposition="vertical">
    <a href="#">Hello a element with display inline</a>
  </j5-tooltip>
  <j5-tooltip class="tres" text="Probando un texto mediano para el tooltip." startposition="horizontal">
    <a href="#">Hello a element with display inline</a>
  </j5-tooltip>
  ```

</details>
<details class="detail">
<summary><h3 class="toggle-head" style="display:inline;"> j5-menu-hamburguer: Menú hamburguesa </h3> </summary>

#### Instrucciones

En el html se usa la etiqueta `j5-menu-hamburguer`

```html
<j5-menu-hamburguer>
  <h1>Esto es una prueba</h1>
</j5-menu-hamburguer>
```

En el archivo de entrada Js se importa la librería y se ejecuta la función **j5MenuHamburguer**.

```javascript
// main.js
// Importar la librería y seleccionar j5MenuHamburguer
import { j5MenuHamburguer } from "@jaalorsa/j5-components";
// Iniciar el componente al ejecutar la función
j5MenuHamburguer();
```

#### Valores por defecto

Se encuentra en el selector CSS de etiqueta `j5-menu-hamburguer`

```css
j5-menu-hamburguer {
  display: block;
  font-size: 10px;
  --color: #215376;
  --colorActive: #215376;
  --menuPositionTop: 0;
  --menuPositionRight: ${this._getRight()};
  --menuPositionLeft: ${this._getLeft()};
  --menuBackground: #fff;
  --menuWidth: 100vw;
  --menuHeight: 100vh;
  --menuZIndex: 1000;
}
```

Para controlar el **tamaño** del menu (ícono) se hace a través del atributo `font-size` de css.

#### Nombre de las clases de los elementos internos

```javascript
Componente: `j5-menu-hamburguer`,
Contenedor: `j5-menu-hamburguer__container`,
menu: `j5-menu-hamburguer__menu`,
linea: `j5-menu-hamburguer__line`,
inea Uno: `j5-menu-hamburguer__line--uno`,
linea Dos: `j5-menu-hamburguer__line--dos`,
linea Tres: `j5-menu-hamburguer__line--tres`,
Contenedor del slot: `j5-menu-hamburguer__containerChild`
```

#### Atributos

- **in-out [string]:** Atributo para indicar la animación, estilo transición. Funciona igual que la propiedad `transition` de css. El valor por default es `opacity 600ms`

  ```html
  <j5-menu-hamburguer>
    <h1>Default es opacity 600ms</h1>
  </j5-menu-hamburguer>
  <j5-menu-hamburguer in-out="2s">
    <h1>transition: opacity 2000ms</h1>
  </j5-menu-hamburguer>
  <j5-menu-hamburguer in-out="left">
    <h1>transition: left 600ms</h1>
  </j5-menu-hamburguer>
  <j5-menu-hamburguer in-out="right 1s ease-out">
    <h1>transition: rigth 1000ms ease-out</h1>
  </j5-menu-hamburguer>
  ```

#### Eventos

- **isOpen:** Evento que envía el estado del menú, abierto o cerrado. La información del estado se envía dentro un objeto llamado `detail`, dentro se envía el valor `isOpen` con su respectivo estado.
  ```javascript
  const menu = document.querySelector("j5-menu-hamburguer");
  menu.addEventListener("isOpen", (e) => {
    console.log(e.detail); //{isOpen: true} || {isOpen: false}
  });
  ```

</details>

<details class="detail">
<summary><h3 class="json-head" style="display:inline;"> j5-json-transform: Formatear JSON </h3> </summary>

#### Instrucciones

En el html se usa la etiqueta `j5-json-transform`

```html
<j5-json-transform></j5-json-transform>
```

En el archivo de entrada Js se importa la librería y se ejecuta la función **j5JsonTransform**.

```javascript
// main.js
// Importar la librería y seleccionar j5JsonTransform
import { j5JsonTransform } from "@jaalorsa/j5-components";
// Iniciar el componente al ejecutar la función
j5JsonTransform();
```

#### Valores por defecto

Se encuentra en el selector CSS de etiqueta `j5-json-transform`

```css
j5-json-transform {
  display: block;
  position: relative;
  width: 500px;
  height: 500px;
  --color_primary: #438c40;
  --color_font: #112e09;
  --color_font_light: #f9f9f9;
  --color_popup: var(--color_font);
  --color_popup_font: var(--color_font_light);
  --font-size: 1em;
  --font-family: "Roboto", sans-serif;
  --line-height: 1.5;
}
```

#### Nombre de las clases de los elementos internos

```javascript
  "root": "j5-json-transform",
  "container": "j5-json-transform__container",
  "textArea": "j5-json-transform__textArea",
  "btnContainer": "j5-json-transform__btnContainer",
  "btn": "j5-json-transform__btn",
  "btnCopy": "j5-json-transform__btn--copy",
  "btnClear": "j5-json-transform__btn--clear",
  "popup": "j5-json-transform__popup",
  "textAreaContainer": "j5-json-transform__textAreaContainer"
```

</details>

<details class="detail">
<summary><h3 class="json-head" style="display:inline;"> j5-carousel: Carousel (Slider) </h3> </summary>

#### Instrucciones

En el html se usa la etiqueta `j5-carousel`

```html
<j5-carousel></j5-carousel>
```

En el archivo de entrada Js se importa la librería y se ejecuta la función **j5Carousel**.

```javascript
// main.js
// Importar la librería y seleccionar j5Carousel
import { j5Carousel } from "@jaalorsa/j5-components";
// Iniciar el componente al ejecutar la función
j5Carousel();
```

#### Valores por defecto

Se encuentra en el selector CSS de etiqueta `j5-carousel`

```css
j5-carousel {
  display: block;
  width: fit-content;
  font-size: 16px;
  --color_back_arrows: #000;
  --color_icon: #fff;
  --size_arrows: 1.5em;
  --size_icon: 1.5em;
}
```

#### Nombre de las clases de los elementos internos

```javascript
  "root": "j5-carousel",
  "container": "j5-carousel__container",
  "arrow": "j5-carousel__arrow",
  "arrowLeft": "j5-carousel__arrow--left",
  "arrowRight": "j5-carousel__arrow--right",
  "slides": "j5-carousel__slides",
  "slot": "j5-carousel__slot"
```

#### Atributos

- **count-slides [number]:** La cantidad máxima de elementos visualizados. Por defecto, es 3. **Nota:** Es importante aclarar que el ancho asignado al web component, afecta este comportamiento.
  ```html
  <j5-carousel count-slides="2">
    <div class="item"><span>1</span></div>
    <div class="item"><span>2</span></div>
    <div class="item"><span>3</span></div>
    <div class="item"><span>4</span></div>
    <div class="item"><span>5</span></div>
    <div class="item"><span>6</span></div>
  </j5-carousel>
  ```
- **transition-auto[number]:** Activar la transición automática del slider; si no se añade el atributo, la transición automática no se activará. Recibe un número que representa los milisegundos para hacer la transición. **Nota:** Este es una atributo no reactivo, por lo que no se puede reasignar luego de que el componente se monta en el DOM.
  ```html
  <j5-carousel transition-auto="5000">
    <div class="item"><span>1</span></div>
    <div class="item"><span>2</span></div>
    <div class="item"><span>3</span></div>
    <div class="item"><span>4</span></div>
    <div class="item"><span>5</span></div>
    <div class="item"><span>6</span></div>
  </j5-carousel>
  ```
