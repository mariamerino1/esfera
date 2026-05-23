(function () {

  document
    .getElementById(
      "importModulPanel"
    )
    ?.remove();

  const panel =
    document.createElement(
      "div"
    );

  panel.id =
    "importModulPanel";

  panel.style = `
    position:fixed;
    top:20px;
    left:20px;
    width:800px;
    background:white;
    border:2px solid black;
    padding:10px;
    z-index:999999;
  `;

  panel.innerHTML = `
    <h3>
      Importar notes mòdul
    </h3>

    <textarea
      id="notesModul"
      style="
        width:100%;
        height:300px;
      "
      placeholder=
"id_alumne<TAB>qualificacioProv<TAB>quantitativa<TAB>qualitativa"
    ></textarea>

    <br><br>

    <button
      id="aplicarModul"
    >
      Aplicar
    </button>

    <button
      id="tancarModul"
    >
      Tancar
    </button>

    <pre
      id="logModul"
      style="
        height:180px;
        overflow:auto;
        background:#eee;
      "
    ></pre>
  `;

  document.body
    .appendChild(
      panel
    );

  document
    .getElementById(
      "tancarModul"
    )
    .onclick =
      ()=>panel.remove();

  const log=[];

  let ok=0;
  let err=0;

  document
    .getElementById(
      "aplicarModul"
    )
    .onclick =
      function(){

    log.length=0;

    const dades=
      document
      .getElementById(
        "notesModul"
      )
      .value
      .trim()
      .split(/\r?\n/)
      .map(
        l=>
        l.split("\t")
      );

    dades.forEach(
      fila=>{

      const [
        id,
        prov,
        def,
        qual
      ]=fila.map(
        x=>
        (x||"").trim()
      );

      const tr=
        [...document
        .querySelectorAll(
          "tr"
        )]
        .find(
          tr=>
          tr
          .querySelector(
            "td"
          )
          ?.innerText
          .trim()
          ===id
        );

      if(!tr){

        err++;

        log.push(
          `❌ ${id} no trobat`
        );

        return;

      }

      // provisional
      if(prov){

        const input=
          tr.querySelector(
            'input[data-ng-model="alumne.qualificacioProv"]'
          );

        if(
          input
          &&
          !input.disabled
        ){

          input.value=
            prov;

          input.dispatchEvent(
            new Event(
              "input",
              {
                bubbles:true
              }
            )
          );

          input.dispatchEvent(
            new Event(
              "change",
              {
                bubbles:true
              }
            )
          );

        }

      }

      // definitiva
      if(def){

        const input=
          tr.querySelector(
            'input[data-ng-model="el.quantitativa"]'
          );

        if(
          input
          &&
          !input.disabled
        ){

          input.value=
            def;

          input.dispatchEvent(
            new Event(
              "input",
              {
                bubbles:true
              }
            )
          );

          input.dispatchEvent(
            new Event(
              "change",
              {
                bubbles:true
              }
            )
          );

        }

      }

      // PQ NP
      if(qual){

        const select=
          tr.querySelector(
            'select[data-ng-model="el.value"]'
          );

        if(
          select
          &&
          !select.disabled
        ){

          const op=
            [...select.options]
            .find(
              x=>
              x.value
              ===
              `string:${qual}`
            );

          if(op){

            select.value=
              op.value;

            select.dispatchEvent(
              new Event(
                "change",
                {
                  bubbles:true
                }
              )
            );

          }

        }

      }

      ok++;

      log.push(
        `✅ ${id}`
      );

    });

    log.push(
      ""
    );

    log.push(
      `Inserides ${ok}`
    );

    log.push(
      `Errors ${err}`
    );

    document
    .getElementById(
      "logModul"
    )
    .textContent=
      log.join(
        "\n"
      );

  };

})();
