import Materia from "../models/Materia.js"
import mongoose from 'mongoose'

const crearMateria = async (req, res) => {
    try {
        const {codigo} = req.body
        const existeMateria = await Materia.findOne({codigo})
        if(existeMateria) return res.status(400).json({msg:"La materia ya existe"})
        const materia = new Materia(req.body)
        const materiaBDD = await materia.save()
        res.status(201).json({msg:"Materia creada correctamente", materia:materiaBDD})
    } catch (error) {
        res.status(500).json({msg:"Error al crear la materia", error:error.message})
    }
}

const verMateria = async (req, res) => {
    try{
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({msg:"ID de materia no válido"})
        const materiaBDD = await Materia.findById(id)
        if(!materiaBDD) return res.status(404).json({msg:"Materia no encontrada"})
        res.status(200).json({msg:"Materia encontrada", materia:materiaBDD})
    } catch (error) {
        res.status(500).json({msg:"Error al ver la materia", error:error.message})
    }
}

const actualizarMateria = async (req, res) => {
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({msg:"ID de materia no válido"})
        const materiaBDD = await Materia.findById(id)
        if(!materiaBDD) return res.status(404).json({msg:"Materia no encontrada"})
        const materiaActualizada = await Materia.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).json({msg:"Materia actualizada correctamente", materia:materiaActualizada})
    } catch (error) {
        res.status(500).json({msg:"Error al actualizar la materia", error:error.message})
    }
}

const eliminarMateria = async (req, res) => {   
    try {   
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({msg:"ID de materia no válido"})
        const materiaBDD = await Materia.findById(id)       
        if(!materiaBDD) return res.status(404).json({msg:"Materia no encontrada"})
        await Materia.findByIdAndDelete(id)
        res.status(200).json({msg:"Materia eliminada correctamente"})
    } catch (error) {
        res.status(500).json({msg:"Error al eliminar la materia", error:error.message})
    }
}

export {
    crearMateria,
    verMateria,
    actualizarMateria,
    eliminarMateria
}