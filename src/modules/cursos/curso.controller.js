/**
 * Capa de Presentación / Controlador HTTP
 * Módulo: Cursos
 */

const CursoService = require("./curso.service");

class CursoController {
  static async obtenerCursos(req, res, next) {
    try {
      const cursos = await CursoService.listarCursos();
      res.json(cursos);
    } catch (error) {
      next(error);
    }
  }

  static async crearCurso(req, res, next) {
    try {
      const { nombre, docente, cupos } = req.body;
      const nuevoCurso = await CursoService.registrarCurso({
        nombre,
        docente,
        cupos
      });
      res.status(201).json(nuevoCurso);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = CursoController;
