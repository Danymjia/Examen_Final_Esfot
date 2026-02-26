import Estudiante from "../models/Estudiante.js";
import mongoose from 'mongoose'

const crearEstudiante = async (req, res) => {
    try {
        const {nombre, email} = req.body
        const existeEstudiante = await Estudiante.findOne({email})
        if(existeEstudiante) return res.status(400).json({msg:"El estudiante ya existe"})
        const estudiante = new Estudiante(req.body)
        const estudianteBDD = await estudiante.save()
        res.status(201).json({msg:"Estudiante creado correctamente", estudiante:estudianteBDD})
    } catch (error) {
        res.status(500).json({msg:"Error al crear el estudiante", error:error.message})
    }
}

export {
    crearEstudiante
}