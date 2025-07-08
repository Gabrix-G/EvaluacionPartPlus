import express from "express";
import clienteController from "../controllers/clienteController.js";

const router = express.Router();

// GET /clients - Lista todos los clientes
// POST /clients - Crea un nuevo cliente
router.route("/")
  .get(clienteController.getClientes)
  .post(clienteController.createCliente);

// GET /clients/:id - Obtiene un cliente por ID
// PUT /clients/:id - Actualiza un cliente
// DELETE /clients/:id - Elimina un cliente
router.route("/:id")
  .get(clienteController.getClienteById)
  .put(clienteController.updateCliente)
  .delete(clienteController.deleteCliente);

export default router;
