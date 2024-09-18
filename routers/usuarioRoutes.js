import express from 'express';
import { getUsuarios, postUsuario, putUsuario, deleteUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', getUsuarios);
router.post('/', postUsuario);
router.put('/:id', putUsuario);
router.delete('/:id', deleteUsuario);

export default router;
