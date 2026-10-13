/**
 * Punto de entrada del servidor HTTP
 * Sistema de Gestión Académica - Arquitectura Refactorizada
 */

const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Sistema ejecutándose en http://localhost:${PORT}`);
});