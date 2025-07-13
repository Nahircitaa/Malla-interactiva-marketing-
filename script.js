const prerequisitos = {
  "Nivelación en matemáticas": ["Matemática I", "Economía General I"],
  "Nivelación en informática": ["Estadística I", "Fundamentos de Finanzas"],
  "Nivelación en lenguaje": ["Lenguaje I"],
  "Matemática I": ["Estadística I"],
  "Economía General I": ["Economía General II"],
  "Lenguaje I": ["Lenguaje II"],
  "Fundamentos de las Ciencias Empresariales": ["Diseño Organizacional y Estrategia"],
  "Estadística I": ["Métodos Cuantitativos para la Gestión en las Organizaciones", "Analítica de Datos para los Negocios", "Finanzas Corporativas I"],
  "Fundamentos de Marketing": ["Marketing Sostenible", "Gestión de Productos", "International Marketing", "Marketing B2B", "Estrategia"],
  "Lenguaje II": ["Bloque de Procesos Sociales"],
  "Fundamentos de Contabilidad": ["Contabilidad Financiera Intermedia", "Fundamentos de Finanzas"],
  "Comportamiento del Consumidor": ["Gestión de Productos"],
  "Analítica de Datos para los Negocios": ["Análisis Multivariado para los Negocios"],
  "Diseño Organizacional y Estrategia": ["Innovación y Gestión en Negocios Digitales"],
  "Gestión de Productos": ["Pricing", "Canales de Distribución", "Investigación de Mercados", "Estrategia de Comunicación y promoción", "Estrategia de Branding", "Marketing de Servicios"],
  "Análisis Multivariado para los Negocios": ["Sistemas de Información y Análisis de Datos", "Investigación de Mercados Aplicada"],
  "Investigación de Mercados": ["Investigación de Mercados Aplicada"],
  "Pricing": ["Métricas y Analítica de Marketing"],
  "Fundamentos de Finanzas": ["Finanzas Corporativas I", "Métricas y Analítica de Marketing"],
  "Canales de Distribución": ["Trade Marketing", "Métricas y Analítica de Marketing"],
  "Estrategias de Comunicación y promoción": ["Marketing Digital y Redes Sociales", "Business Agility", "Métricas y Analítica de Marketing"],
  "Investigación Académica": ["Investigación en Marketing I"],
  "Trade Marketing": ["Gestión Comercial"],
  "Investigación en Marketing I": ["Investigación en Marketing II"]
};

const ciclos = {
  "Ciclo 0": ["Nivelación en matemáticas", "Nivelación en informática", "Nivelación en lenguaje"],
  "Ciclo I": ["Matemática I", "Economía General I", "Lenguaje I", "Fundamentos de las Ciencias Empresariales"],
  "Ciclo II": ["Estadística I", "Fundamentos de Marketing", "Lenguaje II", "Fundamentos de Contabilidad", "Bloque de Ciencias Sociales"],
  "Ciclo III": ["Comportamiento del Consumidor", "Marketing sostenible", "Analítica de Datos para los Negocios", "Contabilidad Financiera Intermedia", "Diseño Organizacional y Estrategia", "Economía General II"],
  "Ciclo IV": ["Métodos Cuantitativos para la Gestión en las Organizaciones", "Gestión de Productos", "Análisis Multivariado para los Negocios", "Ética", "Bloque de Procesos Sociales"],
  "Ciclo V": ["Pricing", "Investigación de Mercados", "Estrategias de Branding", "Sistemas de Información y Análisis de Datos", "Fundamentos de Finanzas", "Bloque de Desarrollo del Pensamiento Crítico"],
  "Ciclo VI": ["Canales de Distribución", "Investigación de Mercados Aplicada", "Estrategias de Comunicación y promoción", "Innovación y Gestión en Negocios Digitales", "Finanzas Corporativas I", "Investigación Académica"],
  "Ciclo VII": ["Trade Marketing", "Marketing Relacional y CRM", "Marketing Digital y Redes Sociales", "Business Agility", "Bloque Desarrollo Personal", "Bloque de Desarrollo del Pensamiento Crítico"],
  "Ciclo VIII": ["Gestión Comercial", "Marketing de Servicios", "Marketing B2B", "Métricas y Analítica de Marketing", "Estrategia", "Bloque introducción al Quehacer Científico"],
  "Ciclo IX": ["International Marketing", "Investigación en Marketing I", "Proyecto Social"],
  "Ciclo X": ["Plan de Marketing", "Investigación en Marketing II"]
};

const todosLosRamos = Object.values(ciclos).flat();
const ramosAprobados = new Set(JSON.parse(localStorage.getItem("ramosAprobados") || "[]"));

function guardarProgreso() {
  localStorage.setItem("ramosAprobados", JSON.stringify([...ramosAprobados]));
}

function crearBotonReset() {
  const boton = document.createElement("button");
  boton.textContent = "Reiniciar progreso";
  boton.className = "reset-button";
  boton.onclick = () => {
    if (confirm("¿Estás seguro de que quieres reiniciar la malla?")) {
      localStorage.removeItem("ramosAprobados");
      location.reload();
    }
  };
  document.body.prepend(boton);
}

function todosLosPrerequisitosAprobados(ramo) {
  return Object.entries(prerequisitos)
    .filter(([req, desbloquea]) => desbloquea.includes(ramo))
    .every(([req]) => ramosAprobados.has(req));
}

function actualizarEstadoRamos() {
  for (const ramo of todosLosRamos) {
    const div = document.getElementById(ramo);
    div.classList.remove("aprobado", "activo");

    if (ramosAprobados.has(ramo)) {
      div.classList.add("aprobado");
      div.onclick = () => deseleccionarRamo(ramo);
    } else if (todosLosPrerequisitosAprobados(ramo)) {
      div.classList.add("activo");
      div.onclick = () => aprobarRamo(ramo);
    } else {
      div.onclick = null;
    }
  }
}

function crearMalla() {
  const contenedor = document.getElementById("malla");

  for (const ciclo in ciclos) {
    const bloque = document.createElement("div");
    bloque.className = "ciclo-bloque";

    const titulo = document.createElement("div");
    titulo.className = "ciclo";
    titulo.textContent = ciclo;
    bloque.appendChild(titulo);

    const fila = document.createElement("div");
    fila.className = "ciclo-contenedor";

    for (const ramo of ciclos[ciclo]) {
      const div = document.createElement("div");
      div.className = "ramo";
      div.textContent = ramo;
      div.id = ramo;
      fila.appendChild(div);
    }

    bloque.appendChild(fila);
    contenedor.appendChild(bloque);
  }

  actualizarEstadoRamos();
}

function aprobarRamo(nombre) {
  ramosAprobados.add(nombre);
  guardarProgreso();
  actualizarEstadoRamos();
}

function deseleccionarRamo(nombre) {
  ramosAprobados.delete(nombre);
  guardarProgreso();
  actualizarEstadoRamos();
}

window.onload = () => {
  crearBotonReset();
  crearMalla();
};
