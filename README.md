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

- ### j5-toggle: Toggle

  #### Instrucciones

  En el html se usa la etiqueta `j5-toggle`

  ```html
  <j5-toggle></j5-toggle>
  <j5-toggle checked="true"></j5-toggle>
  <j5-toggle checked="true" label="Incorrecto/Correcto"></j5-toggle>
  <j5-toggle label="Inactivo/Activo"></j5-toggle>
  ```

  En el archivo de entrada Js se importa la librería y se ejecuta la función **insertToggle**.

  ```javascript
  // main.js
  // Importar la librería y seleccionar insertToggle
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
    ```
