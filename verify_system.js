/**
 * Script de Verificación y Pruebas Automatizadas
 * Ejecuta validaciones completas sobre todos los endpoints y genera evidencias objetivas.
 */

const http = require("http");
const app = require("../src/app");

const PORT = 3001; // Puerto de pruebas aislado

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const dataString = body ? JSON.stringify(body) : null;
    const options = {
      hostname: "localhost",
      port: PORT,
      path,
      method,
      headers: {
        ...(body ? { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(dataString) } : {})
      }
    };

    const req = http.request(options, res => {
      let responseBody = "";
      res.on("data", chunk => (responseBody += chunk));
      res.on("end", () => {
        try {
          const parsed = responseBody ? JSON.parse(responseBody) : null;
          resolve({ status: res.statusCode, data: parsed, raw: responseBody });
        } catch (e) {
          resolve({ status: res.statusCode, raw: responseBody });
        }
      });
    });

    req.on("error", reject);
    if (dataString) req.write(dataString);
    req.end();
  });
}

async function runTests() {
  const server = app.listen(PORT, async () => {
    console.log(`=== INICIANDO SUITE DE PRUEBAS AUTOMATIZADAS (PUERTO ${PORT}) ===\n`);

    const results = [];

    async function test(name, fn) {
      const startTime = Date.now();
      try {
        const detail = await fn();
        const duration = Date.now() - startTime;
        console.log(`[PASS] ${name} (${duration}ms)`);
        results.push({ name, passed: true, duration, detail });
      } catch (err) {
        const duration = Date.now() - startTime;
        console.error(`[FAIL] ${name} (${duration}ms):`, err.message);
        results.push({ name, passed: false, duration, error: err.message });
      }
    }

    // 1. GET /api/estudiantes
    await test("GET /api/estudiantes - Listar estudiantes iniciales", async () => {
      const res = await request("GET", "/api/estudiantes");
      if (res.status !== 200) throw new Error(`Status esperado 200, recibido ${res.status}`);
      if (!Array.isArray(res.data) || res.data.length < 3) throw new Error("Colección de estudiantes inválida");
      return { count: res.data.length, sample: res.data[0] };
    });

    // 2. POST /api/estudiantes
    await test("POST /api/estudiantes - Registrar nuevo estudiante", async () => {
      const payload = { nombre: "Carlos Mendoza", carrera: "Ciberseguridad", semestre: 4 };
      const res = await request("POST", "/api/estudiantes", payload);
      if (res.status !== 201) throw new Error(`Status esperado 201, recibido ${res.status}`);
      if (res.data.nombre !== payload.nombre || !res.data.id) throw new Error("Datos de estudiante incorrectos");
      return res.data;
    });

    // 3. GET /api/cursos
    await test("GET /api/cursos - Listar cursos disponibles", async () => {
      const res = await request("GET", "/api/cursos");
      if (res.status !== 200) throw new Error(`Status esperado 200, recibido ${res.status}`);
      if (!Array.isArray(res.data) || res.data.length < 3) throw new Error("Colección de cursos inválida");
      return { count: res.data.length, sample: res.data[0] };
    });

    // 4. POST /api/cursos
    await test("POST /api/cursos - Registrar nuevo curso", async () => {
      const payload = { nombre: "Sistemas Distribuidos", docente: "Ing. Kevin Chuquitarco", cupos: 20 };
      const res = await request("POST", "/api/cursos", payload);
      if (res.status !== 201) throw new Error(`Status esperado 201, recibido ${res.status}`);
      if (res.data.nombre !== payload.nombre || !res.data.id) throw new Error("Datos de curso incorrectos");
      return res.data;
    });

    // 5. GET /api/matriculas
    await test("GET /api/matriculas - Listar matrículas con datos resueltos", async () => {
      const res = await request("GET", "/api/matriculas");
      if (res.status !== 200) throw new Error(`Status esperado 200, recibido ${res.status}`);
      if (!Array.isArray(res.data) || res.data.length === 0) throw new Error("No hay matrículas");
      if (!res.data[0].estudiante || !res.data[0].curso) throw new Error("Estructura de matrícula incompleta");
      return { count: res.data.length, sample: res.data[0] };
    });

    // 6. POST /api/matriculas (éxito)
    await test("POST /api/matriculas - Matrícula válida", async () => {
      const payload = { estudianteId: 3, cursoId: 3 };
      const res = await request("POST", "/api/matriculas", payload);
      if (res.status !== 201) throw new Error(`Status esperado 201, recibido ${res.status}`);
      if (res.data.mensaje !== "Matrícula registrada correctamente.") throw new Error("Mensaje inesperado");
      return res.data;
    });

    // 7. POST /api/matriculas (duplicado)
    await test("POST /api/matriculas - Rechazar matrícula duplicada", async () => {
      const payload = { estudianteId: 3, cursoId: 3 };
      const res = await request("POST", "/api/matriculas", payload);
      if (res.status !== 400) throw new Error(`Status esperado 400, recibido ${res.status}`);
      if (res.data.error !== "El estudiante ya está matriculado en el curso.") throw new Error("Mensaje de error incorrecto");
      return res.data;
    });

    // 8. POST /api/matriculas (inexistente)
    await test("POST /api/matriculas - Rechazar estudiante/curso inexistente", async () => {
      const payload = { estudianteId: 9999, cursoId: 9999 };
      const res = await request("POST", "/api/matriculas", payload);
      if (res.status !== 400) throw new Error(`Status esperado 400, recibido ${res.status}`);
      if (res.data.error !== "Estudiante o curso no encontrado.") throw new Error("Mensaje de error incorrecto");
      return res.data;
    });

    // 9. GET /api/reporte
    await test("GET /api/reporte - Generar reporte académico consolidado", async () => {
      const res = await request("GET", "/api/reporte");
      if (res.status !== 200) throw new Error(`Status esperado 200, recibido ${res.status}`);
      if (!Array.isArray(res.data)) throw new Error("Reporte no es un array");
      const ana = res.data.find(r => r.estudiante === "Ana Torres");
      if (!ana || !Array.isArray(ana.cursos)) throw new Error("Reporte de Ana Torres incorrecto");
      return { estudiantesReportados: res.data.length, muestra: ana };
    });

    // 10. GET / (Frontend estático)
    await test("GET / - Servir interfaz de usuario (public/index.html)", async () => {
      const res = await request("GET", "/");
      if (res.status !== 200) throw new Error(`Status esperado 200, recibido ${res.status}`);
      if (!res.raw.includes("Sistema de Gestión Académica")) throw new Error("HTML no contiene el título esperado");
      return { contentLength: res.raw.length };
    });

    console.log("\n=== RESUMEN DE PRUEBAS ===");
    const passed = results.filter(r => r.passed).length;
    console.log(`Total: ${results.length} | Aprobadas: ${passed} | Fallidas: ${results.length - passed}`);

    server.close(() => {
      console.log("\nServidor de pruebas detenido exitosamente.");
      process.exit(results.every(r => r.passed) ? 0 : 1);
    });
  });
}

runTests().catch(err => {
  console.error("Error fatal en suite de pruebas:", err);
  process.exit(1);
});
