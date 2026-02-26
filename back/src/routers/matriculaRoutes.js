import {Router} from 'express'
import { crearMatricula } from '../controllers/matriculaController.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'

const router = Router()

router.post('/crear', verificarTokenJWT, crearMatricula)

export default router