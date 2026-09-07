/* IDENTITAS® — utilidades compartidas
 *
 * Versionado de instrumentos y persistencia local con espacio de nombres.
 *
 * Principio: aquí no se infiere nada. Este archivo guarda y recupera; la
 * puntuación vive en cada instrumento y es determinista y auditable.
 *
 * Uso en cada test, en el <head>:
 *   <meta name="identitas-instrumento" content="m03-afectividad">
 *   <meta name="identitas-version"     content="2.1.0">
 *   <script src="../../assets/identitas.js"></script>
 */
(function (global) {
  'use strict';

  var PREFIJO = 'identitas_';

  function meta(nombre) {
    var el = document.querySelector('meta[name="' + nombre + '"]');
    return el ? el.getAttribute('content') : null;
  }

  var INSTRUMENTO = meta('identitas-instrumento');
  var VERSION = meta('identitas-version') || '0.0.0';

  function mayor(v) {
    return parseInt(String(v).split('.')[0], 10) || 0;
  }

  function clave(instrumento) {
    return PREFIJO + (instrumento || INSTRUMENTO || 'desconocido');
  }

  function disponible() {
    try {
      var k = PREFIJO + '__test';
      localStorage.setItem(k, '1');
      localStorage.removeItem(k);
      return true;
    } catch (e) {
      // Archivo local abierto con file:// o almacenamiento bloqueado.
      // Servido por HTTP desde Netlify esto no debería ocurrir.
      return false;
    }
  }

  /* Guarda un resultado sellado con la versión del instrumento.
     `datos` debe contener solo puntuaciones y respuestas; ningún dato
     identificativo del adolescente. */
  function guardar(datos, instrumento) {
    if (!disponible()) return false;
    var sobre = {
      instrumento: instrumento || INSTRUMENTO,
      version: VERSION,
      fecha: new Date().toISOString(),
      datos: datos
    };
    try {
      localStorage.setItem(clave(instrumento), JSON.stringify(sobre));
      return true;
    } catch (e) {
      return false;
    }
  }

  /* Recupera un resultado. Devuelve null si no hay nada.
     Si la versión mayor almacenada difiere de la actual, marca
     `comparable: false`: los ítems han cambiado y los resultados
     anteriores no son directamente comparables. */
  function leer(instrumento) {
    if (!disponible()) return null;
    var bruto;
    try {
      bruto = localStorage.getItem(clave(instrumento));
    } catch (e) {
      return null;
    }
    if (!bruto) return null;

    var sobre;
    try {
      sobre = JSON.parse(bruto);
    } catch (e) {
      return null;
    }
    sobre.comparable = mayor(sobre.version) === mayor(VERSION);
    return sobre;
  }

  function borrar(instrumento) {
    try {
      localStorage.removeItem(clave(instrumento));
      return true;
    } catch (e) {
      return false;
    }
  }

  /* Lista los resultados guardados de todos los instrumentos. */
  function listar() {
    var salida = [];
    if (!disponible()) return salida;
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (k && k.indexOf(PREFIJO) === 0) salida.push(k.slice(PREFIJO.length));
    }
    return salida;
  }

  /* Avisa al hub anfitrión desde un test embebido en iframe.
     Mantener los nombres de campo alineados con lo que espera el visor. */
  function avisarAnfitrion(tipo, carga) {
    if (global.parent === global) return;
    try {
      global.parent.postMessage({
        origen: 'identitas',
        tipo: tipo,
        instrumento: INSTRUMENTO,
        version: VERSION,
        carga: carga || null
      }, '*');
    } catch (e) {
      /* sin efecto */
    }
  }

  global.IDENTITAS = {
    instrumento: INSTRUMENTO,
    version: VERSION,
    almacenamientoDisponible: disponible,
    guardar: guardar,
    leer: leer,
    borrar: borrar,
    listar: listar,
    avisarAnfitrion: avisarAnfitrion
  };
})(window);
