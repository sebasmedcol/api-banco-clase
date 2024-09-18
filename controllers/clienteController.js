import Cliente from '../models/Cliente.js';

export async function getClientes(req, res) {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function postCliente(req, res) {
    const { documentoCliente, nombreCompleto, celular, fechaNacimiento } = req.body;
    try {
        const cliente = new Cliente({ documentoCliente, nombreCompleto, celular, fechaNacimiento });
        await cliente.save();
        res.status(201).json(cliente);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function putCliente(req, res) {
    const { id } = req.params;
    const { documentoCliente, nombreCompleto, celular, fechaNacimiento } = req.body;
    try {
        const cliente = await Cliente.findByIdAndUpdate(id, { documentoCliente, nombreCompleto, celular, fechaNacimiento }, { new: true });
        res.json(cliente);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function deleteCliente(req, res) {
    const { id } = req.params;
    try {
        await Cliente.findByIdAndDelete(id);
        res.json('Cliente eliminado exitosamente');
    } catch (error) {
        res.status(500).json({ error });
    }
}
