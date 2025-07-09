//100101101010101010101101010111
// Array de metodos (C R U D) 01
//001011010101010101011010101111
const reservaController = {};
import Reserva from '../models/Reserva.js';
import Cliente from "../models/Cliente.js";

//001011010
// SELECT 0
//001011010
reservaController.getReservas = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

//001011010101010
// SELECT BY ID 0
//001011010101010
reservaController.getReservaById = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate('clientId');
    if (!reserva) return res.status(404).json({ message: 'Reserva dont find' });
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//0010110101
// INSERT 10
//0010110101
reservaController.createReserva = async (req, res) => {
  try {
    const { clientId, vehicle, service, status } = req.body;
    if (!clientId || !vehicle || !service) {
      return res.status(400).json({ message: "clientId, vehicle y service son obligatorios" });
    }
    const vehicleRegex = /^[A-Za-z0-9\s-]{2,}$/;
    if (!vehicleRegex.test(vehicle)) {
      return res.status(400).json({ message: "Formato de vehículo inválido" });
    }
    const cliente = await Cliente.findById(clientId);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    const newReserva = new Reserva({ clientId, vehicle, service, status });
    await newReserva.save();
    res.json({ message: "Reserva saved" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//0010110101
// DELETE 01
//0010110101
reservaController.deleteReserva = async (req, res) => {
  const deletedReserva = await Reserva.findByIdAndDelete(req.params.id);
  if (!deletedReserva) {
    return res.status(404).json({ message: "Reserva dont find" });
  }
  res.json({ message: "Reserva deleted" });
};

//0010110101
// UPDATE 01
//0010110101
reservaController.updateReserva = async (req, res) => {
  const { clientId, vehicle, service, status } = req.body;
  await Reserva.findByIdAndUpdate(
    req.params.id,
    {
      clientId,
      vehicle,
      service,
      status
    },
    { new: true }
  );
  res.json({ message: "Reserva updated" });
};

export default reservaController;