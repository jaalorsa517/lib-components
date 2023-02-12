import { j5Collapse } from "lib/main";
import { header } from "../header.js";

header();
j5Collapse();

const main = document.getElementById("main");
const container = document.createElement("div");
container.className = "container";
const collapse = document.createElement("j5-collapse");
collapse.innerHTML = `
  <section slot="summary" class="summary title">
    <div class="container">
      <h2>El lorem</h2>
      <button class="btn summary">Leer texto</button>
    </div>
  </section>
  <section slot="content" id="content2" class="content dos">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque at commodi error aut architecto
      voluptas aperiam fugiat accusamus iste rerum porro velit vel cum, eveniet exercitationem quos
      iusto omnis repellat.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque at commodi error aut architecto
      voluptas aperiam fugiat accusamus iste rerum porro velit vel cum, eveniet exercitationem quos
      iusto omnis repellat.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque at commodi error aut architecto
      voluptas aperiam fugiat accusamus iste rerum porro velit vel cum, eveniet exercitationem quos
      iusto omnis repellat.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque at commodi error aut architecto
      voluptas aperiam fugiat accusamus iste rerum porro velit vel cum, eveniet exercitationem quos
      iusto omnis repellat.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque at commodi error aut architecto
      voluptas aperiam fugiat accusamus iste rerum porro velit vel cum, eveniet exercitationem quos
      iusto omnis repellat.
    </p>
  </section>
`;

collapse.setAttribute("eventmanual", "false");
collapse.setAttribute("isopen", "true");

container.appendChild(collapse);
main.appendChild(container);
