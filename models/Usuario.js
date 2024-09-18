import { Schema, model } from 'mongoose';

const usuarioSchema = new Schema({
    nombreUsuario: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo'],
        required: true
    }
});

export default model('Usuario', usuarioSchema);
