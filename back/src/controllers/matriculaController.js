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

export { 
    crearMatricula 
}