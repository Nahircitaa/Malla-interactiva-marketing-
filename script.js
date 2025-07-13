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
const ramosSinRequisitos = todosLosRamos.filter(ramo => !Object.values(prerequisitos).flat().includes(ramo));
const ramosAprobados = new Set(JSON.parse(localStorage.getItem("ramosAprobados") || "[]"));
const ramosDisponibles = new Set(ramosSinRequisitos);

function guardarProgreso() {
  localStorage.setItem("ramosAprobados", JSON.stringify([...ramosAprobados]));
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

      if (ramosAprobados.has(ramo)) {
        div.classList.add("aprobado");
      } else if (ramosDisponibles.has(ramo)) {
        div.classList.add("activo");
        div.addEventListener("click", () => aprobarRamo(ramo));
      }

      fila.appendChild(div);
    }

    bloque.appendChild(fila);
    contenedor.appendChild(bloque);
  }

  // Intentamos activar los cursos que se desbloquean por los ramos ya aprobados
  for (const aprobado of ramosAprobados) {
    if (prerequisitos[aprobado]) {
      for (const nuevo of prerequisitos[aprobado]) {
        ramosDisponibles.add(nuevo);
        const div = document.getElementById(nuevo);
        if (div && !ramosAprobados.has(nuevo)) {
          div.classList.add("activo");
          div.addEventListener("click", () => aprobarRamo(nuevo));
        }
      }
    }
  }
}

function aprobarRamo(nombre) {
  if (!ramosDisponibles.has(nombre) || ramosAprobados.has(nombre)) return;

  ramosAprobados.add(nombre);
  guardarProgreso();

  const div = document.getElementById(nombre);
  div.classList.add("aprobado");
  div.classList.remove("activo");

  div.animate([
    { transform: "scale(1)", backgroundColor: "#ffffff" },
    { transform: "scale(1.05)", backgroundColor: "#8e24aa" },
    { transform: "scale(1)", backgroundColor: "#8e24aa" }
  ], {
    duration: 300,
    easing: "ease-in-out"
  });

  for (const prereq in prerequisitos) {
    if (nombre === prereq) {
      for (const nuevoRamo of prerequisitos[prereq]) {
        ramosDisponibles.add(nuevoRamo);
        const nuevoDiv = document.getElementById(nuevoRamo);
        if (nuevoDiv && !ramosAprobados.has(nuevoRamo)) {
          nuevoDiv.classList.add("activo");
          nuevoDiv.addEventListener("click", () => aprobarRamo(nuevoRamo));
        }
      }
    }
  }
}

window.onload = crearMalla;
