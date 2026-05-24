copy(
  (() => {

    const files = [...document.querySelectorAll("tr")]
      .map(tr => {
        const tds = [...tr.querySelectorAll("td")];

        const idCell = tds.find(td => {
          const text = td.innerText.trim();

          return (
            text &&
            !text.includes("\n") &&
            /^[A-Z0-9_]+$/i.test(text)
          );
        });

        if (!idCell) return null;

        const id = idCell.innerText.trim();

        const input =
          tr.querySelector(
            'input[name="quantitativa"]'
          );

        const quant =
          input
            ? input.value.trim()
            : "";

        const estatInput =
          !input
            ? "sense_input"
            : input.disabled
              ? "input_disabled"
              : "input_editable";

        const select =
          tr.querySelector(
            "select"
          );

        const op =
          select?.selectedOptions?.[0];

        const qual =
          op
            ? (
                op.getAttribute(
                  "label"
                )
                ||
                op.textContent.trim()
              )
            : "";

        const estatSelect =
          !select
            ? "sense_select"
            : select.disabled
              ? "select_disabled"
              : "select_editable";

        return [
          id,
          quant,
          qual,
          estatInput,
          estatSelect
        ].join("\t");
      })
      .filter(Boolean);

    // qFinal
    const n1 =
      document.querySelector(
        'input[data-ng-model="qualificacions.lAvaluacions[tabactive].qf1Calculada"]'
      )?.value?.trim() || "";

    // qFinal Uni
    const n2 =
      document.querySelector(
        'input[data-ng-model="qualificacions.lAvaluacions[tabactive].qf2Calculada"]'
      )?.value?.trim() || "";

    files.push(
      ["qFinal", n1].join("\t")
    );

    files.push(
      ["qFinal Uni", n2].join("\t")
    );

    return files.join("\n");

  })()
)
