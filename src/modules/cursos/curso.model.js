/**
 * Capa de Datos / Persistencia (Modelo en memoria)
 * Módulo: Cursos
 */

let cursos = [
  {
    id: 1,
    nombre: "Arquitectura de Software",
    docente: "Ing. Carlos Ruiz",
    cupos: 30
  },
  {
    id: 2,
    nombre: "Bases de Datos",
    docente: "Ing. Laura Vera",
    cupos: 25
  },
  {
    id: 3,
    nombre: "Desarrollo Web",
    docente: "Ing. Pedro León",
    cupos: 35
  }
];

class CursoModel {
  static async obtenerTodos() {
    return [...cursos];
  }

  static async obtenerPorId(id) {
    return cursos.find(c => c.id === Number(id)) || null;
  }

  static async crear({ nombre, docente, cupos }) {
    const id = cursos.length
      ? Math.max(...cursos.map(c => c.id)) + 1
      : 1;

    const nuevoCurso = {
      id,
      nombre,
      docente,
      cupos: Number(cupos)
    };

    cursos.push(nuevoCurso);
    return nuevoCurso;
  }
}

module.exports = CursoModel;
