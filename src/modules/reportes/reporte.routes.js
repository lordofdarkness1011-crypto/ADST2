/**
 * Capa de Enrutamiento
 * Módulo: Reportes
 */

const express = require("express");
const ReporteController = require("./reporte.controller");

const router = express.Router();

router.get("/", ReporteController.obtenerReporte);

module.exports = router;
