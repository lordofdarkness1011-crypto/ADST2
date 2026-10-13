/**
 * Capa de Datos / Persistencia (Modelo en memoria)
 * Módulo: Estudiantes
 */

let estudiantes = [
  {
    id: 1,
    nombre: "Ana Torres",
    carrera: "Ingeniería de Software",
    semestre: 8
  },
  {
    id: 2,
    nombre: "Luis Pérez",
    carrera: "Ingeniería de Software",
    semestre: 8
  },
  {
    id: 3,
    nombre: "María Gómez",
    carrera: "Tecnologías de la Información",
    semestre: 6
  }
];

class EstudianteModel {
  static async obtenerTodos() {
    return [...estudiantes];
  }

  static async obtenerPorId(id) {
    return estudiantes.find(e => e.id === Number(id)) || null;
  }

  static async crear({ nombre, carrera, semestre }) {
    const id = estudiantes.length
      ? Math.max(...estudiantes.map(e => e.id)) + 1
      : 1;

    const nuevoEstudiante = {
      id,
      nombre,
      carrera,
      semestre: Number(semestre)
    };

    estudiantes.push(nuevoEstudiante);
    return nuevoEstudiante;
  }
}

module.exports = EstudianteModel;
