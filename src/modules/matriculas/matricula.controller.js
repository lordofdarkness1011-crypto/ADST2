/**
 * Capa de Presentación / Controlador HTTP
 * Módulo: Matrículas
 */

const MatriculaService = require("./matricula.service");

class MatriculaController {
  static async obtenerMatriculas(req, res, next) {
    try {
      const matriculas = await MatriculaService.listarMatriculasConDetalle();
      res.json(matriculas);
    } catch (error) {
      next(error);
    }
  }

  static async crearMatricula(req, res, next) {
    try {
      const { estudianteId, cursoId } = req.body;
      const resultado = await MatriculaService.matricularEstudiante({
        estudianteId,
        cursoId
      });
      res.status(201).json(resultado);
    } catch (error) {
      const statusCode = error.statusCode || 400;
      res.status(statusCode).json({ error: error.message });
    }
  }
}

module.exports = MatriculaController;
