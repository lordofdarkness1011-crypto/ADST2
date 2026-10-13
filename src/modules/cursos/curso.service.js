/**
 * Capa de Lógica de Negocio (Servicio)
 * Módulo: Cursos
 */

const CursoModel = require("./curso.model");

class CursoService {
  static async listarCursos() {
    return await CursoModel.obtenerTodos();
  }

  static async buscarCursoPorId(id) {
    return await CursoModel.obtenerPorId(id);
  }

  static async registrarCurso({ nombre, docente, cupos }) {
    if (!nombre || !docente || cupos === undefined || cupos === null) {
      throw new Error("Datos incompletos para registrar el curso.");
    }

    const cuposNum = Number(cupos);
    if (isNaN(cuposNum) || cuposNum <= 0) {
      throw new Error("Los cupos deben ser un número mayor a cero.");
    }

    return await CursoModel.crear({
      nombre: nombre.trim(),
      docente: docente.trim(),
      cupos: cuposNum
    });
  }
}

module.exports = CursoService;
