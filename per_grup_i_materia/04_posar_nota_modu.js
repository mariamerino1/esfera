(function () {

  document.getElementById("importModulPanel")?.remove();

  const panel = document.createElement("div");
  panel.id = "importModulPanel";

  panel.style = `
    position:fixed;
    top:20px;
    left:20px;
    width:850px;
    background:white;
    border:2px solid black;
    padding:12px;
    z-index:999999;
    box-shadow:0 4px 12px rgba(0,0,0,.3);
  `;

  panel.innerHTML = `
    <h3>Importar notes de mòdul</h3>

    <p>Format:</p>
    <pre>id_alumne    qualificacioProv    quantitativa    qualitativa</pre>

    <textarea
      id="notesModul"
      style="width:100%;height:300px;"
      placeholder="23645405977&#9;7&#9;&#9;PQ&#10;23645405978&#9;&#9;8&#9;&#10;23645405979&#9;&#9;&#9;NP"
    ></textarea>

    <br><br>

    <button id="aplicarModul">Aplicar</button>
    <button id="tancarModul">Tancar</button>

    <pre id="logModul" style="height:180px;overflow:auto;background:#eee;padding:8px;"></pre>
  `;

  document.body.appendChild(panel);

  document.getElementById("tancarModul").onclick = () => panel.remove();

  document.getElementById("aplicarModul").onclick = function () {

    const log = [];
    let ok = 0;
    let err = 0;

    const text = document.getElementById("notesModul").value.trim();

    if (!text) {
      document.getElementById("logModul").textContent = "No s'ha enganxat cap dada.";
      return;
    }

    const dades = text
      .split(/\r?\n/)
      .map(l => l.split("\t").map(x => (x || "").trim()))
      .filter(fila => fila.length >= 2)
      .filter(fila => fila[0].toLowerCase() !== "id_alumne");

    function angularApply(el, callback) {
      const scope = angular.element(el).scope();
      scope.$applyAsync(callback);
    }

    function disparaCanvis(el) {
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }

    dades.forEach(fila => {

      const id = fila[0] || "";
      const prov = fila[1] || "";
      const def = fila[2] || "";
      const qual = (fila[3] || "").toUpperCase();

      const tr = [...document.querySelectorAll("tr")]
        .find(tr => tr.querySelector("td")?.innerText.trim() === id);

      if (!tr) {
        err++;
        log.push(`❌ ${id}: alumne no trobat`);
        return;
      }

      const inputProv = tr.querySelector('input[data-ng-model="alumne.qualificacioProv"]');
      const inputDef = tr.querySelector('input[data-ng-model="el.quantitativa"]');
      const selectQual = tr.querySelector('select[data-ng-model="el.value"]');

      function posarProv(valor) {
        if (!inputProv || inputProv.disabled) return false;

        angularApply(inputProv, function () {
          const s = angular.element(inputProv).scope();
          s.alumne.qualificacioProv = Number(valor);
        });

        inputProv.value = valor;
        disparaCanvis(inputProv);
        return true;
      }

      function buidarProv() {
        if (!inputProv || inputProv.disabled) return true;

        angularApply(inputProv, function () {
          const s = angular.element(inputProv).scope();
          s.alumne.qualificacioProv = null;
        });

        inputProv.value = "";
        disparaCanvis(inputProv);
        return true;
      }

      function posarDef(valor) {
        if (!inputDef || inputDef.disabled) return false;

        angularApply(inputDef, function () {
          const s = angular.element(inputDef).scope();
          s.el.quantitativa = Number(valor);

          if (typeof s.onChangeQualitativa === "function") {
            s.onChangeQualitativa(s.el, s.alumne);
          }
        });

        inputDef.value = valor;
        disparaCanvis(inputDef);
        return true;
      }

      function buidarDef() {
        if (!inputDef || inputDef.disabled) return true;

        angularApply(inputDef, function () {
          const s = angular.element(inputDef).scope();
          s.el.quantitativa = null;

          if (typeof s.onChangeQualitativa === "function") {
            s.onChangeQualitativa(s.el, s.alumne);
          }
        });

        inputDef.value = "";
        disparaCanvis(inputDef);
        return true;
      }

      function posarQual(valor) {
        if (!selectQual || selectQual.disabled) return false;

        const op = [...selectQual.options]
          .find(x => x.value === `string:${valor}`);

        if (!op) return false;

        angularApply(selectQual, function () {
          const s = angular.element(selectQual).scope();
          s.el.value = valor;

          if (typeof s.onChangeSelectQualitativa === "function") {
            s.onChangeSelectQualitativa(s.el, s.alumne);
          }
        });

        selectQual.value = op.value;
        disparaCanvis(selectQual);
        return true;
      }

      function buidarQual() {
        if (!selectQual || selectQual.disabled) return true;

        angularApply(selectQual, function () {
          const s = angular.element(selectQual).scope();
          s.el.value = null;

          if (typeof s.onChangeSelectQualitativa === "function") {
            s.onChangeSelectQualitativa(s.el, s.alumne);
          }
        });

        selectQual.value = "";
        disparaCanvis(selectQual);
        return true;
      }

      if (qual === "PQ") {
        const r0 = buidarDef();
        const r1 = prov ? posarProv(prov) : false;
        const r2 = posarQual("PQ");

        if (r0 && r1 && r2) {
          ok++;
          log.push(`✅ ${id}: provisional ${prov} + PQ`);
        } else {
          err++;
          log.push(`❌ ${id}: no s'ha pogut posar provisional + PQ`);
        }

        return;
      }

      if (qual === "NP") {
        const r0 = buidarProv();
        const r1 = buidarDef();
        const r2 = posarQual("NP");

        if (r0 && r1 && r2) {
          ok++;
          log.push(`✅ ${id}: NP`);
        } else {
          err++;
          log.push(`❌ ${id}: no s'ha pogut posar NP`);
        }

        return;
      }

      if (!qual) {
        const r0 = buidarProv();
        const r1 = buidarQual();
        const r2 = def ? posarDef(def) : false;

        if (r0 && r1 && r2) {
          ok++;
          log.push(`✅ ${id}: definitiva ${def}; provisional i qualitativa esborrades`);
        } else {
          err++;
          log.push(`❌ ${id}: no s'ha pogut posar definitiva o esborrar camps`);
        }

        return;
      }

      err++;
      log.push(`❌ ${id}: qualitativa no vàlida (${qual})`);
    });

    log.push("");
    log.push("--- RESUM ---");
    log.push(`Inserides: ${ok}`);
    log.push(`Errors: ${err}`);
    log.push(`Total: ${dades.length}`);

    document.getElementById("logModul").textContent = log.join("\n");
    console.clear();
    console.log(log.join("\n"));
  };

})();
