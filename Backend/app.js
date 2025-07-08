import express from "express";
import clienteRoutes from "./src/routes/clientes.js";
import reservaRoutes from "./src/routes/reservas.js";

const app = express();

app.use(express.json());

// Rutas principales
app.use("/clients", clienteRoutes);
app.use("/reservations", reservaRoutes);

export default app;