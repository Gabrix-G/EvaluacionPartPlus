//100101101010101010101101010111
// Array de metodos (C R U D) 01
//001011010101010101011010101111
const clienteController = {};
import Cliente from "../models/Cliente.js";

//00101101010
// SELECT  01
//00101101010

clienteController.getClientes = async (req, res) => {
  const clientes = await Cliente.find();
  res.json(clientes);
};

//00101101010010100010101
// SELECT USANDO EL ID 10
//00101101010010100010101
clienteController.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//001011010
// INSERT10
//001011010
clienteController.createCliente = async (req, res) => {
  try {
    const { name, email, password, phone, age } = req.body;
    
    // Validar campos obligatorios
    if (!name || !email || !password || !phone || !age) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Formato de email inválido" });
    }
    
    // Verificar existencia previa del cliente
    const existing = await Cliente.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "El cliente ya está registrado con ese email" });
    }
    
    const newCliente = new Cliente({ name, email, password, phone, age });
    await newCliente.save();
    res.json({ message: "Cliente saved" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//0010110101
// DELETE 10
//0010110101
clienteController.deleteCliente = async (req, res) => {
  const deletedCliente = await Cliente.findByIdAndDelete(req.params.id);
  if (!deletedCliente) {
    return res.status(404).json({ message: "Cliente dont find" });
  }
  res.json({ message: "Cliente deleted" });
};

//0010110101
// UPDATE 01
//0010110101
clienteController.updateCliente = async (req, res) => {
  const { name, email, password, phone, age } = req.body;
  // Actualizo
  await Cliente.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      password,
      phone,
      age
    },
    { new: true }
  );
  res.json({ message: "Cliente updated" });
};

export default clienteController;