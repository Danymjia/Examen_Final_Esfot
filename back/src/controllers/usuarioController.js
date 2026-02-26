import Usuario from "../models/Usuario.js";
import { crearTokenJWT } from "../middlewares/JWT.js";

const crearUsuario = async (req, res) => {
    try {
        const {email} = req.body
        const existeUsuario = await Usuario.findOne({email})
        if(existeUsuario) return res.status(400).json({msg:"El usuario ya existe"})
        
        const usuario = new Usuario(req.body)
        usuario.password = await usuario.encryptPassword(usuario.password)
        const usuarioBDD = await usuario.save()
        
        res.status(201).json({msg:"Usuario creado correctamente", usuario:usuarioBDD})
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `Error en el servidor - ${error}` })
    }
}

const comprobarTokenPassword = async (req, res) => {
    try {
        const {token} = req.params
        const usuarioBDD = await Usuario.findOne({token})
        if(usuarioBDD?.token !== token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
        
        res.status(200).json({msg:"Token confirmado"}) 
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `Error en el servidor - ${error}` })
    }
}

const Login = async (req, res) => {
    try {
        const {email, password} = req.body
        const usuarioBDD = await Usuario.findOne({email})
        
        // Validación exacta como pide el PDF del examen
        if(!usuarioBDD) return res.status(401).json({msg:"Usuario o contraseña incorrectos."})
            
        const passwordCorrecto = await usuarioBDD.matchPassword(password)   
        if(!passwordCorrecto) return res.status(401).json({msg:"Usuario o contraseña incorrectos."})

        const tokenGenerado = crearTokenJWT(usuarioBDD._id, "usuario")
        
        res.status(200).json({
            msg:"Login correcto", 
            token: tokenGenerado,
            usuario: {
                nombre: usuarioBDD.nombre,
                apellido: usuarioBDD.apellido,
                email: usuarioBDD.email
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `Error en el servidor - ${error}` })
    }
}

export {
    crearUsuario,
    comprobarTokenPassword,
    Login
}