/**
 * Capa de Presentación / Controlador HTTP
 * Módulo: Estudiantes
 */

const EstudianteService = require("./estudiante.service");

class EstudianteController {
  static async obtenerEstudiantes(req, res, next) {
    try {
      const estudiantes = await EstudianteService.listarEstudiantes();
      res.json(estudiantes);
    } catch (error) {
      next(error);
    }
  }

  static async crearEstudiante(req, res, next) {
    try {
      const { nombre, carrera, semestre } = req.body;
      const nuevoEstudiante = await EstudianteService.registrarEstudiante({
        nombre,
        carrera,
        semestre
      });
      res.status(201).json(nuevoEstudiante);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = EstudianteController;
