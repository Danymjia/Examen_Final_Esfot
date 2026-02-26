import {Router} from 'express'
import { crearMateria, verMateria, actualizarMateria, eliminarMateria } from '../controllers/materiaController.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'
const router = Router()

router.post("/crear", verificarTokenJWT, crearMateria)
router.get("/ver", verificarTokenJWT, verMateria)
router.put("/actualizar/:id", verificarTokenJWT, actualizarMateria)
router.delete("/eliminar/:id", verificarTokenJWT, eliminarMateria)

export default router