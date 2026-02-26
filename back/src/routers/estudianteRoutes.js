import { Router } from "express";
import { crearEstudiante, verEstudiante,actualizarEstudiante,eliminarEstudiante} from "../controllers/estudianteController.js";
import { verificarTokenJWT } from "../middlewares/JWT.js";
const router = Router()

router.post('/crear', verificarTokenJWT, crearEstudiante)
router.get('/ver/:id', verificarTokenJWT, verEstudiante)
router.put('/actualizar/:id', verificarTokenJWT, actualizarEstudiante)
router.delete('/eliminar/:id', verificarTokenJWT, eliminarEstudiante)

export default router