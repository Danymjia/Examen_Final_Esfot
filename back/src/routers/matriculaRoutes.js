import {Router} from 'express'
import { crearMatricula, verMatricula, actualizarMatricula,eliminarMatricula } from '../controllers/matriculaController.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'

const router = Router()

router.post('/crear', verificarTokenJWT, crearMatricula)
router.get('/ver', verificarTokenJWT, verMatricula)
router.put('/actualizar/:id', verificarTokenJWT, actualizarMatricula)
router.delete('/eliminar/:id', verificarTokenJWT, eliminarMatricula)

export default router