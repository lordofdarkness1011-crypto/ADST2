/**
 * Capa de Enrutamiento
 * Módulo: Estudiantes
 */

const express = require("express");
const EstudianteController = require("./estudiante.controller");

const router = express.Router();

router.get("/", EstudianteController.obtenerEstudiantes);
router.post("/", EstudianteController.crearEstudiante);

module.exports = router;
