# ADR-001 — Encaje del instrumento cuerpo / afectividad / identidad

**Estado:** Propuesta — pendiente de resolver
**Fecha:** 2026-09-04
**Afecta a:** arquitectura de módulos, `index.html` (hub), navegación, informes

## Contexto

El instrumento sobre cuerpo, afectividad e identidad (59 ítems, cuatro bloques,
facetas Conocer / Comprender / Aceptar / Potenciar de Clara de Cendra) está en fase
de especificación, pendiente de implementación en HTML. Antes de escribir código hay
que decidir dónde encaja, porque la decisión determina la navegación del hub, el
espacio de nombres de `localStorage` y la forma del informe.

Su contenido no pertenece limpiamente a un solo módulo: toca temperamento, carácter,
heridas e identidad a la vez.

## Opciones consideradas

**A. Módulo VIII propio.**
A favor: ubicación clara, un único recorrido, informe autónomo, `localStorage`
sencillo (`identitas_m08`). Fácil de explicar a un formador.
En contra: multiplica módulos; contradice que la materia es transversal por
naturaleza; puede solapar contenido con III y V y confundir al adolescente.

**B. Transversal sobre los módulos existentes.**
A favor: fiel a la naturaleza del contenido; permite que cada bloque se presente
dentro del módulo que le corresponde; evita un octavo módulo cajón de sastre.
En contra: navegación más difícil de comunicar; el informe debe agregar resultados
de varios espacios de nombres; mayor riesgo de que el adolescente no perciba unidad.

**C. Híbrida.** Bloques distribuidos en los módulos existentes, más una vista
transversal que los recompone en un único informe.
A favor: recoge lo mejor de A y B.
En contra: la más costosa de implementar y de mantener coherente.

## Decisión

*Pendiente.*

Antes de decidir conviene fijar: ¿el adolescente lo recorre de una sentada o
fragmentado a lo largo del curso? La respuesta a eso probablemente resuelve la
decisión entera.

## Consecuencias

*Por escribir al cerrar la decisión.*
