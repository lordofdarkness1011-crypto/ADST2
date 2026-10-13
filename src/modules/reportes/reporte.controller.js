/**
 * Capa de Presentación / Controlador HTTP
 * Módulo: Reportes
 */

const ReporteService = require("./reporte.service");

class ReporteController {
  static async obtenerReporte(req, res, next) {
    try {
      const reporte = await ReporteService.generarReporteAcademico();
      res.json(reporte);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReporteController;
