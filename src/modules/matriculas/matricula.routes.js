/**
 * Capa de Enrutamiento
 * Módulo: Matrículas
 */

const express = require("express");
const MatriculaController = require("./matricula.controller");

const router = express.Router();

router.get("/", MatriculaController.obtenerMatriculas);
router.post("/", MatriculaController.crearMatricula);

module.exports = router;
