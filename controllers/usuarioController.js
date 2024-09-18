import Usuario from '../models/Usuario.js';

export async function getUsuarios(req, res) {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function postUsuario(req, res) {
    const { nombreUsuario, password, estado } = req.body;
    try {
        const usuario = new Usuario({ nombreUsuario, password, estado });
        await usuario.save();
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function putUsuario(req, res) {
    const { id } = req.params;
    const { nombreUsuario, password, estado } = req.body;
    try {
        const usuario = await Usuario.findByIdAndUpdate(id, { nombreUsuario, password, estado }, { new: true });
        res.json(usuario);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function deleteUsuario(req, res) {
    const { id } = req.params;
    try {
        await Usuario.findByIdAndDelete(id);
        res.json('Usuario eliminado exitosamente');
    } catch (error) {
        res.status(500).json({ error });
    }
}
