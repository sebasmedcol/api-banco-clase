import Cuenta from '../models/Cuenta.js';
import bcrypt from 'bcrypt';

export async function listarCuenta(req, res) {
    const { numeroCuenta } = req.params;
    try {
        const cuenta = await Cuenta.findOne({ numeroCuenta });
        res.json(cuenta);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function crearCuenta(req, res) {
    const { numeroCuenta, documentoCliente, claveAcceso } = req.body;
    try {
        const cuenta = new Cuenta({ numeroCuenta, documentoCliente, claveAcceso });
        await cuenta.save();
        res.status(201).json(cuenta);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function consignarDinero(req, res) {
    const { numeroCuenta } = req.params;
    const { monto } = req.body;
    try {
        if (monto <= 0) {
            return res.status(400).json('El monto debe ser positivo');
        }
        const cuenta = await Cuenta.findOne({ numeroCuenta });
        if (!cuenta) {
            return res.status(404).json('Cuenta no encontrada');
        }
        cuenta.saldo += monto;
        await cuenta.save();
        res.json(cuenta);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function retirarDinero(req, res) {
    const { numeroCuenta } = req.params;
    const { monto } = req.body;
    try {
        const cuenta = await Cuenta.findOne({ numeroCuenta });
        if (!cuenta) {
            return res.status(404).json('Cuenta no encontrada');
        }
        if (monto <= 0) {
            return res.status(400).json('El monto debe ser positivo');
        }
        if (monto > cuenta.saldo) {
            return res.status(400).json('Saldo insuficiente');
        }
        cuenta.saldo -= monto;
        await cuenta.save();
        res.json(cuenta);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function eliminarCuenta(req, res) {
    const { numeroCuenta } = req.params;
    try {
        const cuenta = await Cuenta.findOne({ numeroCuenta });
        if (!cuenta) {
            return res.status(404).json('Cuenta no encontrada');
        }
        if (cuenta.saldo !== 0) {
            return res.status(400).json('No se puede eliminar una cuenta con saldo distinto de cero');
        }
        await Cuenta.deleteOne({ numeroCuenta });
        res.json('Cuenta eliminada exitosamente');
    } catch (error) {
        res.status(500).json({ error });
    }
}
