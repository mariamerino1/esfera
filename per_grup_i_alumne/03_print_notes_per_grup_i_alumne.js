copy(
  [...document.querySelectorAll("tr")]
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

      const input = tr.querySelector('input[name="quantitativa"]');
      const quant = input ? input.value.trim() : "";

      const select = tr.querySelector("select");
      const op = select?.selectedOptions?.[0];

      const qual = op
        ? (op.getAttribute("label") || op.textContent.trim())
        : "";

      return [id, quant, qual].join("\t");
    })
    .filter(Boolean)
    .join("\n")
)
