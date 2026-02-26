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

const verEstudiante = async (req, res) => {
    try{
        const {id} = req.params
        const estudianteBDD = await Estudiante.findById(id)
        if(!estudianteBDD) return res.status(404).json({msg:"Estudiante no encontrado"})
        res.status(200).json({msg:"Estudiante encontrado", estudiante:estudianteBDD})
    } catch (error) {
        res.status(500).json({msg:"Error al ver el estudiante", error:error.message})
    }
}

const actualizarEstudiante = async (req, res) => {
    try {
        const {id} = req.params 
        const estudianteBDD = await Estudiante.findById(id)
        if(!estudianteBDD) return res.status(404).json({msg:"Estudiante no encontrado"})
        const estudianteActualizado = await Estudiante.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).json({msg:"Estudiante actualizado correctamente", estudiante:estudianteActualizado})
    } catch (error) {
        res.status(500).json({msg:"Error al actualizar el estudiante", error:error.message})
    }
}

const eliminarEstudiante = async (req, res) => {   
    try {   
        const {id} = req.params 
        const estudianteBDD = await Estudiante.findById(id)       
        if(!estudianteBDD) return res.status(404).json({msg:"Estudiante no encontrado"})
        await Estudiante.findByIdAndDelete(id)
        res.status(200).json({msg:"Estudiante eliminado correctamente"})
    } catch (error) {
        res.status(500).json({msg:"Error al eliminar el estudiante", error:error.message})
    }
}

export {
    crearEstudiante,
    verEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
}