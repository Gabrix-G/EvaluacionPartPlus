const Reserva = require('../models/Reserva');

//010101010101010101010100101
// Crear una nueva reserva 10
//010101010101010101010100101

import Cliente from "../models/Cliente.js";
// Crear una nueva reserva con ////validaciones////
exports.createReserva = async (req, res) => {
  try {
    const { clientId, vehicle, service, status } = req.body;
    // Validar campos obligatorios
    if (!clientId || !vehicle || !service) {
      return res.status(400).json({ error: "clientId, vehicle y service son obligatorios" });
    }
    // Validar formato de vehicle letras y números, mínimo 2 caracteres)
    const vehicleRegex = /^[A-Za-z0-9\s-]{2,}$/;
    if (!vehicleRegex.test(vehicle)) {
      return res.status(400).json({ error: "Formato de vehículo inválido" });
    }
    // Verificar existencia del cliente
    const cliente = await Cliente.findById(clientId);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    const reserva = new Reserva({ clientId, vehicle, service, status });
    await reserva.save();
    res.status(201).json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//0101010101010101010101001011010101010101010101010010101010110
// Obtener todas las reservas o las de un cliente específico 10
//0101010101010101010101001011010101010101010101010010101010110
exports.getReservas = async (req, res) => {
  try {
    const { clientId } = req.query;
    let reservas;
    if (clientId) {
      reservas = await Reserva.find({ clientId }).populate('clientId');
    } else {
      reservas = await Reserva.find().populate('clientId');
    }
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//010101010101010101010100101110
// Obtener una reserva por ID 10
//010101010101010101010010101010
exports.getReservaById = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate('clientId');
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//01010101010101010101001011
// Actualizar una reserva 01
//01010101010101010101001011
exports.updateReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//010101010101010101010010
// Eliminar una reserva 10
//010101010101010101010010

exports.deleteReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json({ message: 'Reserva eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
