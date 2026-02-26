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


export {
    crearMateria
}