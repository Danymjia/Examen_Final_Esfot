// Requerir módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';

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
//app.use('/api/usuario', usuarioRoutes)

// Rutas de materia
//app.use('/api', materiaRoutes)

// Rutas de estudiante
//app.use('/api/est', estudianteRoutes)

// Rutas de matrícula
//app.use('/api/mat', matriculaRoutes)

// Exportar la instancia de express por medio de app
export default app