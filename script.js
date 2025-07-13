const cursos = {
  "Nivelación en matemáticas": ["Matemática I", "Economía General I"],
  "Nivelación en informática": ["Estadística I", "Fundamentos de Finanzas"],
  "Nivelación en lenguaje": ["Lenguaje I"],
  "Matemática I": ["Estadística I"],
  "Economía General I": ["Economía General II"],
  "Lenguaje I": ["Lenguaje II"],
  "Fundamentos de las Ciencias Empresariales": ["Diseño Organizacional y Estrategia"],
};

const ciclos = {
  "Ciclo 0": ["Nivelación en matemáticas", "Nivelación en informática", "Nivelación en lenguaje"],
  "Ciclo I": ["Matemática I", "Economía General I", "Lenguaje I", "Fundamentos de las Ciencias Empresariales"],
  "Ciclo II": ["Estadística I", "Fundamentos de Finanzas", "Lenguaje II"],
  "Ciclo III": ["Economía General II", "Diseño Organizacional y Estrategia"]
};

const aprobados = new Set();
const desbloqueados = new Set(Object.keys(ciclos["Ciclo 0"]));

function crearMalla() {
  const cont = document.getElementById("malla");

  for (const ciclo in ciclos) {
    const titulo = document.createElement("div");
    titulo.className = "ciclo";
    titulo.textContent = ciclo;
    cont.appendChild(titulo);

    for (const ramo of ciclos[ciclo]) {
      const div = document.createElement("div");
      div.className = "ramo";
      div.textContent = ramo;
      div.id = ramo;
      if (desbloqueados.has(ramo)) div.classList.add("activo");
      div.addEventListener("click", () => aprobar(ramo));
      cont.appendChild(div);
    }
  }
}

function aprobar(nombre) {
  if (!desbloqueados.has(nombre) || aprobados.has(nombre)) return;
  aprobados.add(nombre);
  document.getElementById(nombre).classList.add("aprobado");

  if (cursos[nombre]) {
    for (const nuevo of cursos[nombre]) {
      desbloqueados.add(nuevo);
      const el = document.getElementById(nuevo);
      if (el) el.classList.add("activo");
    }
  }
}

crearMalla();
