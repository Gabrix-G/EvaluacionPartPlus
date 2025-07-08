import express from "express";
import reservaController from "../controllers/reservaController.js";

const router = express.Router();

// GET /reservations?clientId= - Muestra todas las reservas de un cliente (o todas si no se pasa clientId)
// POST /reservations - Crea una reserva para un cliente
router.route("/")
  .get(reservaController.getReservas)
  .post(reservaController.createReserva);

// GET /reservations/:id - Obtiene una reserva por ID
// PUT /reservations/:id - Actualiza una reserva
// DELETE /reservations/:id - Elimina una reserva
router.route("/:id")
  .get(reservaController.getReservaById)
  .put(reservaController.updateReserva)
  .delete(reservaController.deleteReserva);

export default router;
