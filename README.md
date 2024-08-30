![Static Badge](https://img.shields.io/badge/license-MIT-blue?style=plastic) [![deploy](https://github.com/jaalorsa517/j5-components/actions/workflows/deploy-npm.yml/badge.svg?branch=main)](https://github.com/jaalorsa517/j5-components/actions/workflows/deploy-npm.yml) [![Unit Test](https://github.com/jaalorsa517/j5-components/actions/workflows/unit-test.yml/badge.svg)](https://github.com/jaalorsa517/j5-components/actions/workflows/unit-test.yml)

# J5-Components: Librería web components

## Descripción

Librería de componentes web, para ayudar al desarrollador javascript en su día a día. Como la librería está hecha en javascript vanilla, se puede utilizar en cualquier proyecto javascript, sin importar el framework usado.

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
- Todos los componentes heredan de una clase Abstracta, la cual tiene una función, llamada **getElement** o **getElements**, que permite acceder a cualquier elemento interno del Shadow Dom.

  ```javascript
  const toggle = document.querySelector("j5-toggle");
  const containerShadow = toggle.getElement(".j5-toggle__container");
  ```

- Personalizar los estilos de los componentes de acuerdo a la necesidad del proyecto. Cada componente tiene definidas unas **variables de CSS**, que al reescribirlas se pueden personalizar los estilos. También los tamaños vienen definidos en unidades `em`, por lo que modificando el `font-size` de un componente, se puede modificar el tamaño de todos los componentes. Además, componentes que no tengan ShadowDom, se puede personalizar todo lo que se requiera. **TENER EN CUENTA** los fundamentos de CSS en el tema de especificidad. Más información en: [CSS Especificidad](https://developer.mozilla.org/es/docs/Web/CSS/Specificity)
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
<summary><strong > j5-carousel: Carousel (Slider) </strong> </summary>

#### Instrucciones

En el html se usa la etiqueta `j5-carousel`. Este componente usa Shadow Dom, por lo tanto, cuando se requiera modificar estilos, se hacen a través de las variables de CSS.

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

Se puede insertar el componente desde javascript:

```javascript
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
body.appendChild(carousel);
```

#### Valores por defecto

Se encuentra en el selector CSS de etiqueta `j5-carousel`

```css
j5-carousel {
  display: block;
  width: fit-content;
  font-size: 16px;
  --color_back_arrows: #252525;
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
  </details>

<details class="detail">
<summary><strong> j5-collapse: Collapse (Acordeón) </strong> </summary>

#### Instrucciones

En el html se usa la etiqueta `j5-collapse`. Este es un componente que no usa el Shadow DOM, por lo tanto, se puede asignar estilos desde el proyecto padre. Para eso, hay que tener claro el [concepto de específicidad](https://youtu.be/c3-fse8KPVo), ya que los estilos del web component se montan luego de cargar el DOM.

Para usar este componente, se requiere asignar dos secciones: una para el resumen y otra para el contenido. Para esto, se usa el atributo `slot` con los valores `summary` y `content`.

```html
<j5-collapse>
  <section slot="summary">
    <div class="container">
      <h2>El lorem</h2>
    </div>
  </section>
  <section slot="content">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque at commodi error aut architecto voluptas
      aperiam fugiat accusamus iste rerum porro velit vel cum, eveniet exercitationem quos iusto omnis
      repellat.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque at commodi error aut architecto voluptas
      aperiam fugiat accusamus iste rerum porro velit vel cum, eveniet exercitationem quos iusto omnis
      repellat.
    </p>
  </section>
</j5-collapse>
```

En el archivo de entrada Js se importa la librería y se ejecuta la función **j5Collapse**.

```javascript
// main.js
// Importar la librería y seleccionar j5Collapse
import { j5Collapse } from "@jaalorsa/j5-components";
// Iniciar el componente al ejecutar la función
j5Collapse();
```

#### Valores por defecto

Se encuentra en el selector CSS de etiqueta `j5-collapse`

```css
j5-collapse {
  display: block;
  width: 500px;
  color: #112e09;
  font-size: 1em;
  font-family: "Roboto", sans-serif;
}
```

#### Nombre de las clases de los elementos internos

```javascript
Componente: `j5-collapse`,
Contenedor: `j5-collapse__container`,
```

#### Atributos

- **eventmanual [string = true | false]:** Atributo para indicar si el acordeón se activa con darle click al *slot summary* o sí se prefiere que se active con algun evento del slot summary. Por defecto es `false`. **Nota:** Cualquier valor que no sea válido, el atributo tomará el valor por defecto. |
  ```html
  <j5-collapse class="collapse dos" eventmanual="true">
    <section slot="summary" class="summary title">
      <div class="container">
        <h2>El lorem</h2>
        <button class="btn summary">Leer texto</button>
      </div>
    </section>
    <section slot="content" id="content2" class="content dos">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque at commodi error aut architecto
        voluptas aperiam fugiat accusamus iste rerum porro velit vel cum, eveniet exercitationem quos iusto
        omnis repellat.
      </p>
    </section>
  </j5-collapse>
  <script>
    const btn = document.querySelector(".btn");
    const collapse2 = document.querySelector(".collapse.dos");
    btn.addEventListener("click", () => {
      collapse2.setAttribute("isopen", "true");
    });
  </script>
  ```
- **isopen [string= true | false]:** Atributo para indicar si el *slot content* se muestra o no. Por defecto es `false`. **Nota:** Cualquier valor que no sea válido, el atributo tomará el valor por defecto.
  ```html
  <j5-collapse isopen="true">
    <section slot="summary" class="summary title">
      <h2>El lorem</h2>
    </section>
    <section slot="content">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque at commodi error aut architecto
        voluptas aperiam fugiat accusamus iste rerum porro velit vel cum, eveniet exercitationem quos iusto
        omnis repellat.
      </p>
    </section>
  </j5-collapse>
  ```

#### Eventos

- **isOpen:** Evento que envía el estado del acordeón, abierto o cerrado. La información del estado se envía dentro un objeto llamado `detail`, dentro se envía el valor `isOpen` con su respectivo estado.
  ```javascript
  const acordeon = document.querySelector("j5-collapse");
  acordeon.addEventListener("isOpen", (e) => {
    console.log(e.detail); //{isOpen: true} || {isOpen: false}
  });
  ```

</details>

<details class="detail">
<summary><strong> j5-json-transform: Formatear JSON </strong> </summary>

#### Instrucciones

En el html se usa la etiqueta `j5-json-transform`. Este es un componente que no usa el Shadow DOM, por lo tanto, se puede asignar estilos desde el proyecto padre. Para eso, hay que tener claro el [concepto de específicidad](https://youtu.be/c3-fse8KPVo), ya que los estilos del web component se montan luego de cargar el DOM.

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

Para insertar el componente desde javascript:

```javascript
const jsonTransform = document.createElement("j5-json-transform");
document.body.appendChild(jsonTransform);
```

#### Valores por defecto

Se encuentra en el selector CSS de etiqueta `j5-json-transform`

```css
j5-json-transform {
  display: block;
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
  --color_error: #bb0000;
}
```

#### Nombre de las clases de los elementos internos

```javascript
  "root": "j5-json-transform",
  "container": "j5-json-transform__container",
  "textArea": "j5-json-transform__textArea",
  "textAreaError": "j5-json-transform__textArea--error",
  "btnContainer": "j5-json-transform__btnContainer",
  "btn": "j5-json-transform__btn",
  "btnCopy": "j5-json-transform__btn--copy",
  "btnClear": "j5-json-transform__btn--clear",
  "btnFormat": "j5-json-transform__btn--format",
  "popup": "j5-json-transform__popup",
  "textAreaContainer": "j5-json-transform__textAreaContainer",
  "errorInput": "j5-json-transform__error"
```

</details>

<details class="detail">
<summary><strong> j5-menu-hamburguer: Menú hamburguesa </strong> </summary>

#### Instrucciones

En el html se usa la etiqueta `j5-menu-hamburguer`. Este es un componente que no usa el Shadow DOM, por lo tanto, se puede asignar estilos desde el proyecto padre. Para eso, hay que tener claro el [concepto de específicidad](https://youtu.be/c3-fse8KPVo), ya que los estilos del web component se montan luego de cargar el DOM.

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

O se puede inyectar todo desde javascript

```javascript
const menu2 = document.createElement("j5-menu-hamburguer");
menu2.innerHTML = `
  <li>Hola</li>
  <li>Adios</li>
`;
menu2.setAttribute("animation", "slide_in_out_3");
menu2.setAttribute("isopen", "true");
body.appendChild(menu2);
```

Es **importante** tener en cuenta que la asignación de atributos se tiene que hacer luego que se agrega el elemento al DOM.

#### Valores por defecto

Se encuentra en el selector CSS de etiqueta `j5-menu-hamburguer`

```css
j5-menu-hamburguer {
  display: block;
  font-size: 10px;
  position: relative;
  --color: #438c40;
  --colorActive: #438c40;
  --menuPositionTop: 0;
  --menuPositionLeft: 0;
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

- **animation [string = fade_in_out | slide_in_out_1 | slide_in_out_2 | slide_in_out_3 | slide_in_out_4]:** Atributo para indicar la animación. El valor por default es `fade_in_out`.

  ```html
  <j5-menu-hamburguer>
    <h1>Default es fade_in_out</h1>
  </j5-menu-hamburguer>
  <j5-menu-hamburguer animation="slide_in_out_1">
    <h1>slide_in_out_1</h1>
  </j5-menu-hamburguer>
  <j5-menu-hamburguer animation="slide_in_out_2">
    <h1>slide_in_out_2</h1>
  </j5-menu-hamburguer>
  <j5-menu-hamburguer animation="slide_in_out_3">
    <h1>slide_in_out_3</h1>
  </j5-menu-hamburguer>
  <j5-menu-hamburguer animation="slide_in_out_4">
    <h1>slide_in_out_4</h1>
  </j5-menu-hamburguer>
  ```

- **isopen [string= true | false]:** Atributo para indicar si el menu se muestra o no. Por defecto es `false`. **Nota:** Cualquier valor que no sea válido, el atributo tomará el valor por defecto.
 ```html
  <j5-menu-hamburguer>
    <h1>Default es false</h1>
  </j5-menu-hamburguer>
  <j5-menu-hamburguer isopen="true">
    <h1>isopen: true</h1>
  </j5-menu-hamburguer>
  <j5-menu-hamburguer isopen="false">
    <h1>isopen: false</h1>
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
<summary><strong> j5-toggle: Toggle </strong></summary>

#### Instrucciones

En el html se usa la etiqueta `j5-toggle`. Este elemento usa el Shadow DOM, por lo que personalizar los estilos requiere sobreescribir las variables de CSS.

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
  width: fit-content;
  display: block;
  font-size: 10px;
  box-sizing: border-box;
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
<summary><strong> j5-tooltip: Tooltip </strong> </summary>

#### Instrucciones

En el html se usa la etiqueta `j5-tooltip`. Este es un componente que utiliza el Shadow DOM, por lo que los estilos se tiene que modificar sobrescribiendo las variables de CSS.

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

## Servicios

### J5HttpClient

Es un servicio de JavaScript que utiliza el cliente **HTTP** para realizar solicitudes AJAX. Este servicio permite consumir APIs RESTful.
Recibe como parámetro el objeto window del navegador. Esto se debe a que, internamente, usa el window.fetch.

El servicio tiene disponible los métodos **GET**, **POST**, **PUT**, **PATCH** y **DELETE**. También dispone del tipo **J5HttpHeader** y **J5HttpBody** usados para la petición. Y dispone de las interfaces **J5HttpGetI**, **J5HttpPostI**, **J5HttpPutI**, **J5HttpPatchI**, **J5HttpDeleteI**.

```javascript
// Importar la librería y seleccionar j5HttpClient
import { J5HttpBody, J5HttpClient, J5HttpHeader } from "@jaalorsa/j5-components";
const httpClient = new J5HttpClient(window);

const headers:J5HttpHeader = {
  "Content-Type": "application/json",
  "Accept": "application/json",}

const boyd: J5HttpBody={
  name: "John",
  age: 30,
  city: "New York"
}

const httpClient = new J5HttpClient(window)

httpClient.get("https://testurl.com", headers)
httpClient.post("https://testurl.com", boyd, headers)
httpClient.put("https://testurl.com", boyd, headers)
httpClient.patch("https://testurl.com", boyd, headers)
httpClient.delete("https://testurl.com", headers)
```