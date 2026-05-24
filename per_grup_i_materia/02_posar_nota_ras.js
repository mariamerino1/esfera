(function () {

  document.getElementById("importNotesMateriaPanel")?.remove();

  const panel = document.createElement("div");
  panel.id = "importNotesMateriaPanel";
  panel.style = `
    position: fixed;
    top: 20px;
    left: 20px;
    width: 750px;
    background: white;
    border: 2px solid black;
    padding: 12px;
    z-index: 999999;
    box-shadow: 0 4px 12px rgba(0,0,0,.3);
  `;

  panel.innerHTML = `
    <h3>Importar notes per grup i matèria</h3>
    <p>Format: <code>id_alumne TAB nota</code></p>

    <textarea id="notesMateriaInput"
      style="width:100%;height:320px;"
      placeholder="22143774645&#9;A8&#10;22143774646&#9;A6"></textarea>

    <br><br>

    <button id="aplicarNotesMateria">Aplicar notes</button>
    <button id="tancarNotesMateria">Tancar</button>

    <pre id="notesMateriaLog"
      style="height:180px;overflow:auto;background:#eee;padding:8px;"></pre>
  `;

  document.body.appendChild(panel);

  document.getElementById("tancarNotesMateria").onclick = () => panel.remove();

  const norm = s => String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

  const buscaFila = idAlumne =>
    [...document.querySelectorAll("tr")]
      .find(tr => {
        const td = tr.querySelectorAll("td");
        return td[0]?.innerText.trim() === idAlumne;
      });

  function posarSelect(tr, nota) {
    const select = tr.querySelector('select[data-ng-model="el.value"]');

    if (!select) return "❌ select no trobat";
    if (select.disabled) return "⛔ select disabled";

    const opcio = [...select.options].find(op => {
      const label = op.getAttribute("label") || op.textContent.trim();
      const codi = op.value.replace(/^string:/, "");

      return (
        norm(codi) === norm(nota) ||
        norm(op.value) === norm(nota) ||
        norm(label) === norm(nota)
      );
    });

    if (!opcio) return `❌ opció no trobada: ${nota}`;

    select.focus();
    select.value = opcio.value;
    select.dispatchEvent(new Event("change", { bubbles: true }));

    return "✅ nota aplicada";
  }

  document.getElementById("aplicarNotesMateria").onclick = function () {
    const text = document.getElementById("notesMateriaInput").value;

    const dades = text
      .trim()
      .split(/\r?\n/)
      .map(l => l.split(/\t|;/).map(c => c.trim()))
      .filter(c => c.length >= 2)
      .filter(c => norm(c[0]) !== "id_alumne")
      .map(c => ({
        idAlumne: c[0],
        nota: c[1]
      }));

    const log = [];
    let inserides = 0;
    let errors = 0;

    dades.forEach(({ idAlumne, nota }) => {
      const tr = buscaFila(idAlumne);

      if (!tr) {
        errors++;
        log.push(`❌ ${idAlumne}: fila no trobada`);
        return;
      }

      const resultat = posarSelect(tr, nota);

      if (resultat.startsWith("✅")) inserides++;
      else errors++;

      log.push(`${idAlumne}\t${nota}\t${resultat}`);
    });

    const resum =
`\n--- RESUM ---
Inserides: ${inserides}
Errors: ${errors}
Total: ${dades.length}`;

    document.getElementById("notesMateriaLog").textContent =
      log.join("\n") + resum;

    console.clear();
    console.log(log.join("\n") + resum);
  };

})();
