(function () {

  document
    .getElementById(
      "importNotesPanel"
    )
    ?.remove();

  const panel =
    document.createElement(
      "div"
    );

  panel.id =
    "importNotesPanel";

  panel.style = `
    position:fixed;
    top:20px;
    left:20px;
    width:800px;
    background:white;
    border:2px solid black;
    padding:12px;
    z-index:999999;
  `;

  panel.innerHTML = `
    <h3>
      Importar notes
    </h3>

    <p>
      Format:
      id TAB nota
    </p>

    <textarea
      id="notesInput"
      style="
        width:100%;
        height:320px;
      "
    ></textarea>

    <br><br>

    <button
      id="aplicarNotes"
    >
      Aplicar notes
    </button>

    <button
      id="tancarNotes"
    >
      Tancar
    </button>

    <pre
      id="notesLog"
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
      "tancarNotes"
    )
    .onclick =
      ()=>panel.remove();

  const norm =
    s=>
      String(s||"")
      .trim()
      .toUpperCase();

  function posarSelect(
    tr,
    nota
  ){

    const select =
      tr.querySelector(
        "select"
      );

    if(
      !select
    ) return false;

    const op =
      [...select.options]
      .find(
        o=>
          norm(
            o.value
              .replace(
                "string:",
                ""
              )
          )
          ===
          norm(
            nota
          )
      );

    if(
      !op
    ) return false;

    select.value =
      op.value;

    select.dispatchEvent(
      new Event(
        "change",
        {
          bubbles:true
        }
      )
    );

    return true;

  }

  function posarInput(
    tr,
    nota
  ){

    const input =
      tr.querySelector(
        'input[name="quantitativa"]'
      );

    if(
      !input
    ) return false;

    input.value =
      nota;

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

    return true;

  }

  document
    .getElementById(
      "aplicarNotes"
    )
    .onclick =
      function(){

      const text =
        document
        .getElementById(
          "notesInput"
        )
        .value;

      const files =
        text
        .trim()
        .split(
          /\r?\n/
        )
        .map(
          l=>
            l.split(
              /\t|;/
            )
        )
        .map(
          ([id,nota])=>({
            id:id.trim(),
            nota:nota.trim()
          })
        );

      const ra =
        files.filter(
          x=>
            /RA$/.test(
              x.id
            )
        );

      const em =
        files.filter(
          x=>
            /EM$/.test(
              x.id
            )
        );

      const mod =
        files.filter(
          x=>
            !/RA$|EM$/.test(
              x.id
            )
        );

      const ordre =
        [
          ...ra,
          ...em,
          ...mod
        ];

      const log=[];

      let ok=0;
      let err=0;

      ordre.forEach(
        x=>{

        const tr =
          [...document
          .querySelectorAll(
            "tr"
          )]
          .find(
            tr=>{

            const td=
              tr.querySelectorAll(
                "td"
              );

            return [...td]
              .some(
                td=>
                  td
                  .innerText
                  .trim()
                  ===
                  x.id
              );

          });

        if(
          !tr
        ){

          err++;

          log.push(
            `❌ ${x.id}`
          );

          return;

        }

        const r=
          /RA$|EM$/
          .test(
            x.id
          )
          ? posarSelect(
              tr,
              x.nota
            )
          : posarInput(
              tr,
              x.nota
            );

        if(
          r
        ){

          ok++;

          log.push(
            `✅ ${x.id}`
          );

        }else{

          err++;

          log.push(
            `❌ ${x.id}`
          );

        }

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
        "notesLog"
      )
      .textContent=
        log.join(
          "\n"
        );

  };

})();
