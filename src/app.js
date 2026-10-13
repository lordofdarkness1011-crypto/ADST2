/**
 * Configuración principal de la aplicación Express
 * Arquitectura modular y en capas
 */

const express = require("express");
const path = require("path");

const estudianteRoutes = require("./modules/estudiantes/estudiante.routes");
const cursoRoutes = require("./modules/cursos/curso.routes");
const matriculaRoutes = require("./modules/matriculas/matricula.routes");
const reporteRoutes = require("./modules/reportes/reporte.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middlewares globales
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// Montaje de rutas de la API por módulo
app.use("/api/estudiantes", estudianteRoutes);
app.use("/api/cursos", cursoRoutes);
app.use("/api/matriculas", matriculaRoutes);
app.use("/api/reporte", reporteRoutes);

// Manejo centralizado de errores
app.use(errorHandler);

module.exports = app;
