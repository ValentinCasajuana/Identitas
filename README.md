# IDENTITAS®

Plataforma de autoconocimiento y desarrollo de la identidad para adolescentes.
Instrumentos de autoevaluación estructurada sobre marco antropológico y filosófico.

**Sitio publicado:** https://identitas-project.netlify.app/

---

## Regla número uno

**Lo que está en `main` es lo publicado.** No existe otra "última versión".
Si un archivo no está en este repositorio, no cuenta. Si está en Descargas, no cuenta.

---

## Estructura

```
identitas/
├─ index.html                 Hub / portada. Visor iframe + postMessage.
├─ netlify.toml               Configuración de despliegue.
├─ assets/
│   ├─ identitas.css          Variables de diseño compartidas.
│   └─ identitas.js           Versionado de instrumentos + helpers localStorage.
├─ modulos/                   CAPA ADOLESCENTE
│   ├─ m03-genero-sexo/
│   └─ m07-dependencias/
├─ formadores/                CAPA ADULTA (guías de acompañamiento)
└─ docs/
    ├─ especificaciones/      El spec siempre precede al HTML.
    ├─ decisiones/            Un ADR por decisión de arquitectura.
    ├─ marco-legal.md         Restricciones de diseño (Ley 4/2023, etc.).
    └─ CHANGELOG.md           Historial legible del proyecto.
```

La separación entre `modulos/` (adolescente) y `formadores/` (adulto) refleja en el
sistema de archivos la separación arquitectónica que el proyecto ya exige.

> **Aviso:** poner algo en `formadores/` es organización, **no** control de acceso.
> Cualquiera que adivine la ruta entra. Si esa capa debe estar realmente cerrada,
> hay que resolverlo aparte (ver `docs/decisiones/`).

---

## Convenciones

### 1. Versionado de instrumentos

Esto es lo más importante y lo más fácil de olvidar. Si cambian los ítems, los
resultados anteriores dejan de ser comparables. Cada instrumento declara su versión
en la cabecera del HTML:

```html
<meta name="identitas-instrumento" content="m03-afectividad">
<meta name="identitas-version" content="2.1.0">
```

| Cambio | Qué subir |
|---|---|
| Corrección de redacción, maquetación, textos de resultado | patch → `2.1.1` |
| Reordenación de ítems, ajuste de umbrales o bandas | menor → `2.2.0` |
| Añadir, quitar o reescribir ítems; cambiar la puntuación | mayor → `3.0.0` |

`assets/identitas.js` guarda esa versión junto a cada resultado y avisa cuando un
resultado almacenado procede de una versión mayor distinta.

### 2. Nombres de archivo

Nunca `final`, `bueno`, `v2`, `definitivo`, `_OK`, ni fechas en el nombre.
El historial de Git ya hace eso. Nombres descriptivos y estables:
`test-afectividad.html`, no `test-afectividad-final-3-bueno.html`.

### 3. Mensajes de cambio (commits)

Una línea, en presente, diciendo **qué** y **por qué** si no es obvio:

```
M03: reformula ítems 12 y 17 para evitar lenguaje de identidad
M07: corrige escalada de apoyo cuando búsqueda es alta y validez baja
Docs: añade ADR-001 sobre instrumento transversal
```

### 4. Ramas

Para cambios pequeños, directo a `main`.
Para un instrumento nuevo o una reescritura, rama `m03-afectividad-v3`: Netlify
genera una URL de vista previa para probar en el iPad antes de publicar.

---

## Flujo de trabajo

### Cambio normal

1. Editar en github.com (dentro del repo, pulsar `.` abre un editor completo en el navegador).
2. Guardar con un mensaje descriptivo.
3. Netlify despliega solo, ~20 s.
4. Verificar en el iPad sobre la URL publicada.
5. Anotar el cambio en `docs/CHANGELOG.md` si es sustantivo.

### Cambio trabajado con IA

1. **Descargar el archivo desde el repositorio**, nunca desde Descargas.
2. Subirlo al inicio de la conversación.
3. Decir explícitamente si se quiere **el archivo completo** o **un parche puntual**.
4. Recibir el resultado y **subirlo al repositorio inmediatamente**.
   El archivo que se queda reposando en Descargas es exactamente la versión que se pierde.
5. Verificar sobre la URL publicada.

Una conversación por frente de trabajo (un módulo, un instrumento). No una única
conversación infinita.

---

## Qué NO va en este repositorio

- **Datos de adolescentes.** Nunca. Ni respuestas, ni exportaciones, ni capturas de
  pantalla con resultados reales, ni ficheros de prueba con datos de personas reales.
  Este repositorio es para código y documentación.
- Materiales de curso de terceros que no puedan redistribuirse. Si se necesitan como
  referencia, se citan en `docs/`, no se copian.
- Claves, tokens o credenciales de ningún tipo.

El repositorio es **privado**. Aun así, todo lo anterior sigue aplicando.

---

## Principios de diseño que no se negocian

Vigentes en todos los instrumentos, y presentes en toda revisión:

- El instrumento **provoca preguntas, no produce etiquetas**. Los informes abren por
  el margen de libertad antes que por los déficits y cierran en pregunta, no en conclusión.
- Lenguaje de situación, no de ser: *"sueles decidir así"*, nunca *"eres así"*.
- La fórmula **"condiciona, pero no determina"** aparece en todos los instrumentos.
- Minimización estricta de datos. Ningún ítem recoge, infiere ni permite cruzar
  información sobre orientación o identidad.
- La puntuación es **determinista y auditable**. La IA genera narrativa; nunca infiere
  ni diagnostica.
- Los ítems de salvaguarda activan un **protocolo humano** vinculado a la vía de apoyo
  del centro, nunca un disparo algorítmico.
- Acceso permanente a ayuda visible: ANAR 116 111.

Detalle de las restricciones legales en `docs/marco-legal.md`.
