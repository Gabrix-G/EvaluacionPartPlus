const Cliente = require('../models/Cliente');
//010101010101010101010100101010101010010101010101001010101010100101010101010010101010101001010101010100101
// Aqui esta el crud de todos los clientes, y como se puede ver, comenzamos con "Crear un nuevo cliente" 01
//010101010101010101010100101010101010010101010101001010101010100101010101010010101010101001010101010100101

// Crear un nuevo cliente con   ////validaciones////
exports.createCliente = async (req, res) => {
  try {
    const { name, email, password, phone, age } = req.body;
    // Validar campos obligatorios
    if (!name || !email || !password || !phone || !age) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Formato de email inválido" });
    }
    // Verificar existencia previa del cliente
    const existing = await Cliente.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "El cliente ya está registrado con ese email" });
    }
    const cliente = new Cliente({ name, email, password, phone, age });
    await cliente.save();
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//0101010101010101010101001000100010
// Obtenemos a todos los clientes 01
//0101010101010101010101001000100101
exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//01010101010101010101010010010
// Obtener un cliente por ID 10
//01010101010101010101010010010

exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//01010101010101010101010010
// Actualizar un cliente  01
//01010101010101010101010010

exports.updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//01010101010101010101010010
// Eliminar un cliente    01
//01010101010101010101010010
exports.deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
