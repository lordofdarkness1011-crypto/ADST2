/**
 * Capa de Lógica de Negocio (Servicio)
 * Módulo: Matrículas
 *
 * Aplica bajo acoplamiento al interactuar con otros módulos únicamente
 * a través de sus interfaces públicas de servicio (EstudianteService, CursoService).
 */

const MatriculaModel = require("./matricula.model");
const EstudianteService = require("../estudiantes/estudiante.service");
const CursoService = require("../cursos/curso.service");

class MatriculaService {
  static async listarMatriculasConDetalle() {
    const matriculas = await MatriculaModel.obtenerTodas();
    const estudiantes = await EstudianteService.listarEstudiantes();
    const cursos = await CursoService.listarCursos();

    return matriculas.map(m => {
      const estudiante = estudiantes.find(e => e.id === m.estudianteId);
      const curso = cursos.find(c => c.id === m.cursoId);

      return {
        id: m.id,
        estudiante: estudiante ? estudiante.nombre : "Desconocido",
        curso: curso ? curso.nombre : "Desconocido"
      };
    });
  }

  static async matricularEstudiante({ estudianteId, cursoId }) {
    if (!estudianteId || !cursoId) {
      throw new Error("Estudiante o curso no especificado.");
    }

    const idEstudianteNum = Number(estudianteId);
    const idCursoNum = Number(cursoId);

    // Consulta desacoplada a través de las interfaces de servicio
    const estudiante = await EstudianteService.buscarEstudiantePorId(idEstudianteNum);
    const curso = await CursoService.buscarCursoPorId(idCursoNum);

    if (!estudiante || !curso) {
      const error = new Error("Estudiante o curso no encontrado.");
      error.statusCode = 400;
      throw error;
    }

    const yaMatriculado = await MatriculaModel.existeMatricula(idEstudianteNum, idCursoNum);
    if (yaMatriculado) {
      const error = new Error("El estudiante ya está matriculado en el curso.");
      error.statusCode = 400;
      throw error;
    }

    await MatriculaModel.crear({
      estudianteId: idEstudianteNum,
      cursoId: idCursoNum
    });

    return {
      mensaje: "Matrícula registrada correctamente."
    };
  }

  static async obtenerMatriculasPorEstudiante(estudianteId) {
    return await MatriculaModel.obtenerPorEstudianteId(estudianteId);
  }
}

module.exports = MatriculaService;
