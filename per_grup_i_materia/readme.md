# Scripts per introducció massiva de qualificacions per **grup i matèria**

Scripts JavaScript per facilitar la introducció de qualificacions en les pantalles **Qualificacions per grup i matèria**.

Funcionament actual:

```text
Navegador amb Esfera obert
F12
Consola JavaScript
Copiar script
Executar
```

> ⚠️ **RECORDA**
>
> Aquests scripts estan pensats **només** per a la pantalla:
>
> ```text
> Qualificacions per grup i matèria
> ```
>
> Recomanacions:
>
> - provar primer amb **1 o 2 alumnes**;
> - revisar els **logs**;
> - comprovar que les qualificacions s’han guardat correctament;
> - després aplicar massivament.

---

# Funcionament

El procés consta de **4 passos**:

1. Esfera → F12 → consola → executar:

```text
01_copy_codis_ras.js
```

Obtenció dels codis dels **RA** i qualificacions actuals.

---

2. Preparar en un full de càlcul les qualificacions dels **RA**.

Fer *copy*.

---

3. Esfera → F12 → consola → executar:

```text
02_posar_nota_ras.js
```

S’obri una finestra per enganxar el llistat i introduir notes dels **RA**.

---

4. Esfera → F12 → consola → executar:

```text
04_posar_nota_modu.js
```

S’obri una finestra per enganxar el llistat i introduir la nota del **mòdul**.

---

# Fitxers

## `01_copy_codis_ras.js`

Llegeix la taula de qualificacions de la pàgina actual i copia al **portapapers** la informació necessària per preparar les importacions.

### Sortida

Genera dades separades per **tabuladors**:

```text
id_alumne    id_ra    qualificacio_actual
```

Exemple:

```text
23645405977    0179_ICC0_01RA    A8
23645405977    0179_ICC0_02RA    A7
23645405978    0179_ICC0_01RA    A6
```

Serveix per:

- obtenir codis dels RA;
- obtenir identificadors dels alumnes;
- revisar qualificacions actuals.

---

# Preparació dades RA

## Format

Per al fitxer:

```text
02_posar_nota_ras.js
```

Cal preparar:

```text
id_ra    nota
```

Exemple:

```text
0179_ICC0_01RA    A8
0179_ICC0_02RA    A7
0179_ICC0_03RA    A6

0373_ICC0_01RA    A8
0373_ICC0_02RA    A7
```

---

## Qualificadors disponibles

```text
A10
A9
A8
A7
A6
A5
NA
EP
PDT
```

Exemple:

```text
0179_ICC0_01RA    A8
0373_ICC0_01RA    A7
```

---

# `02_posar_nota_ras.js`

Mostra una finestra d’importació.

Inclou:

- àrea gran de text;
- botó **Aplicar**;
- botó **Tancar**;
- zona de logs;
- resum final.

---

## Entrada

Format:

```text
id_ra    nota
```

Exemple:

```text
0179_ICC0_01RA    A8
0179_ICC0_02RA    A7
0179_ICC0_03RA    A6
```

---

## Funcionament

Detecta el desplegable corresponent al RA i aplica:

```text
A10
A9
A8
A7
A6
A5
NA
EP
PDT
```

---

## Resum execució

Exemple:

```text
Inserides: 42
Errors: 1
Total: 43
```

---

# `03_copy_codis_modul.txt`

Conté la informació necessària per identificar:

- alumne;
- nota provisional;
- nota definitiva;
- qualificació qualitativa.

Es fa servir per preparar les importacions del pas següent.

---

# Preparació dades mòdul

Per:

```text
04_posar_nota_modu.js
```

Format:

```text
id_alumne    qualificacioProv    quantitativa    qualitativa
```

---

## Cas 1: PQ

Cal posar:

```text
id_alumne    notaProv        PQ
```

Exemple:

```text
23645405977    7        PQ
```

Accions:

```text
qualificacioProv = 7
quantitativa = buit
qualitativa = PQ
```

---

## Cas 2: NP

Exemple:

```text
23645405978            NP
```

Accions:

```text
qualificacioProv = buit
quantitativa = buit
qualitativa = NP
```

---

## Cas 3: Nota definitiva

Exemple:

```text
23645405979        8
```

Accions:

```text
qualificacioProv = buit
quantitativa = 8
qualitativa = buit
```

Quan hi ha **nota definitiva**, el script esborra automàticament:

```text
qualificacioProv
qualitativa
```

---

# `04_posar_nota_modu.js`

Mostra una finestra per introducció massiva de notes de mòdul.

Inclou:

- àrea gran de text;
- botó **Aplicar**;
- botó **Tancar**;
- resum final.

---

## Entrada

Format:

```text
id_alumne    qualificacioProv    quantitativa    qualitativa
```

Exemples:

PQ:

```text
23645405977    7        PQ
```

NP:

```text
23645405978            NP
```

Definitiva:

```text
23645405979        8
```

---

# Errors habituals

## Alumne no trobat

Exemple:

```text
❌ 23645405977: alumne no trobat
```

Possibles causes:

- grup incorrecte;
- pantalla incorrecta;
- alumne no visible.

---

## Select bloquejat

Exemple:

```text
⛔ select disabled
```

No es pot modificar.

---

## Input bloquejat

Exemple:

```text
⛔ input disabled
```

Camp bloquejat.

---

## Qualificador incorrecte

Exemple:

```text
❌ opció no trobada: A11
```

Només:

```text
A10
A9
A8
A7
A6
A5
NA
EP
PDT
PQ
NP
```

---

# Execució

1. Obrir:

```text
Qualificacions per grup i matèria
```

2. Obrir consola:

```text
F12
```

3. Executar:

```text
01_copy_codis_ras.js
```

4. Preparar dades RA.

5. Executar:

```text
02_posar_nota_ras.js
```

6. Introduir notes RA.

7. Preparar dades mòdul.

8. Executar:

```text
04_posar_nota_modu.js
```

9. Introduir notes mòdul.

10. Revisar logs i comprovar el resultat.

---
