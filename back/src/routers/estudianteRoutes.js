import { Router } from "express";
import { crearEstudiante} from "../controllers/estudianteController.js";
import { verificarTokenJWT } from "../middlewares/JWT.js";
const router = Router()

router.post('/crear', verificarTokenJWT, crearEstudiante)

export default router