// Requerir módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import usuarioRoutes from './routers/usuarioRoutes.js';
import materiaRoutes from './routers/materiaRoutes.js';
import estudianteRoutes from './routers/estudianteRoutes.js';

// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 

// Middlewares 
app.use(express.json())
app.use(cors())

// Variables globales
app.set('port',process.env.PORT || 3000)

// Rutas 
app.get('/',(req,res)=> res.send("Server on"))

// Rutas de usuario
app.use('/api/usuario', usuarioRoutes)

// Rutas de materia
app.use('/api/materia', materiaRoutes)

//Ruta de estudiante
app.use('/api/estudiante', estudianteRoutes)

// Exportar la instancia de express por medio de app
export default app