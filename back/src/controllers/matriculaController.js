import Matricula from "../models/Matricula.js";
import Estudiante from "../models/Estudiante.js";
import Materia from "../models/Materia.js";
import mongoose from "mongoose";

const crearMatricula = async (req,res) =>{
    try {
        const { codigo, estudiante, materia } = req.body;

        const existeMatricula = await Matricula.findOne({ codigo });
        if (existeMatricula) return res.status(400).json({ msg: "El código de matrícula ya existe" });

        if (!mongoose.Types.ObjectId.isValid(estudiante) || !mongoose.Types.ObjectId.isValid(materia)) {
            return res.status(400).json({ msg: "ID de estudiante o materia no válido" });
        }
        //Confirmar que estudiante y materia existan en la bdd
        const existeEstudiante = await Estudiante.findById(estudiante);
        const existeMateria = await Materia.findById(materia);

        if (!existeEstudiante) return res.status(404).json({ msg: "El estudiante no existe en la base de datos" });
        if (!existeMateria) return res.status(404).json({ msg: "La materia no existe en la base de datos" });

        // guardar
        const nuevaMatricula = new Matricula(req.body);
        const matriculaBDD = await nuevaMatricula.save();

        res.status(201).json({ msg: "Matrícula creada correctamente", matricula: matriculaBDD });

    } catch (error) {
        res.status(500).json({ msg: "Error al crear la matrícula", error: error.message });
    }
}

const verMatricula = async (req, res) => {
    try {
        
        const matriculas = await Matricula.find()
            .populate("estudiante", "nombre apellido cedula")
            .populate("materia", "nombre codigo creditos");
            
        res.status(200).json(matriculas);
    } catch (error) {
        res.status(500).json({ msg: "Error al listar las matrículas", error: error.message });
    }
}

const actualizarMatricula = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "ID de matrícula no válido" });

        const matriculaBDD = await Matricula.findById(id);
        if (!matriculaBDD) return res.status(404).json({ msg: "Matrícula no encontrada" });

        // validacion si existe al actualizar el estudiante o la materia
        if (req.body.estudiante) {
            const existeEstudiante = await Estudiante.findById(req.body.estudiante);
            if (!existeEstudiante) return res.status(404).json({ msg: "El nuevo estudiante asignado no existe" });
        }

        if (req.body.materia) {
            const existeMateria = await Materia.findById(req.body.materia);
            if (!existeMateria) return res.status(404).json({ msg: "La nueva materia asignada no existe" });
        }

        const matriculaActualizada = await Matricula.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ msg: "Matrícula actualizada correctamente", matricula: matriculaActualizada });

    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar la matrícula", error: error.message });
    }
}

const eliminarMatricula = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "ID de matrícula no válido" });

        const matriculaBDD = await Matricula.findById(id);
        if (!matriculaBDD) return res.status(404).json({ msg: "Matrícula no encontrada" });

        await Matricula.findByIdAndDelete(id);
        res.status(200).json({ msg: "Matrícula eliminada correctamente" });

    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar la matrícula", error: error.message });
    }
}

export { 
    crearMatricula ,
    verMatricula,
    actualizarMatricula,
    eliminarMatricula
    
}