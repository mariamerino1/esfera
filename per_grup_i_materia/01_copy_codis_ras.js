copy(
  [...new Map(
    [...document.querySelectorAll("tr")]
      .map(tr => {
        const td = [...tr.querySelectorAll("td")];

        if (td.length < 4) return null;

        const idAlumne = td[0]?.innerText.trim() || "";
        const cognom1 = td[1]?.innerText.trim() || "";
        const cognom2 = td[2]?.innerText.trim() || "";
        const nom = td[3]?.innerText.trim() || "";

        const nomComplet = `${cognom1} ${cognom2} ${nom}`.trim();

        const select = tr.querySelector('select[data-ng-model="el.value"]');

        if (!idAlumne || !nomComplet || !select) return null;

        const op = select.selectedOptions[0];

        const nota = op
          ? (op.getAttribute("label") || op.textContent.trim())
          : "";

        const estat = select.disabled
          ? "select_disabled"
          : "select_editable";

        return [
          idAlumne,
          [
            idAlumne,
            nomComplet,
            nota,
            estat
          ].join("\t")
        ];
      })
      .filter(Boolean)
  ).values()].join("\n")
)
