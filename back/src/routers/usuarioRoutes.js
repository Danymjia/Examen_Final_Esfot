import { Router } from 'express';
import { crearUsuario,Login } from '../controllers/usuarioController.js';
const router = Router()

router.post("/registro", crearUsuario)
router.post("/login", Login)

export default router