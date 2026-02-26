import {Router} from 'express'
import { crearMateria } from '../controllers/materiaController.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'
const router = Router()

router.post("/crear", verificarTokenJWT, crearMateria)

export default router