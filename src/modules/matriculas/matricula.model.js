/**
 * Capa de Datos / Persistencia (Modelo en memoria)
 * Módulo: Matrículas
 */

let matriculas = [
  {
    id: 1,
    estudianteId: 1,
    cursoId: 1
  },
  {
    id: 2,
    estudianteId: 2,
    cursoId: 1
  },
  {
    id: 3,
    estudianteId: 1,
    cursoId: 2
  }
];

class MatriculaModel {
  static async obtenerTodas() {
    return [...matriculas];
  }

  static async existeMatricula(estudianteId, cursoId) {
    return matriculas.some(
      m => m.estudianteId === Number(estudianteId) && m.cursoId === Number(cursoId)
    );
  }

  static async obtenerPorEstudianteId(estudianteId) {
    return matriculas.filter(m => m.estudianteId === Number(estudianteId));
  }

  static async crear({ estudianteId, cursoId }) {
    const id = matriculas.length
      ? Math.max(...matriculas.map(m => m.id)) + 1
      : 1;

    const nuevaMatricula = {
      id,
      estudianteId: Number(estudianteId),
      cursoId: Number(cursoId)
    };

    matriculas.push(nuevaMatricula);
    return nuevaMatricula;
  }
}

module.exports = MatriculaModel;
