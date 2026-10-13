/**
 * Capa de Lógica de Negocio (Servicio)
 * Módulo: Reportes
 *
 * Consolida la información académica comunicándose exclusivamente
 * mediante las interfaces de servicio de Estudiantes, Matrículas y Cursos.
 */

const EstudianteService = require("../estudiantes/estudiante.service");
const MatriculaService = require("../matriculas/matricula.service");
const CursoService = require("../cursos/curso.service");

class ReporteService {
  static async generarReporteAcademico() {
    const estudiantes = await EstudianteService.listarEstudiantes();

    const reportePromesas = estudiantes.map(async estudiante => {
      const matriculasEstudiante =
        await MatriculaService.obtenerMatriculasPorEstudiante(estudiante.id);

      const nombresCursosPromesas = matriculasEstudiante.map(async m => {
        const curso = await CursoService.buscarCursoPorId(m.cursoId);
        return curso ? curso.nombre : "Sin curso";
      });

      const cursos = await Promise.all(nombresCursosPromesas);

      return {
        estudiante: estudiante.nombre,
        carrera: estudiante.carrera,
        cursos
      };
    });

    return await Promise.all(reportePromesas);
  }
}

module.exports = ReporteService;
