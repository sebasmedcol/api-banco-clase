import { Schema, model } from 'mongoose';

const clienteSchema = new Schema({
    documentoCliente: {
        type: String,
        required: true,
        unique: true
    },
    nombreCompleto: {
        type: String,
        required: true
    },
    celular: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    }
});

export default model('Cliente', clienteSchema);
