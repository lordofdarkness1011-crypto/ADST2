/**
 * Capa de Lógica de Negocio (Servicio)
 * Módulo: Estudiantes
 */

const EstudianteModel = require("./estudiante.model");

class EstudianteService {
  static async listarEstudiantes() {
    return await EstudianteModel.obtenerTodos();
  }

  static async buscarEstudiantePorId(id) {
    return await EstudianteModel.obtenerPorId(id);
  }

  static async registrarEstudiante({ nombre, carrera, semestre }) {
    if (!nombre || !carrera || semestre === undefined || semestre === null) {
      throw new Error("Datos incompletos para registrar el estudiante.");
    }

    const semestreNum = Number(semestre);
    if (isNaN(semestreNum) || semestreNum < 1 || semestreNum > 12) {
      throw new Error("El semestre debe ser un número válido entre 1 y 12.");
    }

    return await EstudianteModel.crear({
      nombre: nombre.trim(),
      carrera: carrera.trim(),
      semestre: semestreNum
    });
  }
}

module.exports = EstudianteService;
