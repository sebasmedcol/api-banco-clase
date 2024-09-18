import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const cuentaSchema = new Schema({
    numeroCuenta: {
        type: Number,
        unique: true,
        required: true
    },
    documentoCliente: {
        type: String,
        required: true
    },
    fechaApertura: {
        type: Date,
        default: Date.now
    },
    saldo: {
        type: Number,
        default: 0
    },
    claveAcceso: {
        type: String,
        required: true
    }
});

cuentaSchema.pre('save', async function (next) {
    if (this.isModified('claveAcceso')) {
        const salt = await bcrypt.genSalt(10);
        this.claveAcceso = await bcrypt.hash(this.claveAcceso, salt);
    }
    next();
});

export default model('Cuenta', cuentaSchema);
