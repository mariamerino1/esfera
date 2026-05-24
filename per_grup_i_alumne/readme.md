# Scripts per introducció massiva de qualificacions per **grup i alumne**

Scripts JavaScript per facilitar la introducció de qualificacions en les pantalles **Qualificacions per grup i alumne**.
I de moment funciona amb:
navegador amb esfera obert. F12. consola js. copiar script. run

> ⚠️ **RECORDA**
>
> Aquests scripts estan pensats **només** per a la pantalla:
>
> ```text
> Qualificacions per grup i alumne
> ```
> Millor:
>
> - provar primer amb **1 o 2 alumnes**;
> - revisar els **logs**;
> - comprovar que les qualificacions s’han guardat correctament abans d’aplicar-les massivament.

---

## Funcionament

El procés consta de tres passos:

1. Esfera. F12. consola. pegar contingut de `01_obtenir_codis_per_grup_i_alumne.js`. run. Obté codis i qualificacions actuals (**només cal executar-ho una vegada**). Copia els codis al portapapers.
2. Preparar en un full de càlcul les importacions (per fer copy). ⚠️ **si nota de mòdul és definitiva: primer tots els RAs i després mòdul**
3. Esfera. F12. consola. pegar contingut de `02_pegar_notes_per_grup_i_alumne.js`. run. Importa les noves qualificacions: Obri una finestra per pegar el copy del pas 2 i volca les notes a esfera.

*comprobació*: Esfera. F12. consola. pegar contingut de `03_print_notes_per_grup_i_alumne.js`. run. Pega totes les notes d'un alumne a portapers.

---

# Fitxers

## `01_obtenir_codis_per_grup_i_alumne.js`

Llegeix la taula de qualificacions de la pàgina actual d'esfera i copia al **portapapers** un llistat separat per tabuladors.

### Sortida

Genera dades tabulades, copiades al portapapers, amb les columnes:

```text
id	nota_numèrica	nota_qualitativa	estat_input	estat_select
```

Exemple:

```text
0179_ICC0	7		input_editable	select_editable
0179_ICC0_01RA		Assolit-8	sense_input	select_editable
0373_ICC0_01EM		Assolit-9	sense_input	select_editable
```

### Significat de les columnes

| Columna | Descripció |
|---|---|
| `id` | Identificador del mòdul, RA o EM |
| `nota_numèrica` | Nota quantitativa del mòdul |
| `nota_qualitativa` | Qualificador seleccionat |
| `estat_input` | Estat de l’input quantitatiu |
| `estat_select` | Estat del desplegable |

Aquesta info serveix per:

- obtenir els codis reals dels mòduls;
- obtenir els codis dels RA;

Que serviran per preparar dades d’importació. 

>
> El fitxer `02_pegar_notes_per_grup_i_alumne.js` només necessita:
>
> ```text
> id	nota
> ```
> ⚠️ Cal tenir les dades en el full de càlcul preparades per fer copy-paste. Mirar exemple i ordre explicat a continuació
---

# Preparació de dades per importar
## Format

```text
id	nota
```

Exemple:

```text
0179_ICC0_01RA	A8
0179_ICC0_02RA	A7
0179_ICC0_03RA	A6
0179_ICC0	7
```

---

## Ordre IMPORTANT

Cal ordenar les dades de manera que:

1. primer apareguen els **RA** - cal posar el codi, mirar codis més avall, si es posa numèric no introduirà res.
2. després els **EM** - cal posar el codi, no és directament camp numèric
3. finalment la **nota del mòdul** - camp numèric

Exemple correcte:

```text
0179_ICC0_01RA	A8
0179_ICC0_02RA	A7
0179_ICC0_03RA	A6
0179_ICC0	7

0373_ICC0_01EM	A9
0373_ICC0_01RA	A8
0373_ICC0_02RA	A6
0373_ICC0	8
```

Si no està en aquest ordre... no anirà...

---

# Codis utilitzats

## Mòduls

Exemple:

```text
0179_ICC0
0373_ICC0
0614_ICC0
MPO
```

La nota associada és **numèrica**:

```text
0179_ICC0	7
0614_ICC0	8
```

---

## RA

Exemple:

```text
0179_ICC0_01RA
0179_ICC0_02RA
0614_ICC0_03RA
```

Qualificadors disponibles:

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
0179_ICC0_01RA	A8
0179_ICC0_02RA	A7
```

---

## EM

Exemple:

```text
0373_ICC0_01EM
0487_ICC0_01EM
```

Funcionen igual que els RA:

```text
0373_ICC0_01EM	A9
```

---

# `02_pegar_notes_per_grup_i_alumne.js`

Mostra una finestra d’importació dins de la pàgina.

Inclou:

- àrea gran de text;
- botó **Aplicar notes**;
- botó **Tancar**;
- zona de logs;
- resum final.

---

## Format d’entrada

```text
id	nota
```

Exemple:

```text
0179_ICC0_01RA	A8
0179_ICC0_02RA	A7
0373_ICC0_01EM	A9
0179_ICC0	7
0614_ICC0	8
```

---

## Funcionament

El script detecta automàticament el tipus d’element:

### RA

Identificadors acabats en:

```text
RA
```

Exemple:

```text
0179_ICC0_01RA
```

S’aplica al desplegable qualitatiu.

---

### EM

Identificadors acabats en:

```text
EM
```

Exemple:

```text
0373_ICC0_01EM
```

S’aplica al desplegable qualitatiu.

---

### Mòduls

La resta d’identificadors.

Exemple:

```text
0179_ICC0
0614_ICC0
MPO
```

S’apliquen a la nota numèrica.

---

## Resum d’execució

En finalitzar es mostra:

```text
Inserides: X
Errors: Y
Total: Z
```

Exemple:

```text
Inserides: 95
Errors: 2
Total: 97
```

---

# Errors habituals

## `fila no trobada`

Exemple:

```text
❌ 0179_ICC0_01RA: fila no trobada
```

Possibles causes:

- codi incorrecte;
- pantalla equivocada;
- grup incorrecte.

---

## `select disabled`

Exemple:

```text
⛔ select disabled
```

El desplegable està bloquejat i no es pot modificar.

---

## `input disabled`

Exemple:

```text
⛔ input disabled
```

La nota està bloquejada.

---

## `opció no trobada`

Exemple:

```text
❌ opció no trobada: A11
```

Verificar que el qualificador siga:

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

# Execució

1. Obrir:

```text
Qualificacions per grup i alumne
```

2. Obrir la consola:

```text
F12
```

3. Executar:

```text
01_obtenir_codis_per_grup_i_alumne.js
```

4. Preparar dades.

5. Executar:

```text
02_pegar_notes_per_grup_i_alumne.js
```

6. Enganxar el llistat.

7. Prémer:

```text
Aplicar notes
```

8. Revisar logs i comprovar el resultat.

---
