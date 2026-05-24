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

        if (!idAlumne || !nomComplet) return null;

        const inputProv = tr.querySelector(
          'input[data-ng-model="alumne.qualificacioProv"]'
        );

        const inputFinal = tr.querySelector(
          'input[data-ng-model="el.quantitativa"]'
        );

        const selectQual = tr.querySelector(
          'select[data-ng-model="el.value"]'
        );

        const notaProvisional = inputProv?.value?.trim() || "";
        const notaFinal = inputFinal?.value?.trim() || "";

        const op = selectQual?.selectedOptions?.[0];

        const qualitativa = op
          ? (
              op.getAttribute("label") ||
              op.textContent.trim()
            )
          : "";

        let comentari = "";

        try {
          const scope = angular.element(tr).scope();
          const alumne = scope?.alumne;

          if (alumne?.comentaris?.length > 0) {
            comentari = alumne.comentaris;
          }
        } catch (e) {
          const icon = tr.querySelector(
            'a[data-ng-click="showDialogMoreOptions(alumne)"]'
          );

          comentari = icon?.classList.contains("emptyIcon")
            ? ""
            : "amb comentari";
        }

        return [
          idAlumne,
          [
            idAlumne,
            nomComplet,
            notaProvisional,
            notaFinal,
            qualitativa,
            comentari
          ].join("\t")
        ];
      })
      .filter(Boolean)
  ).values()].join("\n")
)
