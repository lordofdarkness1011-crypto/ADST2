/**
 * Capa de Enrutamiento
 * Módulo: Cursos
 */

const express = require("express");
const CursoController = require("./curso.controller");

const router = express.Router();

router.get("/", CursoController.obtenerCursos);
router.post("/", CursoController.crearCurso);

module.exports = router;
